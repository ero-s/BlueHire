import React from "react";
import "../assets/css/DashboardMainSection.css";
// import { useNavigate } from "react-router-dom";
import ProfilePic from "../../MainAssets/images/profile.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sampleData = [
  { name: "Mon", value: 10 },
  { name: "Tue", value: 20 },
  { name: "Wed", value: 15 },
  { name: "Thu", value: 30 },
  { name: "Fri", value: 25 },
];

const DashboardMainSection: React.FC = () => {
  // const navigate = useNavigate();

  return (
    <div className="dashboard-main">
      {/* First Row */}
      <div className="row">
        {/* Ongoing Jobs */}
        <div
          className="card small-card"
          // onClick={() => navigate("/booking-jobs")}
        >
          <h3>Ongoing Jobs</h3>
          <div className="stat-box">12</div>
        </div>

        {/* Completed Jobs */}
        <div
          className="card small-card"
          // onClick={() => navigate("/completed-jobs")}
        >
          <h3>Completed Jobs</h3>
          <div className="stat-box">34</div>
        </div>

        {/* Earnings & Reports */}
        <div
          className="card large-card"
          // onClick={() => navigate("/earnings-reports")}
        >
          <h3>Earnings & Reports</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={sampleData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4D7EAF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row */}
      <div className="row">
        {/* Job Requests */}
        <div
          className="card large-card"
          // onClick={() => navigate("/job-requests")}
        >
          <h3>Job Requests</h3>
          <table className="job-table">
            <thead>
              <tr>
                <th>✔</th>
                <th>Client Name</th>
                <th>Job Type</th>
                <th>Location</th>
                <th>Schedule</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>Jane Doe</td>
                <td>Cleaning</td>
                <td>NYC</td>
                <td>Sept 30</td>
                <td>Pending</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>John Smith</td>
                <td>Plumbing</td>
                <td>LA</td>
                <td>Oct 1</td>
                <td>Confirmed</td>
              </tr>
            </tbody>
          </table>
        </div>

       {/* Recent Reviews */}
<div className="card large-card">
  <h3 className="review-title">Recent Reviews</h3>

  <div className="review-container">

    {/* Left: Profile Section */}
    <div className="picture-section">
      <img src={ProfilePic} alt="Profile Pic" className="review-profile-pic" />
    </div>

    {/* Left: Profile details */}
      <div className="profile-details">
        <p className="reviewer-name">Sarah Lee</p>
        <p className="reviewer-spent">Total Spent: $520</p>
        <p className="reviewer-reviews">Total Reviews: 8</p>
      </div>

    {/* Right: Review Section */}
    <div className="review-right">
      <div className="review-header">
        <div className="review-stars">⭐⭐⭐⭐☆</div>
        <div className="review-date">Oct 14, 2025</div>
      </div>
      <div className="review-body">
        <p className="review-comment">"The worker was professional and on time."</p>
      </div>
    </div>
  </div>
</div>


      </div>
    </div>
  );
};

export default DashboardMainSection;
