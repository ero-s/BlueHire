import { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import "./JobDetails.css";

export default function JobDetailsForm() {
  const [jobTitle, setJobTitle] = useState("Carpentry");
  const [workerName, setWorkerName] = useState("Mark Anthony Reyes");
  const [description, setDescription] = useState("Work on deck and furnitures");
  const [schedule, setSchedule] = useState("Sept 14, 2025 - May 14, 20205 | 5 Days / Week");
  const [location, setLocation] = useState("Mandaue City, Banilad");
  const [status, setStatus] = useState(50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      jobTitle,
      workerName,
      description,
      schedule,
      location,
      status,
    };
    console.log("Updated job details:", formData);
    alert("Job details updated!");
  };

  return (
    <div className="job-container">
      <form onSubmit={handleSubmit} className="job-form">
        <h1 className="job-title">Job Details</h1>

        {/* Job Title */}
        <div className="form-group">
          <label>
            Job Title <span className="required">*</span>
          </label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            maxLength={60}
            required
          />
          <div className="char-count">{jobTitle.length}/60</div>
        </div>

        {/* Worker Name */}
        <div className="form-group">
          <label>
            Worker Name <span className="required">*</span>
          </label>
          <input
            type="text"
            value={workerName}
            onChange={(e) => setWorkerName(e.target.value)}
            maxLength={60}
            required
          />
          <div className="char-count">{workerName.length}/60</div>
        </div>

        {/* Job Description */}
        <div className="form-group">
          <label>
            Job Description <span className="required">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={100}
            required
          />
          <div className="char-count">{description.length}/100</div>
        </div>

        {/* Schedule */}
        <div className="form-group">
          <label>
            Schedule <span className="required">*</span>
          </label>
          <div className="input-icon">
            <Calendar className="icon" size={18} />
            <input
              type="text"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Location */}
        <div className="form-group">
          <label>
            Location <span className="required">*</span>
          </label>
          <div className="input-icon">
            <MapPin className="icon" size={18} />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Status */}
        <div className="form-group">
          <label>Status</label>
          <div className="status-slider">
            <input
              type="range"
              min={0}
              max={100}
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
            />
            <span className="status-value">{status}%</span>
          </div>
        </div>

        <button type="submit" className="update-btn">
          Update
        </button>
      </form>
    </div>
  );
}