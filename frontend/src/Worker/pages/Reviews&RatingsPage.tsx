import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';
import WorkerNavbar from '../components/WorkerHeader'; // Adjust path
import ReviewsRatingsMainSection from '../components/ReviewsRatingsMainSection';

const ReviewsRatingsPage: React.FC = () => {
  // const navigate = useNavigate();

  return (
    <div className="bg-[#F6F6F6] min-h-screen w-full font-sans">
      <div className="fixed top-0 w-full z-40 bg-[#F6F6F6]">
        <WorkerNavbar userName='Sherielyn Guadiana' />
      </div>

      <div className="pt-28 pb-10 px-4 md:px-8 lg:px-12">

        <ReviewsRatingsMainSection />
      </div>
    </div>
  );
};

export default ReviewsRatingsPage;