import React from 'react';
// Assuming WorkerNavbar is located at the path below
import Header from "../components/WorkerHeader";

// --- Interfaces ---

interface Review {
  workerName: string;
  initials: string;
  avatarColor: string;
  rating: number; // 1 to 5
  timeSince: string;
  content: string;
}

// --- Mock Data ---

const mockReviews: Review[] = [
  {
    workerName: 'Mark Anthony Reyes',
    initials: 'MA',
    avatarColor: 'bg-blue-600',
    rating: 5,
    timeSince: '5 days ago',
    content: "Outstanding carpentry work! The custom cabinets were built with precision and speed. Mark communicated clearly throughout the entire process. Highly recommended for any woodworking job.",
  },
  {
    workerName: 'Jessa Mae Abella',
    initials: 'JA',
    avatarColor: 'bg-indigo-600',
    rating: 4,
    timeSince: '3 weeks ago',
    content: "Hired for deep cleaning. The house was spotless, but there was a minor issue with timing. Jessa quickly adjusted her schedule the next week. Overall, very satisfied with the quality of cleaning.",
  },
  {
    workerName: 'Rolando Uy',
    initials: 'RU',
    avatarColor: 'bg-green-600',
    rating: 5,
    timeSince: '1 month ago',
    content: "Rolando fixed a complex wiring issue that two other electricians couldn't solve. He was professional, efficient, and ensured everything was safe before leaving. Will definitely call him again.",
  },
  {
    workerName: 'Kristine Joy Lim',
    initials: 'KL',
    avatarColor: 'bg-red-600',
    rating: 4,
    timeSince: '2 months ago',
    content: "Kristine is great with children, very patient and reliable. My kids loved her immediately. One star removed only because of a late cancellation due to illness, but she made up for it later.",
  },
  {
    workerName: 'Jonathan dela Peña',
    initials: 'JD',
    avatarColor: 'bg-purple-600',
    rating: 5,
    timeSince: '3 days ago',
    content: "Immediate response for a burst pipe emergency. Jonathan arrived quickly and performed a high-quality, permanent fix. Excellent service, value, and communication.",
  },
  {
    workerName: 'Mary Rose Cabahug',
    initials: 'MC',
    avatarColor: 'bg-pink-600',
    rating: 4,
    timeSince: '1 week ago',
    content: "Mary Rose is a wonderful cook! The meals were delicious and exactly to my specifications. She was polite and tidy. I will be using her services regularly.",
  },
];

// --- Star Rating Component ---

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex text-yellow-400">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-4 h-4 fill-current text-gray-300" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// --- Review Card Component ---

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col">
    {/* Header: Avatar, Name, Time, and Rating */}
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className={`h-10 w-10 ${review.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
          {review.initials}
        </div>

        {/* Name and Time */}
        <div>
          <div className="text-sm font-semibold text-gray-900">{review.workerName}</div>
          <div className="text-xs text-gray-500 mt-0.5">{review.timeSince}</div>
        </div>
      </div>

      {/* Rating (Stars) */}
      <div className="flex flex-col items-end pt-1">
        <StarRating rating={review.rating} />
      </div>
    </div>

    {/* Review Content */}
    <p className="text-sm text-gray-700 leading-relaxed">
      {review.content}
    </p>
  </div>
);

// --- Main WorkerReviewGrid Component ---

const WorkerReviewGrid: React.FC = () => {
  return (
    // Outer container for the entire page
    <div className="min-h-screen bg-gray-50">

      {/* 1. Navbar component is placed first */}
      <Header userName='Sherielyn Guadiana' />

      {/* 2. Main Content Area */}
      <main className="pt-24 sm:pt-28 lg:pt-28 pl-10 pr-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 pt-6">Worker Reviews</h1>

        <div className="max-w-6xl mx-auto">
          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockReviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkerReviewGrid;