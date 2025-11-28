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
import "../assets/css/SettingsPage.css";

interface SettingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// 2. Updated SettingCard to use CSS classes
const SettingCard: React.FC<SettingCardProps> = ({
  icon,
  title,
  description,
}) => (
  // Use the .setting-card class
  <div className="setting-card">
    {/* Use the .setting-card-icon class */}
    <div className="setting-card-icon">{icon}</div>
    {/* Use the .setting-card-text class */}
    <div className="setting-card-text">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

export default function Settings() {
  return (
    // 3. Use .settings-page for the main container
    <div>
      <div className="settings-page">
        <div className="settings-content">
          <h1 className="settings-title">Settings</h1>
          <div className="settings-card-grid">
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
    </div>
  );
}
