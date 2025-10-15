import React from "react";
import "./BookingJobManagementMainSection.css";

interface Booking {
  clientName: string;
  serviceType: string;
  dateTime: string;
  duration: string;
  amount: string;
  status: "Pending" | "Ongoing" | "Completed";
  location: string;
  actions: string[];
}

const bookings: Booking[] = [
  {
    clientName: "Floyd Miles",
    serviceType: "House Cleaning",
    dateTime: "Jan 15, 2025 – 9:00 AM",
    duration: "3 hours",
    amount: "₱400.00",
    status: "Pending",
    location: "Cebu City",
    actions: ["Accept", "Decline"],
  },
  {
    clientName: "Ronald Richards",
    serviceType: "Laundry & Ironing",
    dateTime: "Sept 15, 2025 – 9:00 AM",
    duration: "4 hours",
    amount: "₱260.00",
    status: "Ongoing",
    location: "Liloan",
    actions: ["Mark Completed", "View Details"],
  },
  {
    clientName: "Marvin McKinney",
    serviceType: "Cooking / Meal Prep",
    dateTime: "May 15, 2025 – 9:00 AM",
    duration: "2 hours",
    amount: "₱300.00",
    status: "Completed",
    location: "Talisay",
    actions: ["View Review"],
  },
  {
    clientName: "Tesla Gonzaga",
    serviceType: "Gardening / Yard Work",
    dateTime: "May 15, 2025 – 9:00 AM",
    duration: "5 hours",
    amount: "₱520.00",
    status: "Completed",
    location: "Cordova",
    actions: ["View Review"],
  },
  {
    clientName: "Jerome Bell",
    serviceType: "Plumbing",
    dateTime: "Sept 15, 2025 – 9:00 AM",
    duration: "1 hour",
    amount: "₱450.00",
    status: "Pending",
    location: "Cebu City",
    actions: ["Accept", "Decline"],
  },
  {
    clientName: "Kathryn Murphy",
    serviceType: "Electrical Repair",
    dateTime: "Sept 15, 2025 – 9:00 AM",
    duration: "2 hours",
    amount: "₱500.00",
    status: "Pending",
    location: "Consolacion",
    actions: ["Accept", "Decline"],
  },
  {
    clientName: "Jacob Jones",
    serviceType: "Appliance Repair",
    dateTime: "April 15, 2025 – 9:00 AM",
    duration: "2 hours",
    amount: "₱470.00",
    status: "Pending",
    location: "Cebu City",
    actions: ["Accept", "Decline"],
  },
  {
    clientName: "Kristin Watson",
    serviceType: "Car Wash & Detailing",
    dateTime: "Feb 15, 2025 – 9:00 AM",
    duration: "2 hours",
    amount: "₱340.00",
    status: "Pending",
    location: "Cebu City",
    actions: ["Accept", "Decline"],
  },
];

const BookingJobManagementMainSection: React.FC = () => {
  return (
    <div className="booking-main-wrapper">
      <div className="booking-main-container">
        <h2 className="section-title">Booking/Job Management</h2>

        <div className="table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Service Type</th>
                <th>Job Date & Time</th>
                <th>Duration</th>
                <th>Amount / Rate</th>
                <th>Status</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.clientName}</td>
                  <td>{booking.serviceType}</td>
                  <td>{booking.dateTime}</td>
                  <td>{booking.duration}</td>
                  <td>{booking.amount}</td>
                  <td className={`status ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </td>
                  <td>{booking.location}</td>
                  <td className="action-buttons">
                    {booking.actions.map((action, i) => (
                      <button
                        key={i}
                        className={`btn ${action.toLowerCase().replace(" ", "-")}`}
                      >
                        {action}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <p>Showing data 1 to 8 of 256K entries</p>
          <div className="pagination-buttons">
            <button>{"<"}</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <span>…</span>
            <button>40</button>
            <button>{">"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingJobManagementMainSection;
