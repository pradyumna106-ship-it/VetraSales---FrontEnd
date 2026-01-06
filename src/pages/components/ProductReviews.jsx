import { useState,useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Star } from "lucide-react";
import { addReview } from "../services/productService";
import { listOfReview } from "../services/reviewService";
export default function ProductReviews({ productId,onBack,username }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  // Dummy reviews (replace with API later)
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
  if (productId) loadReviews(productId);
}, [productId]);

  
  const handleSubmit = async () => {
        if (!productId || isNaN(Number(productId))) {
            console.error("Invalid productId:", productId);
            return;
        }

        if (!rating || !comment) return;

        const newReview = {
            productId: Number(productId),
            rating: Number(rating),
            comment,
            username
        };

        console.log("Review Payload:", newReview);

        try {
            const res = await addReview(newReview);
            setReviews([res.data, ...reviews]); // see Fix #2
            setRating(0);
            setComment("");
        } catch (err) {
            console.error(err);
        }
};


    const loadReviews = async (productId) => {
        const res = await listOfReview(productId);
        setReviews(res || []);
        console.log(res);
    }
  const avgRating =
  reviews.length > 0
    ? reviews.reduce((sum, review) => sum + (review?.rating || 0), 0) / reviews.length
    : 0;


  return (
    <div className="space-y-6">
        <Button onClick={() => onBack()}>Back</Button>
      {/* Average Rating */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            {avgRating.toFixed(1)}
          </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i <= avgRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviews.length} reviews)
          </span>
        </CardContent>
      </Card>

      {/* Add Review */}
      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                onClick={() => setRating(i)}
                className={`h-6 w-6 cursor-pointer ${
                  i <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <Textarea
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button onClick={handleSubmit} disabled={!productId || isNaN(Number(productId))}>
            Submit Review
          </Button>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews
        .filter(r => r && r.username)
        .map((review, index) => (
          <Card key={index || `${review.username}-${review.comment}`}>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{review.username}</h4>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {review.comment}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
