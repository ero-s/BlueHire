import { useState } from 'react';
import { Pencil, CheckCircle } from 'lucide-react';

// Mock data
const profileImageUrl = "https://placehold.co/144x144/E0E0E0/B0B0B0?text=Profile";
const userName = "Juan Dela Cruz";
const userPosition = "CEO of Dale Inc.";
const userBio = "CEO of Dale Inc., a fast-growing software company specializing in AI-driven business tools. With over 15 years of leadership experience in technology and innovation, he is passionate about helping organizations streamline operations and achieve sustainable growth. He believes in empowering teams, fostering creativity, and building solutions that shape the future of work.";
const isVerified = true;

export default function ProfileBio() {
  const [showFullBio, setShowFullBio] = useState(false);
  const bioLimit = 180;
  const displayedBio = showFullBio ? userBio : `${userBio.slice(0, bioLimit)}${userBio.length > bioLimit ? '...' : ''}`;

  return (
    <div className="flex items-center justify-center w-full  font-sans">
      <div className="w-[338px] h-[614px] rounded-[20px] bg-white shadow-lg border border-gray-200 p-10 flex flex-col items-center">
        
        {/* Profile Picture */}
        <div className="relative shrink-0">
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-gray-200 object-cover"
          />
          <button
            className="absolute -bottom-1 -right-1 w-9 h-9 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors border-2 border-white cursor-pointer"
          >
            <Pencil size={18} />
          </button>
        </div>

        {/* User Name */}
        <h2 className="text-2xl font-bold text-gray-900 mt-3 shrink-0 text-center">
          {userName}
        </h2>

        {/* User Position */}
        <p className="text-md text-gray-600 mb-2 shrink-0 text-center">
          {userPosition}
        </p>

        {/* Verified Badge */}
        {isVerified && (
          <div className="flex items-center gap-2 bg-blue-100 text-blue-700 py-1.5 px-4 rounded-full mb-4 shrink-0">
            <CheckCircle size={18} className="text-blue-600" />
            <span className="font-bold text-xs tracking-wider">VERIFIED</span>
          </div>
        )}

        {/* Bio Section */}
        <div className="w-full max-w-lg overflow-y-auto px-4 text-center">
          <h2 className="font-bold mb-1" style={{ color: '#4D7EAF' }}>Bio:</h2>
          <p className="text-gray-800 text-sm">
            {displayedBio}
          </p>
          {userBio.length > bioLimit && (
            <button
              className="text-blue-600 text-xs font-semibold mt-2 hover:underline"
              onClick={() => setShowFullBio(!showFullBio)}
            >
              {showFullBio ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
