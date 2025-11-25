import React from 'react';

/**
 * Main App component that renders the Payment Preferences.
 * Wrapped in a container to center it for a nice preview.
 */
export default function PaymentPreference() {

  // Helper component for the preference boxes
  // In a real app, these might be clickable buttons
  const PreferenceBox: React.FC = () => (
    <div className="
      w-full 
      aspect-square 
      rounded-lg 
      border border-blue-300 
      bg-blue-50
    ">
      {/* Content for the payment preference (e.g., an icon) could go here */}
    </div>
  );

  return (
    // Outer div to center the component for preview
    <div className="flex items-center justify-center w-full font-sans">
      
      {/* Payment Preferences Card Container */}
      <div className="
        w-full max-w-[880px]
        rounded-[20px] 
        bg-white 
        shadow-lg 
        border border-gray-200 
        p-6 
        flex flex-col
      ">
        
        {/* Header */}
        <h2 className="
          text-xl font-bold mb-4 
          text-left
        " style={{ color: '#4D7EAF' }}>
          Payment Preferences
        </h2>
        
        {/* Boxes Container 
          - flex-row: Stacks items horizontally
          - flex-grow: Fills the available vertical space
          - justify-around: Distributes boxes evenly
          - items-center: Centers boxes vertically
        */}
        <div className="
          flex flex-row 
          flex-grow 
          w-full 
          justify-around 
          items-center
          gap-8
          px-8
        ">
          <PreferenceBox />
          <PreferenceBox />
          <PreferenceBox />
          <PreferenceBox />
        </div>

      </div>
    </div>
  );
}


