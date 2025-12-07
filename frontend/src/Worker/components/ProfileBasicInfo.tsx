import React from 'react';

interface UserInfo {
  name: string;
  birthday: string;
  age: string;
  address: string;
  email: string;
  phone: string;
}

const initialUserInfo: UserInfo = {
  name: "Juan Dela Cruz",
  birthday: "January 7, 1995",
  age: "30",
  address: "123 Mango Avenue, Brgy. Kamputhaw, Cebu City, Cebu, 6000, Philippines",
  email: "juan.delacruz@gmail.com",
  phone: "+639974037085",
};

export default function BasicInfo() {
  const [userInfo, setUserInfo] = React.useState<UserInfo>(initialUserInfo);

  const handleSaveChanges = () => {
    console.log("Saving changes:", userInfo);
    alert("Changes saved! (Check console for data)");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const FormField: React.FC<{ label: string; name: keyof UserInfo; type?: string; isTextArea?: boolean }> = ({
    label,
    name,
    type = "text",
    isTextArea = false
  }) => (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-xs font-bold text-gray-700 mb-1 tracking-wide">{label.toUpperCase()}</label>
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          value={userInfo[name]}
          onChange={handleChange}
          rows={4}
          className="p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-800 resize-none bg-blue-50"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={userInfo[name]}
          onChange={handleChange}
          className="p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-800 bg-blue-50"
        />
      )}
    </div>
  );

  return (
    <div className="flex items-center justify-center w-full font-sans">
      <div className="w-full max-w-[880px] rounded-[20px] bg-white shadow-lg border border-gray-200 p-8 flex flex-col">
        <h2 className="text-xl font-bold mb-6" style={{ color: '#4D7EAF' }}>Basic Information</h2>

        <div className="grid grid-cols-3 gap-x-8 gap-y-5 flex-grow">
          <FormField label="Name" name="name" />
          <FormField label="Birthday" name="birthday" />
          <FormField label="Age" name="age" type="number" />

          <FormField label="Address" name="address" isTextArea />
          <FormField label="Email" name="email" type="email" />
          <FormField label="Phone" name="phone" type="tel" />
        </div>

        <div className="flex justify-end mt-6 shrink-0">
          <button
            onClick={handleSaveChanges}
            className="py-2 px-6 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#4D7EAF' }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
