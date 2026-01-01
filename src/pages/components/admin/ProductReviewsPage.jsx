import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { listOfReview } from "../../services/reviewService";

export function ProductReviewsPage({ productId, onBack }) {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await listOfReview(productId);
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading product reviews", err);
        setReviews([]);
      }
    };

    if (productId) loadReviews();
  }, [productId]);

  const filteredReviews = reviews.filter(
    (r) =>
      r.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      r.comment?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Reviews</h2>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search reviews..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      {/* REVIEWS */}
      <div className="grid gap-4">
        {filteredReviews.length === 0 && (
          <p className="text-gray-500 text-center">
            No reviews found
          </p>
        )}

        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                {review.customerName}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {review.date}
              </p>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Rating */}
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

              {/* Comment */}
              <p className="text-gray-700">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
