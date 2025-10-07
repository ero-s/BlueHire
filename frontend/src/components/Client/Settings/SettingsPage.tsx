import React from "react";
import {
  Shield,
  CreditCard,
  Bell,
  BarChart2,
  User,
  Globe,
  Briefcase,
} from "lucide-react";

interface SettingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SettingCard: React.FC<SettingCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white shadow-sm hover:shadow-md rounded-2xl p-5 transition-all duration-200 cursor-pointer">
    <div className="flex items-start space-x-3">
      <div className="text-gray-700">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </div>
);

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50 px-10 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Settings</h1>

        {/* ✅ This grid creates the card layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SettingCard
            icon={<User size={24} />}
            title="Personal Information"
            description="Provide personal details and credentials to become verified"
          />
          <SettingCard
            icon={<Shield size={24} />}
            title="Login & Security"
            description="Update your password and secure your account"
          />
          <SettingCard
            icon={<CreditCard size={24} />}
            title="Transaction History"
            description="Review payments"
          />
          <SettingCard
            icon={<Globe size={24} />}
            title="Preferences"
            description="Set preferred language, currency, and display styles"
          />
          <SettingCard
            icon={<Bell size={24} />}
            title="Notifications"
            description="Choose notification preferences and how you want to be contacted"
          />
          <SettingCard
            icon={<BarChart2 size={24} />}
            title="Analytics"
            description="Review graphs based on recent activities"
          />
          <SettingCard
            icon={<Briefcase size={24} />}
            title="Job Bookings"
            description="Review job booking records"
          />
        </div>
      </div>
    </div>
  );
}
