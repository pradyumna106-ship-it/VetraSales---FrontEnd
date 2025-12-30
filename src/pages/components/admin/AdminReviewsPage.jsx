import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { allReviews } from "../../services/reviewService";
/* MOCK REVIEWS DATA (Replace with API later) */
const initialReviews = [
  {
    id: 1,
    productName: "Premium Dog Food",
    customerName: "Rahul",
    rating: 4,
    comment: "Good quality, my dog loves it!",
    status: "approved", // approved | hidden
    date: "2025-01-12",
  },
  {
    id: 2,
    productName: "Chew Toy",
    customerName: "Ananya",
    rating: 2,
    comment: "Not durable, broke in 2 days.",
    status: "pending",
    date: "2025-01-15",
  },
];

export function AdminReviewsPage({ onBack }) {
    const [reviews, setReviews] = useState(initialReviews);
    const [search, setSearch] = useState("");
    useEffect(() => {
        allReviews().then(res => {
        setReviews(res.data)
        })
    },[reviews])
    const toggleStatus = (id) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: r.status === "approved" ? "hidden" : "approved" }
          : r
      )
    );
  };

  const filteredReviews = reviews.filter(
    (r) =>
      r.productName.toLowerCase().includes(search.toLowerCase()) ||
      r.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search by product or customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      {/* REVIEWS LIST */}
      <div className="grid gap-4">
        {filteredReviews.length === 0 && (
          <p className="text-gray-500 text-center">
            No reviews found
          </p>
        )}

        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardHeader className="flex flex-row justify-between items-start">
              <div>
                <CardTitle className="text-lg">
                  {review.productName}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  by {review.customerName} • {review.date}
                </p>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  review.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {review.status.toUpperCase()}
              </span>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* RATING */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* COMMENT */}
              <p className="text-gray-700">
                {review.comment}
              </p>

              {/* ACTION */}
              <Button
                size="sm"
                className={
                  review.status === "approved"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }
                onClick={() => toggleStatus(review.id)}
              >
                {review.status === "approved"
                  ? "Hide Review"
                  : "Approve Review"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
