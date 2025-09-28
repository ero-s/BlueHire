import React from 'react';
import Navbar from '../../components/NavBar/BlueHireNavBar';
import './Reviews&Ratings.css';

const reviews = [
    {
        name: "Maria Santos",
        avatar: "M",
        rating: 5,
        date: "2 weeks ago",
        review: "Jose P. Rizal has been our housekeeper for months now. He is very reliable and always leaves our home spotless. His attention to detail, especially in deep cleaning and laundry, is impressive. Highly recommended!"
    },
    {
        name: "Juan Dela Cruz",
        avatar: "J",
        rating: 5,
        date: "1 month ago",
        review: "Jose is very professional and trustworthy. He keeps our household organized and even suggests ways to improve cleanliness at home. We appreciate his consistency and dedication to his work."
    },
    {
        name: "Ana Lopez",
        avatar: "A",
        rating: 4,
        date: "3 weeks ago",
        review: "Jose did an excellent job helping with general cleaning. He was punctual and hardworking. The only reason I gave 4 stars is because I prefer a bit more flexibility with schedules, but overall he did great!"
    },
    {
        name: "Ramon Gutierrez",
        avatar: "R",
        rating: 5,
        date: "1 week ago",
        review: "Jose P. Rizal is one of the most reliable housekeepers we’ve hired through BlueHire. He takes his work seriously and ensures every corner of the house is organized. We will definitely book him again."
    },
    {
        name: "Liza Perez",
        avatar: "L",
        rating: 5,
        date: "5 days ago",
        review: "Jose goes beyond just cleaning. He helps with household organization and makes our home feel welcoming every time. His dedication is clear, and our family trusts him completely."
    },
    {
        name: "Carlo Mendoza",
        avatar: "C",
        rating: 5,
        date: "2 days ago",
        review: "Jose P. Rizal has been a huge help for our family. He is always on time, works efficiently, and treats our home with respect. His reliability makes our lives so much easier."
    }
];

const renderStars = (rating: number) => {
    const totalStars = 5;
    return (
        <span className="rating-stars">
            {Array.from({ length: totalStars }, (_, i) => (
                <span key={i} className={i < rating ? "star filled" : "star"}>
                    {i < rating ? "★" : "☆"}
                </span>
            ))}
        </span>
    );
};

const ReviewsAndRatings: React.FC = () => {
    return (
        <div className='reviewsandratings'>
            <Navbar />
            <div className="reviews-container">
                {reviews.map((review, idx) => (
                    <div className="review-card" key={idx}>
                        <div className="review-header">
                            {review.avatar ? (
                                <div className="avatar">{review.avatar}</div>
                            ) : (
                                <div className="avatar avatar-placeholder"></div>
                            )}
                            <div>
                                <div className="reviewer-name">{review.name}</div>
                                <div className="review-date">{review.date}</div>
                                <div className="stars">{renderStars(review.rating)}</div>
                            </div>
                        </div>
                        <div className="review-text">{review.review}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsAndRatings;