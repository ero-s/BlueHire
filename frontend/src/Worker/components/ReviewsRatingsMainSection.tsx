import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, ThumbsUp, Filter, Loader2 } from 'lucide-react';

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

// --- Sub-Component: Individual Review Item ---
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
  
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState<'All' | 'Specific'>('All');
  const [averageRating, setAverageRating] = useState("0.0");

  // --- Fetch Data ---
  useEffect(() => {
    const fetchReviews = async () => {
        setLoading(true);
        try {
            const storedUser = localStorage.getItem("currentUser");
            if (!storedUser) return;
            const user = JSON.parse(storedUser);

            // 1. Get Worker ID first
            const workerRes = await fetch("http://localhost:8080/api/worker/getAllWorkers");
            const workers = await workerRes.json();
            const myProfile = workers.find((w: any) => w.user.userId === user.userId);
            
            if (!myProfile) {
                console.warn("No worker profile found for this user.");
                setLoading(false);
                return;
            }

            console.log("Logged in as Worker ID:", myProfile.workerID);

            // 2. Fetch All Reviews
            const response = await fetch("http://localhost:8080/reviews");
            if (response.ok) {
                const rawReviews = await response.json();
                
                console.log("Raw Reviews from DB:", rawReviews);

                // 3. Filter reviews belonging to THIS worker
                const myReviews = rawReviews
                    .filter((r: any) => {
                        // Safety check: ensure the review has a booking and a worker
                        return r.booking && r.booking.worker && r.booking.worker.workerID === myProfile.workerID;
                    })
                    .map((r: any) => {
                        const client = r.booking.client.user;
                        
                        // FIX: Ensure we use the correct property names from Java JSON response
                        // Java getReviewID() -> JSON "reviewID"
                        // Java getReviewDate() -> JSON "reviewDate"
                        
                        return {
                            id: (r.reviewID || r.reviewid || Math.random()).toString(), // Handle both cases + fallback
                            jobId: r.booking.bookingID.toString(),
                            reviewerName: `${client.name.firstName} ${client.name.lastName}`,
                            reviewerAvatar: client.photoURL || "https://i.pravatar.cc/150?u=default",
                            rating: r.rating,
                            date: r.reviewDate, 
                            comment: r.feedback || "No feedback provided.",
                            serviceType: r.booking.serviceCategory || "General Service"
                        };
                    });

                console.log("Processed Reviews for this Worker:", myReviews);

                // Calculate Average
                if (myReviews.length > 0) {
                    const total = myReviews.reduce((sum: number, r: Review) => sum + r.rating, 0);
                    setAverageRating((total / myReviews.length).toFixed(1));
                }

                setAllReviews(myReviews);
                
                // Check if we need to filter by a specific job immediately
                if (location.state && location.state.jobId) {
                    const targetJobId = location.state.jobId.toString();
                    const specificReview = myReviews.filter((r: Review) => r.jobId === targetJobId);
                    
                    if (specificReview.length > 0) {
                        setDisplayedReviews(specificReview);
                        setFilterMode('Specific');
                    } else {
                        setDisplayedReviews(myReviews); 
                    }
                } else {
                    setDisplayedReviews(myReviews);
                }
            }
        } catch (error) {
            console.error("Failed to load reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchReviews();
  }, [location.state]); 

  const handleClearFilter = () => {
    setDisplayedReviews(allReviews);
    setFilterMode('All');
    navigate(location.pathname, { replace: true, state: {} });
  };

  if (loading) {
      return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#4D7EAF]" size={32}/></div>;
  }

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
                <span className="text-2xl font-bold text-[#4D7EAF]">{averageRating}</span>
                <span className="text-xs text-gray-400">Average</span>
            </div>
            <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">{allReviews.length}</span>
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
            <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p>No reviews found.</p>
                <p className="text-xs mt-2">Open your Console (F12) to debug if you expected data.</p>
                {filterMode === 'Specific' && (
                    <button onClick={handleClearFilter} className="text-[#4D7EAF] text-sm font-bold mt-2 hover:underline">
                        See all reviews
                    </button>
                )}
            </div>
        )}
      </div>

    </div>
  );
};

export default ReviewsRatingsMainSection;