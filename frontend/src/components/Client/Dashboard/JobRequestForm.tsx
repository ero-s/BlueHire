import { useState, type ChangeEvent, type FormEvent } from "react";
import Header from "./Header";
import logo from "../../../assets/logo.jpg";

interface JobFormData {
  title: string;
  description: string;
  schedule: string;
  minSalary: string;
  maxSalary: string;
  location: string;
}

export default function JobRequestForm() {
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    description: "",
    schedule: "",
    minSalary: "",
    maxSalary: "",
    location: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Job posted:", formData);
    // You can add API call or navigation here
  };

  const handleDraft = () => {
    console.log("Saved as draft:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      {/* Header (same as Dashboard) */}
      <Header logo={logo} userName="Juan Dela Cruz" />

      {/* Form Section */}
      <main className="flex-1 flex justify-center items-center px-6 py-10">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-blue-900 mb-8">
            Job Request Form
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 text-gray-800"
          >
            {/* Job Title */}
            <div>
              <label className="font-semibold block mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Input Title"
                maxLength={60}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-sm text-gray-500 text-right mt-1">
                {formData.title.length}/60
              </p>
            </div>

            {/* Job Description */}
            <div>
              <label className="font-semibold block mb-1">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Input Description"
                rows={3}
                maxLength={100}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
              <p className="text-sm text-gray-500 text-right mt-1">
                {formData.description.length}/100
              </p>
            </div>

            {/* Schedule */}
            <div>
              <label className="font-semibold block mb-1">
                Schedule <span className="text-red-500">*</span>
              </label>
              <input
                name="schedule"
                type="date"
                value={formData.schedule}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Salary Range */}
            <div>
              <p className="font-semibold mb-2">Salary Range</p>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="font-semibold block mb-1">
                    Min <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="minSalary"
                    type="number"
                    value={formData.minSalary}
                    onChange={handleChange}
                    placeholder="$"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="font-semibold block mb-1">
                    Max <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="maxSalary"
                    type="number"
                    value={formData.maxSalary}
                    onChange={handleChange}
                    placeholder="$"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="font-semibold block mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={handleDraft}
                className="px-6 py-2 rounded-lg border border-blue-800 text-blue-800 font-semibold hover:bg-blue-50 transition"
              >
                Draft
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
