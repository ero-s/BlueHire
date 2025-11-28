import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
} from "lucide-react";

interface JobFormData {
  title: string;
  description: string;
  schedule: string;
  minSalary: string;
  maxSalary: string;
  location: string;
}

export default function JobRequestForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    description: "",
    schedule: "",
    minSalary: "",
    maxSalary: "",
    location: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Job posted:", formData);
    // Simulate submission and redirect
    setTimeout(() => {
      navigate("/bookings");
    }, 500);
  };

  const handleDraft = () => {
    console.log("Saved as draft:", formData);
    navigate("/bookings");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 animate-fade-in-up">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-[#3b82f6] transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-blue-50/50 px-8 py-8 border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800">
            Post a Job Request
          </h1>
          <p className="text-gray-500 mt-2">
            Fill in the details below to find the perfect worker for your needs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Section 1: Job Details */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Briefcase size={20} className="text-[#3b82f6]" />
              Job Details
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Need a plumber for leaky faucet"
                    maxLength={60}
                    required
                    className="w-full pl-4 pr-16 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 transition-all outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                    {formData.title.length}/60
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the issue, specific requirements, or tools needed..."
                    rows={4}
                    maxLength={300}
                    required
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 transition-all outline-none resize-none"
                  />
                  <span className="absolute right-4 bottom-4 text-xs text-gray-400 font-medium">
                    {formData.description.length}/300
                  </span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section 2: Logistics */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Calendar size={20} className="text-[#3b82f6]" />
              Schedule & Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    name="schedule"
                    type="date"
                    value={formData.schedule}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 transition-all outline-none"
                  />
                  <Calendar
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter service address"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 transition-all outline-none"
                  />
                  <MapPin
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section 3: Budget */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <DollarSign size={20} className="text-[#3b82f6]" />
              Budget Range
            </h2>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Budget <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    name="minSalary"
                    type="number"
                    value={formData.minSalary}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 transition-all outline-none"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                    $
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Maximum Budget <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    name="maxSalary"
                    type="number"
                    value={formData.maxSalary}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 transition-all outline-none"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                    $
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-6 mt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleDraft}
              className="px-8 py-3 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-95"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-[#3b82f6] text-white font-semibold shadow-lg shadow-blue-200 hover:bg-[#2563eb] hover:shadow-xl transition-all active:scale-95"
            >
              Post Job Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
