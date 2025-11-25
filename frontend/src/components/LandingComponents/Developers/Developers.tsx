import React from 'react';


interface DeveloperCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  variant: 'primary' | 'secondary';
}

const SocialIcon: React.FC<{ children: React.ReactNode; href?: string }> = ({ children, href = "#" }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="bg-white w-8 h-8 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200 border border-gray-200 transition-all duration-300 shadow">
        {children}
    </a>
);


const DeveloperCard: React.FC<DeveloperCardProps> = ({ name, role, image, bio, variant }) => {
  const gradientClasses = {
    primary: 'bg-sky-800',
    secondary: 'bg-gray-500',
  };

  return (
    <div className="flex flex-col items-center font-sans w-48 rounded-2xl shadow-lg bg-white overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <div className={`w-full h-32 ${gradientClasses[variant]} relative pt-6 text-white text-center mb-2`}>
        <h1 className="text-l font-bold text-white">{name}<br/><h3 className='text-sm text-gray-200'>{role}</h3></h1>
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
            <img src={image} alt={`Developer ${name}`} className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"/>
        </div>
      </div>
      <div className="w-full pt-16 pb-6 px-6 flex flex-col items-center text-center">
        <p className="text-gray-600 text-xs px-12 mb-8 mt-2 h-12 w-60 flex items-center text-center">{bio}</p>
        <div className="flex space-x-3">
          <SocialIcon>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 8.118c-2.136 0-3.868 1.732-3.868 3.868s1.732 3.868 3.868 3.868 3.868-1.732 3.868-3.868S14.136 8.118 12 8.118zM12 14.15a2.15 2.15 0 110-4.3 2.15 2.15 0 010 4.3zM16.882 7.118a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clipRule="evenodd" /></svg>
          </SocialIcon>
          <SocialIcon>
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
          </SocialIcon>
          <SocialIcon>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.79 15.79 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1A17.97 17.97 0 013 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg>
          </SocialIcon>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;