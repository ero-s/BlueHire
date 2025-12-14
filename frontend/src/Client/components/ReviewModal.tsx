import React, { useState } from "react";
import { X, Star, Loader2, Send } from "lucide-react";

// Flexible interface to handle different Booking shapes
interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Accept a generic object so it works with both ClientBooking and ReviewsPage data types
  booking: {
    id: string;
    workerName?: string; // Handle direct property (ClientBooking)
    worker?: { name: string }; // Handle nested property (Reviews Page)
    serviceType?: string;
    avatar?: string;
  } | null;
  onSubmit: (rating: number, feedback: string) => Promise<void>;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !booking) return null;

  // Helper to safely get worker name regardless of data structure
  const workerName = booking.workerName || booking.worker?.name || "the worker";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
        await onSubmit(rating, feedback);
        // Only close and reset if successful
        onClose();
        setRating(0);
        setFeedback("");
        setHoverRating(0);
    } catch (error) {
        console.error("Submission failed inside modal", error);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="bg-[#F6F6F6] px-6 py-4 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2">
             <Star size={20} className="text-orange-400 fill-orange-400" />
             <h3 className="text-xl font-bold text-gray-800">Rate & Review</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Worker Info Context */}
          <div className="text-center">
            {booking.avatar && (
                <img 
                    src={booking.avatar} 
                    alt={workerName} 
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-white shadow-md"
                />
            )}
            <h3 className="text-lg font-bold text-gray-800">How was {workerName}?</h3>
            {booking.serviceType && (
                <p className="text-sm text-gray-500">Service: {booking.serviceType}</p>
            )}
          </div>

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
                        ? "fill-orange-400 text-orange-400" // Matches your design system
                        : "fill-transparent text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm font-medium text-orange-400 h-5">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent!"}
            </p>
          </div>

          {/* Text Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Feedback (Optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us about your experience..."
              className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AB3E6] resize-none text-gray-700 text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className={`flex-1 py-3 px-4 rounded-xl text-white font-semibold transition-all shadow-md flex items-center justify-center gap-2
                ${
                  isSubmitting || rating === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#4D7EAF] hover:bg-[#3d6691]"
                }`}
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;