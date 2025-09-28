import React, { useState } from 'react';
import './Earnings&Reports.css';
import Navbar from '../../components/NavBar/BlueHireNavBar';
import calendarIcon from '../../components/Assets/calendar.svg';
import EarningsBarChart from '../../components/Visualizers/EarningsBarChart';
import DonutChart from '../../components/Visualizers/DonutChart';
import Footer from '../../components/Footer/Footer';
const earningsData = [ 
    { 
        date: 'January 25, 2025', 
        client: 'Floyd Miles', 
        service: 'House Cleaning', 
        duration: '3 hours', 
        amount: '₱400.00', 
        status: 'Completed', 
    }, 
    { 
        date: 'February 5, 2025', 
        client: 'Ronald Richards', 
        service: 'Laundry & Ironing', 
        duration: '4 hours', 
        amount: '₱260.00', 
        status: 'Cancelled', 
    }, 
    { 
        date: 'March 6, 2025', 
        client: 'Marvin McKinney', 
        service: 'Cooking / Meal Prep', 
        duration: '2 hours', 
        amount: '₱300.00', 
        status: 'Cancelled', 
    }, 
    { 
        date: 'April 1, 2025', 
        client: 'Twila Gonzaga', 
        service: 'Gardening / Yard Work', 
        duration: '6 hours', 
        amount: '₱520.00', 
        status: 'Completed', 
    }, 
    { 
        date: 'May 19, 2025', 
        client: 'Jerome Bell', 
        service: 'Plumbing', 
        duration: '1 hour', 
        amount: '₱450.00', 
        status: 'Completed', 
    }, 
    { 
        date: 'June 23, 2025', 
        client: 'Kathryn Murphy', 
        service: 'Electrical Repair', 
        duration: '2 hours', 
        amount: '₱500.00', 
        status: 'Completed', 
    }, 
    { 
        date: 'July 13, 2025', 
        client: 'Jacobe Jones', 
        service: 'Appliance Repair', 
        duration: '2 hours', 
        amount: '₱470.00', 
        status: 'Completed', 
    }, 
    { 
        date: 'August 2, 2025', 
        client: 'Kristin Watson', 
        service: 'Car Wash & Detailing', 
        duration: '2 hours', 
        amount: '₱340.00', 
        status: 'Cancelled', 
    }, 
]; 

const statusClass = (status: string) => {
  switch (status) {
    case 'Completed': return 'status-completed';
    case 'Cancelled': return 'status-cancelled';
    default: return '';
  }
};

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


const EarningsAndReports: React.FC = () => {
    const [selected, setSelected] = useState("All Time");

    return (
        <div className="earnings-and-reports-container">
            <Navbar />
            <div className="earnings-report-section">
                <div className='earnings-stats-section'>
                    <div className='summary-and-filters'>
                        <div className='earnings-summary'>
                            <div className='earnings-summary-item'>
                                <span>TOTAL EARNINGS</span>
                                <span>₱36,000.00</span>
                            </div>
                            <div className='earnings-summary-item'>
                                <span>AVERAGE EARNINGS PER JOB</span>
                                <span>₱800.00</span>
                            </div>
                            <div className='earnings-summary-item'>
                                <span>AVERAGE RATING</span>
                                <div><
                                    span>4.0 </span>
                                    {renderStars(4)}
                                </div>
                            </div>
                            <div className='earnings-summary-item'>
                                <span>JOBS COMPLETED</span>
                                <span>32</span>
                            </div>
                        </div>
                        <div className="filter-container">
                            <div className="filter-label">
                                <img className="filter-icon" src={calendarIcon} alt="Calendar Icon"/>
                                <span>FILTER by Time Period</span>
                            </div>
                            <select
                                className="filter-select"
                                value={selected}
                                onChange={(e) => setSelected(e.target.value)}
                            >
                                <option>All Time</option>
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>This Year</option>
                                <option>Custom Range</option>
                        </select>
                        </div>
                    </div>
                    <div className="earnings-graphs-section">
                        <div className="earnings-graph-card">
                            <div className="earnings-graph-header">
                                <span className="earnings-graph-title">EARNINGS THROUGHOUT THE YEAR</span>
                                <div className="earnings-graph-legend">
                                    <span className="legend-dot" />
                                    <span className="legend-label">EARNINGS</span>
                                </div>
                            </div>
                            <div className="earnings-graph-container">
                                <EarningsBarChart/>
                            </div>
                        </div>
                        <div className='donut-chart-card'>
                            <span className='donut-chart-title'>JOB DISTRIBUTION</span>
                            <DonutChart/>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <h2 className='report-header'>Earnings Report</h2>
                    <table className="earnings-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Client Name</th>
                                <th>Service Type</th>
                                <th>Hours/Duration</th>
                                <th>Amount Earned</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {earningsData.map((row, idx) => (
                                <tr key={idx}>
                                    <td>{row.date}</td>
                                    <td>{row.client}</td>
                                    <td>{row.service}</td>
                                    <td>{row.duration}</td>
                                    <td>{row.amount}</td>
                                    <td>
                                        <span className={`status-badge ${statusClass(row.status)}`}>
                                        {row.status}
                                    </span>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="table-pagination">
                        <span>Showing data 1 to 8 of 250K entries</span>
                        <div className="pagination-buttons">
                            <button disabled>&lt;</button>
                            <button className="active">1</button>
                            <button>2</button>
                            <button>3</button>
                            <button>4</button>
                            <button>5</button>
                            <button>&gt;</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default EarningsAndReports;
