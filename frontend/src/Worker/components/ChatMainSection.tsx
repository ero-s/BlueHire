import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Search, Plus, Info, MoreHorizontal, Send, Paperclip, Check, X, Upload, ArrowLeft, Loader2
} from 'lucide-react';

// --- Interfaces ---

// Matches your Java Chat Entity
interface BackendChat {
  chatID: number;
  messageContent: string;
  senderId: number;
  receiverId: number;
  sentAt: string; // ISO String from Java
}

// Interface for User data fetched from /api/user/getAllUsers or similar
interface BackendUser {
  userId: number;
  username: string;
  name: { firstName: string; lastName: string };
  photoURL?: string;
  role?: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

// Contact for the sidebar
interface Contact {
  id: string; // This represents the USER ID of the other person (as a string)
  name: string;
  role?: string;
  status: 'Active' | 'Offline';
  avatar: string;
}

// --- Sub-Component: Report Modal (Simplified for flow) ---
interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: string;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, targetUser }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-xl font-bold text-[#4D7EAF]">Report User</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="text-center py-4">Report functionality here for {targetUser}</div>
        <button onClick={onClose} className="w-full bg-gray-200 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

// --- Main Chat Component ---

const ChatMainSection: React.FC = () => {
  // 1. FETCH CURRENT USER ID (Worker)
  const storedUser = localStorage.getItem("currentUser");
  const CURRENT_USER_ID = storedUser ? JSON.parse(storedUser).userId : null;
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get current contact info
  const selectedContact = contacts.find(c => c.id === selectedContactId);
  
  // Fallback avatar for the current user
  const myAvatar = "https://i.pravatar.cc/150?u=99"; 

  // --- 1. Fetch Contacts (All Users) ---
  useEffect(() => {
    if (!CURRENT_USER_ID) return;

    const fetchContacts = async () => {
      setIsLoadingContacts(true);
      try {
        const response = await axios.get("http://localhost:8080/api/user/getAllUsers");
        const allUsers: BackendUser[] = response.data;

        // Filter out the current user and map to Contact interface
        const mappedContacts: Contact[] = allUsers
          .filter((u) => u.userId !== CURRENT_USER_ID)
          .map((u) => {
            const fullName = `${u.name.firstName} ${u.name.lastName}`;
            return {
              id: u.userId.toString(),
              name: fullName,
              role: u.role || "User",
              status: "Active", // Assuming active unless you have a real status system
              avatar: u.photoURL || `https://ui-avatars.com/api/?name=${fullName}&background=random`,
            };
          });

        setContacts(mappedContacts);
        
        // Select the first contact if none is selected
        if (!selectedContactId && mappedContacts.length > 0) {
          setSelectedContactId(mappedContacts[0].id);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setIsLoadingContacts(false);
      }
    };
    
    fetchContacts();
  }, [CURRENT_USER_ID]);


  // --- 2. Fetch Messages Function (Uses real IDs) ---
  const fetchMessages = async () => {
    if (!selectedContactId || !CURRENT_USER_ID) return;

    try {
      const targetId = Number(selectedContactId);
      const response = await axios.get("http://localhost:8080/chats");
      const allChats: BackendChat[] = response.data;

      // Filter messages: Only show chats between ME and SELECTED CONTACT
      const filtered = allChats.filter(chat =>
        (chat.senderId === CURRENT_USER_ID && chat.receiverId === targetId) ||
        (chat.senderId === targetId && chat.receiverId === CURRENT_USER_ID)
      );

      // Map Backend Data to Frontend Format
      const formattedMessages: Message[] = filtered.map(chat => ({
        id: chat.chatID.toString(),
        text: chat.messageContent,
        sender: chat.senderId === CURRENT_USER_ID ? 'me' : 'other',
        time: new Date(chat.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  // --- 3. Initial Load & Polling (Auto-refresh) ---
  useEffect(() => {
    fetchMessages(); 
    const interval = setInterval(fetchMessages, 2000); 
    return () => clearInterval(interval); 
  }, [selectedContactId, CURRENT_USER_ID]); 

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showMobileChat]);

  // --- 4. Send Message Function ---
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedContactId || !CURRENT_USER_ID) return;

    try {
      const payload = {
        messageContent: messageInput,
        senderId: CURRENT_USER_ID,
        receiverId: Number(selectedContactId),
        sentAt: new Date().toISOString() 
      };

      await axios.post("http://localhost:8080/chats", payload);

      setMessageInput(''); // Clear input
      fetchMessages(); // Refresh list immediately
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  // --- UI Handlers ---
  const handleContactClick = (id: string) => {
    setSelectedContactId(id);
    setShowMobileChat(true);
  };
  
  // Handle case where user is not logged in or contacts are loading
  if (!CURRENT_USER_ID) {
    return <div className="h-full flex items-center justify-center text-red-500">Please log in to view messages.</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1400px] mx-auto h-full overflow-hidden">

      {/* --- Sidebar: Contacts List --- */}
      <div className={`${showMobileChat ? 'hidden lg:flex' : 'flex'} w-full lg:w-[350px] bg-white lg:rounded-3xl rounded-none p-4 lg:p-6 shadow-sm flex-col h-full`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
        </div>

        {/* Contact List Loop */}
        {isLoadingContacts ? (
          <div className="flex items-center justify-center py-10 text-gray-500 gap-2">
            <Loader2 className="animate-spin" size={20} />
            <span>Loading contacts...</span>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleContactClick(contact.id)}
                className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 border
                  ${selectedContactId === contact.id ? 'bg-blue-50 border-[#5AB3E6]' : 'border-transparent hover:bg-gray-50'}`}
              >
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm truncate">{contact.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{contact.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Main Chat Window --- */}
      <div className={`${!showMobileChat ? 'hidden lg:flex' : 'flex'} flex-1 bg-white lg:rounded-3xl rounded-none shadow-sm flex-col overflow-hidden h-full`}>

        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowMobileChat(false)} className="lg:hidden p-2"><ArrowLeft size={20} /></button>
                <img src={selectedContact.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-gray-800">{selectedContact.name}</h3>
                  <p className="text-xs text-gray-500">{selectedContact.status}</p>
                </div>
              </div>
              <button onClick={() => setIsReportModalOpen(true)} className="p-2 bg-blue-50 text-[#4D7EAF] rounded-full"><Info size={20} /></button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                   <p>No messages yet with {selectedContact.name}.</p>
                   <p className="text-xs">Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className={`flex w-full ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex max-w-[75%] gap-2 ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <img src={msg.sender === 'me' ? myAvatar : selectedContact.avatar} className="w-8 h-8 rounded-full object-cover" alt="Avatar" />
                      <div className="flex flex-col gap-1">
                        <div className={`p-3 rounded-xl text-sm ${msg.sender === 'me' ? 'bg-[#4D7EAF] text-white' : 'bg-gray-100 text-gray-700'}`}>
                          {msg.text}
                        </div>
                        <span className={`text-[10px] text-gray-400 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>{msg.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent px-4 py-2 focus:outline-none text-sm"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button onClick={handleSendMessage} className="p-2 text-[#4D7EAF] hover:bg-white rounded-full transition shadow-sm">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a contact to start chatting
          </div>
        )}
      </div>
      {selectedContact && (
        <ReportModal 
          isOpen={isReportModalOpen} 
          onClose={() => setIsReportModalOpen(false)} 
          targetUser={selectedContact.name} 
        />
      )}
    </div>
  );
};

export default ChatMainSection;