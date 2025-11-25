import React from "react";
import type { JobPost } from "./JobPosts/types.ts";
import {
  LuMapPin,
  LuCircleDollarSign,
  LuCalendarDays,
  LuStar,
} from "react-icons/lu";

interface JobPostCardProps {
  job: JobPost;
}

const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

const DashboardJobPostCard: React.FC<JobPostCardProps> = ({ job }) => {
  return (
    <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row gap-6 relative overflow-hidden">
      {job.featured && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl flex items-center gap-1">
          <LuStar size={12} />
          <span>Featured</span>
        </div>
      )}
      <img
        src={job.clientAvatar}
        alt={job.clientName}
        className="w-16 h-16 rounded-full sm:w-20 sm:h-20 self-start"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500">by {job.clientName}</p>
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1.5 whitespace-nowrap">
            <LuCalendarDays /> {timeAgo(job.postedAt)}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 my-3">
          <span className="flex items-center gap-1.5">
            <LuMapPin />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <LuCircleDollarSign />${job.pay} {job.payType}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {job.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <button className="px-5 py-2 text-sm font-semibold bg-blue-500 text-white rounded-full hover:bg-blue-600 transition hover:-translate-y-0.5 transform whitespace-nowrap">
            Apply Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default DashboardJobPostCard;
