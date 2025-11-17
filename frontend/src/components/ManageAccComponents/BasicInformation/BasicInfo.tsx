import React from 'react';

// Define the data type for the form fields
interface UserInfo {
  name: string;
  birthday: string;
  age: string;
  address: string;
  email: string;
  phone: string;
}

// Mock data to pre-fill the form
const initialUserInfo: UserInfo = {
  name: "Juan Dela Cruz",
  birthday: "January 7, 1995",
  age: "30",
  address: "123 Mango Avenue, Brgy. Kamputhaw, Cebu City, Cebu, 6000, Philippines",
  email: "juan.delacruz@gmail.com",
  phone: "+639974037085",
};

/**
 * Main App component that renders the Basic Information form.
 * Wrapped in a container to center it for a nice preview.
 */
export default function BasicInfo() {
  // In a real application, you would manage form state here
  // For this example, we'll just display the initial data
  const [userInfo, setUserInfo] = React.useState<UserInfo>(initialUserInfo);

  // Function to handle form submission (e.g., saving changes)
  const handleSaveChanges = () => {
    console.log("Saving changes:", userInfo);
    alert("Changes saved! (Check console for data)");
    // In a real app, you'd send this data to an API
  };

  // Generic input change handler for demonstration
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Helper component for a form field (label + input/textarea)
  const FormField: React.FC<{ label: string; name: keyof UserInfo; type?: string; isTextArea?: boolean }> = ({
    label,
    name,
    type = "text",
    isTextArea = false,
  }) => (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-xs font-bold text-gray-700 mb-1 tracking-wide">
        {label.toUpperCase()}
      </label>
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          value={userInfo[name]}
          onChange={handleChange}
          rows={4} // Adjust rows for address field
          className="
            p-2 border border-blue-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-400 
            text-sm text-gray-800 resize-none
            bg-blue-50
          "
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={userInfo[name]}
          onChange={handleChange}
          className="
            p-2 border border-blue-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-400 
            text-sm text-gray-800
            bg-blue-50
          "
        />
      )}
    </div>
  );

  return (
    // Outer div to center the component for preview
    <div className="flex items-center justify-center w-full font-sans">
      
      {/* Basic Information Card Container */}
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
        <h2 className="text-xl font-bold mb-6" style={{ color: '#4D7EAF' }}>
          Basic Information
        </h2>
        
        {/* Form Fields Grid */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-5 flex-grow">
          {/* Row 1 */}
          <FormField label="Name" name="name" />
          <FormField label="Birthday" name="birthday" />
          <FormField label="Age" name="age" type="number" />
          
          {/* Row 2 */}
          <FormField label="Address" name="address" isTextArea />
          <FormField label="Email" name="email" type="email" />
          <FormField label="Phone" name="phone" type="tel" />
        </div>
        
        {/* Save Changes Button */}
        <div className="flex justify-end mt-6 shrink-0">
          <button
            onClick={handleSaveChanges}
            className="
              py-2 px-6 rounded-lg 
              text-white font-semibold 
              hover:opacity-90 transition-opacity
            "
            style={{ backgroundColor: '#4D7EAF' }}
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}

