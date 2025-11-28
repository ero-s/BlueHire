import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Info,
  MoreHorizontal,
  Send,
  Paperclip,
  X,
  Upload,
  ArrowLeft,
} from "lucide-react";

// --- 1. FIXED: Interfaces defined internally (No extra file needed) ---
interface Contact {
  id: string;
  name: string;
  status: "Active" | "Offline";
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unread?: number;
  role?: string;
}

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
}

// --- Mock Data ---
const MOCK_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Juan Dela Cruz",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=1",
    lastMessage: "See you tomorrow!",
    lastTime: "1:04 pm",
    unread: 1,
  },
  {
    id: "2",
    name: "Shervin Maupo",
    role: "chat",
    status: "Offline",
    avatar: "https://i.pravatar.cc/150?u=2",
    lastMessage: "Is the price negotiable?",
    lastTime: "7:28 pm",
  },
  {
    id: "3",
    name: "Leni Robredo",
    role: "chat",
    status: "Offline",
    avatar: "https://i.pravatar.cc/150?u=3",
    lastMessage: "Thanks for the great service.",
    lastTime: "7:25 pm",
  },
  {
    id: "4",
    name: "Jose P. Rizal",
    role: "chat",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=4",
    lastMessage: "I am on my way.",
    lastTime: "7:25 pm",
  },
  {
    id: "5",
    name: "She Guaddy",
    role: "chat",
    status: "Offline",
    avatar: "https://i.pravatar.cc/150?u=5",
    lastMessage: "Can you reschedule?",
    lastTime: "6:23 pm",
  },
];

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hello! I saw your request for plumbing services.",
    sender: "other",
    time: "8:00 PM",
  },
  {
    id: "2",
    text: "Hi Juan, yes. My kitchen sink is leaking badly.",
    sender: "me",
    time: "8:01 PM",
  },
  {
    id: "3",
    text: "I can come by tomorrow around 2 PM to check it out.",
    sender: "other",
    time: "8:02 PM",
  },
  {
    id: "4",
    text: "That works perfectly for me. How much is the visitation fee?",
    sender: "me",
    time: "8:03 PM",
  },
  {
    id: "5",
    text: "It is $25 for the diagnosis, deductible if you proceed with the repair.",
    sender: "other",
    time: "8:05 PM",
  },
  { id: "6", text: "Great, see you tomorrow!", sender: "me", time: "8:06 PM" },
];

// --- Sub-Component: Report Modal ---
interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: string;
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetUser,
}) => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Report Submitted for", targetUser);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Removed custom 'animate-fade-in-up' and replaced with standard Tailwind 'animate-bounce' or just removed for safety */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transition-all transform scale-100 opacity-100">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-xl font-bold text-[#3b82f6]">Report User</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reporting:{" "}
              <span className="font-bold text-[#3b82f6]">{targetUser}</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#60a5fa] h-32 resize-none"
              placeholder="Describe the issue..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proof (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
              <input
                type="file"
                className="hidden"
                id="proof-upload"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
              />
              <label
                htmlFor="proof-upload"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="text-gray-400 mb-1" size={24} />
                <span className="text-xs text-gray-500">
                  {file ? file.name : "Click to upload image/file"}
                </span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main Chat Component ---

const Chat: React.FC = () => {
  const [selectedContactId, setSelectedContactId] = useState<string>("1");
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMessages = selectedContactId === "1" ? MOCK_MESSAGES : [];
  const selectedContact =
    MOCK_CONTACTS.find((c) => c.id === selectedContactId) || MOCK_CONTACTS[0];
  const myAvatar = "https://i.pravatar.cc/150?u=99";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages, showMobileChat]);

  const handleContactClick = (id: string) => {
    setSelectedContactId(id);
    setShowMobileChat(true);
  };

  const handleBackToContacts = () => {
    setShowMobileChat(false);
  };

  return (
    <div>
      <div className="h-[calc(100vh-7rem)] p-4 w-full mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 w-full h-full">
          {/* --- Sidebar: Messages List --- */}
          <div
            className={`
          ${showMobileChat ? "hidden lg:flex" : "flex"} 
          w-full lg:w-[350px] bg-white lg:rounded-3xl rounded-xl p-4 lg:p-6 shadow-sm flex-col h-full border border-gray-100
        `}
          >
            <div className="flex justify-between items-center mb-4 lg:mb-6">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                Messages
              </h2>
            </div>

            <div className="flex items-center gap-2 mb-4 lg:mb-6 flex-shrink-0">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search messages"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar min-h-0">
              {MOCK_CONTACTS.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleContactClick(contact.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 border
                  ${
                    selectedContactId === contact.id
                      ? "bg-blue-50/50 border-[#3b82f6] shadow-sm"
                      : "bg-transparent border-transparent hover:bg-gray-50"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {contact.status === "Active" && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">
                        {contact.name}
                      </h4>
                      {contact.unread && (
                        <span className="bg-[#3b82f6] text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full flex-shrink-0 ml-2">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs truncate ${contact.unread ? "text-gray-800 font-medium" : "text-gray-500"}`}
                    >
                      {contact.lastMessage}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between h-10 flex-shrink-0">
                    <span className="text-[10px] text-gray-400">
                      {contact.lastTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- Main Chat Window --- */}
          <div
            className={`
          ${!showMobileChat ? "hidden lg:flex" : "flex"}
          flex-1 bg-white lg:rounded-3xl rounded-xl shadow-sm flex-col overflow-hidden h-full border border-gray-100
        `}
          >
            {/* Chat Header */}
            <div className="px-4 lg:px-8 py-4 lg:py-5 border-b border-gray-100 flex justify-between items-center flex-shrink-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToContacts}
                  className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <ArrowLeft size={20} />
                </button>

                <div className="relative">
                  <img
                    src={selectedContact.avatar}
                    alt={selectedContact.name}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-base lg:text-lg leading-tight">
                    {selectedContact.name}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-500">
                    {selectedContact.status}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsReportModalOpen(true)}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white transition-all duration-200"
                title="Report User"
              >
                <Info size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[#f9fafb] space-y-6 lg:space-y-8 min-h-0">
              {currentMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2 opacity-60">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <MoreHorizontal size={32} />
                  </div>
                  <p className="text-sm">No messages yet.</p>
                  <p className="text-xs">Say hi to {selectedContact.name}!</p>
                </div>
              ) : (
                currentMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex w-full ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex max-w-[85%] lg:max-w-[70%] gap-2 lg:gap-3 ${msg.sender === "me" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className="flex-shrink-0 mt-auto hidden sm:block">
                        {msg.sender === "me" ? (
                          <img
                            src={myAvatar}
                            className="w-8 h-8 lg:w-8 lg:h-8 rounded-full object-cover mb-1"
                            alt="Me"
                          />
                        ) : (
                          <img
                            src={selectedContact.avatar}
                            className="w-8 h-8 lg:w-8 lg:h-8 rounded-full object-cover mb-1"
                            alt="Them"
                          />
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <div
                          className={`p-3 lg:p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                        ${
                          msg.sender === "me"
                            ? "bg-[#3b82f6] text-white rounded-tr-none"
                            : "bg-white text-gray-700 border border-gray-200 rounded-tl-none"
                        }`}
                        >
                          {msg.text}
                        </div>
                        <span
                          className={`text-[10px] text-gray-400 ${msg.sender === "me" ? "text-right" : "text-left"} px-1`}
                        >
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 lg:p-6 pt-2 flex-shrink-0 bg-white border-t border-gray-100">
              <div className="border border-gray-200 rounded-2xl flex items-center p-2 bg-gray-50 gap-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white transition-all">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-2 lg:px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setMessageInput("")}
                />

                <div className="flex items-center gap-1 lg:gap-2 pr-2 text-gray-400">
                  <button className="hover:text-[#3b82f6] hover:bg-blue-50 p-2 rounded-full transition hidden sm:block">
                    <Paperclip size={20} />
                  </button>
                  <button
                    className="bg-[#3b82f6] text-white p-2 rounded-xl hover:bg-[#2563eb] transition-transform active:scale-95 shadow-md"
                    onClick={() => setMessageInput("")}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ReportModal
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
            targetUser={selectedContact.name}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
