import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, ThumbsUp, Filter } from 'lucide-react';

// --- Types ---
interface Review {
  id: string;
  jobId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  date: string;
  comment: string;
  serviceType: string;
}

// --- Mock Data ---
const MOCK_REVIEWS: Review[] = [
  { 
    id: 'r1', 
    jobId: '3', 
    reviewerName: 'Marvin McKinney', 
    reviewerAvatar: 'https://i.pravatar.cc/150?u=3',
    rating: 5, 
    date: 'May 16, 2025', 
    comment: 'The cooking was absolutely delicious! Highly recommended for meal prep services. The kitchen was left spotless afterwards.',
    serviceType: 'Cooking / Meal Prep'
  },
  { 
    id: 'r2', 
    jobId: '4', 
    reviewerName: 'Tesla Gonzaga', 
    reviewerAvatar: 'https://i.pravatar.cc/150?u=4',
    rating: 4, 
    date: 'May 16, 2025', 
    comment: 'Great work on the garden. Very hardworking and polite. Just missed one small spot behind the shed, but overall excellent.',
    serviceType: 'Gardening / Yard Work'
  },
  { 
    id: 'r3', 
    jobId: '99', 
    reviewerName: 'Floyd Miles', 
    reviewerAvatar: 'https://i.pravatar.cc/150?u=1',
    rating: 5, 
    date: 'Jan 10, 2025', 
    comment: 'Always reliable. This is the 3rd time I hired him.',
    serviceType: 'House Cleaning'
  },
];

// --- Sub-Component: Individual Review Item ---
// This component manages its own "Helpful" state
const ReviewItem: React.FC<{ review: Review; filterMode: 'All' | 'Specific' }> = ({ review, filterMode }) => {
  const [isHelpful, setIsHelpful] = useState(false);

  return (
    <div 
        className={`bg-white p-6 rounded-3xl shadow-sm border transition-all duration-300
            ${filterMode === 'Specific' ? 'border-[#5AB3E6] ring-4 ring-blue-50' : 'border-transparent hover:border-gray-200'}
        `}
    >
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
                <img src={review.reviewerAvatar} alt={review.reviewerName} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                <div>
                    <h4 className="font-bold text-gray-800">{review.reviewerName}</h4>
                    <p className="text-xs text-gray-500">{review.serviceType} • {review.date}</p>
                </div>
            </div>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                        key={star} 
                        size={16} 
                        className={`${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                ))}
            </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">
            "{review.comment}"
        </p>

        <div className="flex items-center gap-4 border-t border-gray-50 pt-4">
            <button 
                onClick={() => setIsHelpful(!isHelpful)}
                className={`flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 ${
                    isHelpful ? 'text-[#4D7EAF]' : 'text-gray-400 hover:text-[#4D7EAF]'
                }`}
            >
                <ThumbsUp size={14} className={isHelpful ? "fill-current" : ""} /> 
                Helpful
            </button>
        </div>
    </div>
  );
};

// --- Main Component ---
const ReviewsRatingsMainSection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [filterMode, setFilterMode] = useState<'All' | 'Specific'>('All');

  // --- EFFECT: Check for incoming Job ID ---
  useEffect(() => {
    if (location.state && location.state.jobId) {
      const targetJobId = location.state.jobId;
      const specificReview = MOCK_REVIEWS.filter(r => r.jobId === targetJobId);
      
      if (specificReview.length > 0) {
        setDisplayedReviews(specificReview);
        setFilterMode('Specific');
      }
    } else {
      setDisplayedReviews(MOCK_REVIEWS);
      setFilterMode('All');
    }
  }, [location]);

  const handleClearFilter = () => {
    setDisplayedReviews(MOCK_REVIEWS);
    setFilterMode('All');
    navigate(location.pathname, { replace: true, state: {} });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1000px] mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Reviews & Ratings</h2>
          <p className="text-gray-500 text-sm mt-1">See what clients are saying about your work.</p>
        </div>

        {/* Stats Summary */}
        <div className="flex gap-4">
            <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                <span className="text-2xl font-bold text-[#4D7EAF]">4.8</span>
                <span className="text-xs text-gray-400">Average</span>
            </div>
            <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">{MOCK_REVIEWS.length}</span>
                <span className="text-xs text-gray-400">Total</span>
            </div>
        </div>
      </div>

      {/* Filter Notification */}
      {filterMode === 'Specific' && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-[#4D7EAF]">
                <Filter size={18} />
                <span className="text-sm font-medium">Showing review for a specific job</span>
            </div>
            <button 
                onClick={handleClearFilter}
                className="text-xs font-semibold text-gray-500 hover:text-gray-800 underline"
            >
                View All Reviews
            </button>
        </div>
      )}

      {/* Reviews List */}
      <div className="flex flex-col gap-4">
        {displayedReviews.length > 0 ? (
            displayedReviews.map((review) => (
                <ReviewItem 
                    key={review.id} 
                    review={review} 
                    filterMode={filterMode} 
                />
            ))
        ) : (
            <div className="text-center py-12 text-gray-400">
                <p>No reviews found for this job ID.</p>
                <button onClick={handleClearFilter} className="text-[#4D7EAF] text-sm font-bold mt-2 hover:underline">See all reviews</button>
            </div>
        )}
      </div>

    </div>
  );
};

export default ReviewsRatingsMainSection;