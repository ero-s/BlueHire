import React, { useState } from "react";
import { X, Star } from "lucide-react";
import type { Booking } from "../pages/types";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Review submitted:", {
        bookingId: booking.id,
        rating,
        reviewText,
        worker: booking.worker.name,
      });
      setIsSubmitting(false);
      onClose();
      // Reset form
      setRating(0);
      setReviewText("");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all scale-100">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Rate & Review</h3>
            <p className="text-sm text-gray-500 mt-1">
              How was your service with{" "}
              <span className="font-semibold text-[#3b82f6]">
                {booking.worker.name}
              </span>
              ?
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Star Rating */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    size={36}
                    className={`${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-transparent text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm font-medium text-gray-600">
              {rating === 0
                ? "Select a rating"
                : rating === 1
                  ? "Terrible"
                  : rating === 2
                    ? "Bad"
                    : rating === 3
                      ? "Okay"
                      : rating === 4
                        ? "Good"
                        : "Excellent"}
            </p>
          </div>

          {/* Text Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Write a review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us about your experience..."
              className="w-full h-32 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3b82f6] resize-none text-gray-700"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className={`flex-1 py-3 px-4 rounded-full text-white font-semibold transition-all shadow-md hover:shadow-lg
                ${
                  isSubmitting || rating === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#3b82f6] hover:bg-[#2563eb]"
                }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
