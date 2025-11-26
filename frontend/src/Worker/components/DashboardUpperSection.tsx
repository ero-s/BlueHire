import React from "react";

const DashboardUpperSection: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-2">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, <span className="text-[#4D7EAF]">Jose!</span>
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening with your jobs today.
        </p>
      </div>
    </div>
  );
};

export default DashboardUpperSection;