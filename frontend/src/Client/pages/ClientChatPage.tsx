import React from 'react';
import ChatMainSection from '../components/ChatMainSection';
import Header from '../components/ClientHeader';

// --- Chat Page Component ---

const ClientChatPage: React.FC = () => {
  return (
    // h-screen makes the whole page the height of the viewport
    // flex-col allows us to stack Navbar and Main content
    <div className="h-screen bg-[#F6F6F6] font-sans flex flex-col overflow-hidden">
      <Header userName='Sherielyn Guadiana'/>
      
      {/* flex-1 makes this take up all remaining space. 
          overflow-hidden prevents double scrollbars 
          pb-4 adds padding at bottom mainly for desktop aesthetics 
      */}
      <div className="flex-1 w-full overflow-hidden px-0 lg:px-6 pb-0 lg:pb-6 mt-24">
        <ChatMainSection />
      </div>
    </div>
  );
};

export default ClientChatPage;