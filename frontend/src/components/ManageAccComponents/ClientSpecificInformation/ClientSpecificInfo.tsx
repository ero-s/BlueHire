import React from 'react';

/**
 * Main App component that renders the Client-Specific Information form.
 * Wrapped in a container to center it for a nice preview.
 */
export default function ClientSpecificInfo() {
  // Helper component for the form fields
  // In a real app, these would have 'name', 'value', and 'onChange' props
  const FormField: React.FC<{ placeholder: string }> = ({ placeholder }) => (
    <div className="flex flex-col h-full">
      {/* The image doesn't show labels, so we'll just use textareas as inputs.
        'flex-grow' and 'h-full' will make them fill the available vertical space.
      */}
      <textarea
        placeholder={placeholder}
        className="
          p-2 border border-blue-300 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-400 
          text-sm text-gray-800 resize-none
          bg-blue-50
          h-full w-full
        "
      />
    </div>
  );

  return (
    // Outer div to center the component for preview
    <div className="flex items-center justify-center  w-full font-sans">
      
      {/* Client-Specific Information Card Container */}
      <div className="
        w-full max-w-[880px]
        rounded-[20px] 
        bg-white 
        shadow-lg 
        border border-gray-200 
        p-8 
        flex flex-col
      ">
        
        {/* Header */}
        <h2 className="text-xl font-bold mb-4 shrink-0" style={{ color: '#4D7EAF' }}>
          Client-Specific Information
        </h2>
        
        {/* Form Fields Grid 
          'flex-grow' will make this grid take up the remaining space
        */}
        <div className="grid grid-cols-2 gap-x-8 flex-grow">
          {/* We'll add placeholder text since no labels are visible */}
          <FormField placeholder="Enter information..." />
          <FormField placeholder="Enter information..." />
        </div>
        
        {/* No "Save" button is visible in this image, 
          so it's omitted from this component.
        */}

      </div>
    </div>
  );
}

