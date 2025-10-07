import { Search, Plus } from "lucide-react";
import "./DashboardUpperSection.css";

// type Props = {
//   user: string;
// };

// const DashboardUpperSection: React.FC<Props> = ({ user }) => {
function DashboardUpperSection() {
  return (
    <div className="dashboard-upper">
      {/* Welcome Section */}
      <div className="welcome-section">
      <div className="welcome-text">
        Welcome back, User!
        {/* Welcome back, <span className="user-name">{user}</span>! */}
      </div>
      <div className="sub-info">
        Here's what's happening with your jobs today.
      </div>
    </div>

      {/* Search + Post Section */}
      <div className="search-post-container">
       <div className="search-box">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="search-input"
          placeholder="Search clients..."
        />
      </div>

        {/* Post Button */}
        <button className="post-btn">
          <div className="post-icon-container">
            <Plus size={25} strokeWidth={3} color="#4D7EAF" />
          </div>
          <span className="post-text">Post a New Job!</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardUpperSection;
