import React from "react";
import "./BookingJobManagementUpperSection.css";

const BookingJobManagementUppersSection: React.FC = () => {
  return (
    <div className="upper-section-container">
      {/* Left Section - Status Counts */}
      <div className="status-summary">
        <div className="status-item">
          <p className="status-label">ONGOINGS</p>
          <p className="status-value">2</p>
        </div>
        <div className="status-item">
          <p className="status-label">PENDING</p>
          <p className="status-value">10</p>
        </div>
        <div className="status-item">
          <p className="status-label">COMPLETED</p>
          <p className="status-value">37</p>
        </div>
      </div>

      {/* Right Section - Filter */}
      <div className="status-filter">
        <label htmlFor="statusFilter" className="filter-label">
          FILTER by Status
        </label>
        <div className="select-wrapper">
          <select id="statusFilter" className="filter-select">
            <option>All Status</option>
            <option>Ongoing</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
          <svg
            className="select-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BookingJobManagementUppersSection;
