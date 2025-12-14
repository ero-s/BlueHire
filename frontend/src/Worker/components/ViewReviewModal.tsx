import React from 'react';
import { X, Star, User, Calendar, MessageSquare } from 'lucide-react';

interface ViewReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: {
    clientName: string;
    rating: number;
    feedback: string;
    date: string;
  } | null;
}

const ViewReviewModal: React.FC<ViewReviewModalProps> = ({ isOpen, onClose, review }) => {
  if (!isOpen || !review) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="bg-[#F6F6F6] px-6 py-4 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Star size={20} className="text-orange-400 fill-orange-400" />
            Client Review
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center text-center space-y-6">
          
          {/* Client & Date */}
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2 text-gray-800 font-bold text-lg">
                <User size={20} className="text-[#4D7EAF]" />
                {review.clientName}
            </div>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                <Calendar size={12} />
                {review.date}
            </div>
          </div>

          {/* Star Rating Display */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  className={`${
                    star <= review.rating
                      ? "fill-orange-400 text-orange-400"
                      : "fill-gray-100 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-orange-400 bg-orange-50 px-3 py-1 rounded-full">
              {review.rating}.0 / 5.0
            </span>
          </div>

          {/* Feedback */}
          <div className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 text-left">
            <div className="flex items-center gap-2 mb-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                <MessageSquare size={12} /> Feedback
            </div>
            <p className="text-gray-600 text-sm leading-relaxed italic">
              "{review.feedback || "No written feedback provided."}"
            </p>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-3 bg-[#4D7EAF] text-white rounded-xl font-bold hover:bg-[#3d6691] transition-colors shadow-md"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewReviewModal;