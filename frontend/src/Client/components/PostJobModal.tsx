import React, { useState } from 'react';
import { X, Briefcase, MapPin, DollarSign, AlignLeft } from 'lucide-react';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRADES = ["Plumbing", "Electrical", "Carpentry", "Cleaning", "Nanny", "Gardening", "Moving"];

const PostJobModal: React.FC<PostJobModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    budget: '',
    payType: 'Fixed', // or Hourly
    trade: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API Call
    setTimeout(() => {
      console.log("Job Posted:", formData);
      setIsSubmitting(false);
      onClose();
      // Reset form
      setFormData({ title: '', description: '', location: '', budget: '', payType: 'Fixed', trade: '' });
      alert("Job Posted Successfully!");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="bg-[#F6F6F6] px-6 py-4 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Briefcase size={20} className="text-[#4D7EAF]" />
            Post a New Job
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title</label>
            <input 
              type="text" 
              name="title"
              required
              placeholder="e.g. Need a plumber for leaky faucet" 
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AB3E6] focus:border-transparent transition-all"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Trade & Location Row */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <div className="relative">
                <select 
                  name="trade"
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AB3E6] appearance-none cursor-pointer"
                  value={formData.trade}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Trade</option>
                  {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <AlignLeft size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="location"
                  required
                  placeholder="City or Address" 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AB3E6]"
                  value={formData.location}
                  onChange={handleChange}
                />
                <MapPin size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Budget & Type Row */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Budget (₱)</label>
              <div className="relative">
                <input 
                  type="number" 
                  name="budget"
                  required
                  placeholder="0.00" 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AB3E6]"
                  value={formData.budget}
                  onChange={handleChange}
                />
                <DollarSign size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Pay Type</label>
              <select 
                name="payType"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AB3E6] cursor-pointer"
                value={formData.payType}
                onChange={handleChange}
              >
                <option value="Fixed">Fixed Price</option>
                <option value="Hourly">Hourly Rate</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea 
              name="description"
              required
              rows={4}
              placeholder="Describe the job details..." 
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AB3E6] resize-none"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 py-3 text-sm font-semibold text-white bg-[#4D7EAF] rounded-xl hover:bg-[#3d6691] transition-colors shadow-md disabled:bg-gray-400"
            >
              {isSubmitting ? 'Posting...' : 'Post Job'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PostJobModal;