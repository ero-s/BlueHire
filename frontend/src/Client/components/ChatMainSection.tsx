import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; 
import {
  Search,
  Info,
  MoreHorizontal,
  Send,
  Paperclip,
  X,
  Upload, // Used for the Upload icon
  ArrowLeft,
  Loader2 // Used for loading states
} from "lucide-react";

// --- PLACEHOLDER INTERFACES ---
interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
}

interface BackendChat {
    chatID: number;
    messageContent: string;
    senderId: number;
    receiverId: number;
    sentAt: string;
}

// --- Interfaces (Backend and UI remain correct) ---
interface BackendUser {
  userId: number;
  username: string;
  name: { firstName: string; lastName: string; };
  photoURL?: string;
  role?: string;
}

interface Booking {
    bookingID: number;
    client: { clientID: number, user: BackendUser } | null;
    worker: { workerID: number, user: BackendUser } | null;
    status: string; 
}

interface Contact {
  id: string; // Worker's USER ID
  name: string;
  status: "Active" | "Offline";
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unread?: number;
  role?: string;
}

// =========================================================
// 🚀 REPORT MODAL COMPONENT (Only First Name Displayed)
// =========================================================

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    targetUser: string;
    workerUserId: string | null;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, targetUser }) => {
    
    // State for form inputs
    const [bookingIdInput, setBookingIdInput] = useState<string>('');
    const [description, setDescription] = useState('');
    
    // State for file upload
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [proofFileURL, setProofFileURL] = useState<string | null>(null); // Stores the URL returned *after* upload
    const [isUploading, setIsUploading] = useState(false);
    
    // State for UI feedback
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Ref for file input
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // ********** CHANGE: EXTRACT FIRST NAME **********
    const firstName = targetUser.split(' ')[0];
    // ************************************************

    // Reset state when the modal opens or closes
    useEffect(() => {
        if (!isOpen) {
            // Reset form fields
            setBookingIdInput('');
            setDescription('');
            setSelectedFile(null);
            setProofFileURL(null);
            setIsUploading(false);
            // Reset status feedback
            setSubmitStatus('idle');
            setErrorMessage(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // --- File Handling Logic ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            // Automatically start the upload process upon file selection
            handleUploadFile(e.target.files[0]);
        }
    };

    const handleUploadFile = (file: File) => {
        if (!file) return;

        setIsUploading(true);
        setProofFileURL(null);
        setErrorMessage(null);

        // --- START SIMULATED UPLOAD ---
        setTimeout(() => {
            const simulatedUrl = `http://cdn.bluehire.com/proofs/${Date.now()}_${file.name.replace(/[^a-z0-9]/gi, '_')}`;
            setProofFileURL(simulatedUrl);
            setIsUploading(false);
            console.log("Simulated upload successful. URL:", simulatedUrl);
        }, 1500); // Simulate network latency
        // --- END SIMULATED UPLOAD ---
    };

    // --- Report Submission Logic ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const bookingId = Number(bookingIdInput);
        if (!bookingId || isNaN(bookingId) || description.trim() === '') {
            setErrorMessage('Please enter a valid numeric Booking ID and a description.');
            setSubmitStatus('error');
            return;
        }

        if (isUploading) {
            setErrorMessage('Please wait for the file upload to complete before submitting.');
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage(null);

        try {
            const reportPayload = {
                description: description,
                // Use the URL from the successful upload, or null if no file was uploaded
                proofFileURL: proofFileURL, 
            };

            // Backend endpoint: POST /reports/booking/{bookingId}
            const response = await axios.post(
                `http://localhost:8080/reports/booking/${bookingId}`,
                reportPayload
            );

            console.log("Report submitted successfully:", response.data);
            setSubmitStatus('success');
            setTimeout(onClose, 2000); 

        } catch (error: any) {
            console.error("Report submission failed:", error);
            setSubmitStatus('error');
            
            const errorMsg = error.response?.data?.message || error.message;
            setErrorMessage(typeof errorMsg === 'string' 
                ? errorMsg 
                : "Failed to submit report. Please check the Booking ID or console for network details."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300">
                
                {/* Header (Styling adjusted for black title, smaller blue name) */}
                <div className="flex justify-between items-center mb-6 border-b pb-3">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 min-w-0 whitespace-nowrap"> 
                        <Info size={24} className="text-blue-600 flex-shrink-0" />
                        <span className="truncate"> 
                            Submit Report for: 
                            <span className="text-lg text-blue-600 font-extrabold ml-1"> 
                                 {firstName} {/* DISPLAYING ONLY FIRST NAME */}
                            </span>
                        </span>
                    </h3>
                    <button onClick={onClose} className="flex-shrink-0 text-gray-400 hover:text-gray-700 p-1 rounded-full transition" disabled={isSubmitting || isUploading}>
                        <X size={20} />
                    </button>
                </div>

                {/* Status/Error Message */}
                {submitStatus === 'error' && errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        **Error:** {errorMessage}
                    </div>
                )}
                {submitStatus === 'success' && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                        Report submitted successfully! The team will review it shortly.
                    </div>
                )}


                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Booking ID Input */}
                    <div>
                        <label htmlFor="bookingId" className="block text-sm font-medium text-gray-700 mb-1">
                            Booking ID (Required to specify the job)
                        </label>
                        <input
                            id="bookingId"
                            type="number"
                            value={bookingIdInput}
                            onChange={(e) => setBookingIdInput(e.target.value)}
                            placeholder="e.g., 101"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition"
                            disabled={isSubmitting || submitStatus === 'success' || isUploading}
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Detailed Description of the Issue
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe what happened clearly and professionally..."
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition"
                            disabled={isSubmitting || submitStatus === 'success' || isUploading}
                        />
                    </div>

                    {/* Proof File UPLOAD Button */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Proof File / Evidence (Optional)
                        </label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*,video/*,application/pdf"
                            hidden
                            disabled={isSubmitting || submitStatus === 'success' || isUploading}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition duration-300 border ${
                                isUploading
                                    ? 'bg-blue-100 text-blue-600 border-blue-400 cursor-wait'
                                    : proofFileURL
                                    ? 'bg-green-100 text-green-600 border-green-400 hover:bg-green-200'
                                    : 'bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100'
                            }`}
                            disabled={isSubmitting || submitStatus === 'success' || isUploading}
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Uploading...
                                </>
                            ) : proofFileURL ? (
                                <>
                                    <Paperclip size={20} />
                                    File Uploaded: {selectedFile?.name || 'File Link Ready'}
                                </>
                            ) : (
                                <>
                                    <Upload size={20} />
                                    Choose File (Max 10MB)
                                </>
                            )}
                        </button>
                        {proofFileURL && (
                            <p className="text-xs text-green-600 mt-1 truncate">
                                Proof URL generated. Ready to submit.
                            </p>
                        )}
                        
                    </div>
                    
                    {/* Submission Button */}
                    <button
                        type="submit"
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-lg font-semibold rounded-xl transition duration-300 ${
                            isSubmitting || submitStatus === 'success' || isUploading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                        }`}
                        disabled={isSubmitting || submitStatus === 'success' || isUploading}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Submitting Report...
                            </>
                        ) : submitStatus === 'success' ? (
                            "Report Submitted!"
                        ) : (
                            "Submit Official Report"
                        )}
                    </button>
                    
                </form>

                <div className="mt-4 text-center">
                    <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700 transition" disabled={isSubmitting || submitStatus === 'success' || isUploading}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
// =========================================================


const Chat: React.FC = () => {
  // 1. Get Current Client ID (Default to 1 if not found in storage)
  const CURRENT_USER_ID = Number(localStorage.getItem("userId")) || 1;

  // State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isLoadingContacts, setIsLoadingContacts] = useState(true); 

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Helper variables
  const selectedContact = contacts.find((c) => c.id === selectedContactId);
  const myAvatar = "https://i.pravatar.cc/150?u=99";

  // --- 2. Fetch Contacts (Workers for Active Bookings) ---
  useEffect(() => {
    const fetchContacts = async () => {
      if (!CURRENT_USER_ID) return;
      setIsLoadingContacts(true);
      
      try {
        // Step 1: Find the Client's ClientID (Needed for booking filter)
        const clientResponse = await axios.get("http://localhost:8080/api/client/getAllClients");
        // Assuming clientID corresponds directly to the user
        const clientProfile = clientResponse.data.find((c: any) => c.user.userId === CURRENT_USER_ID);
        
        if (!clientProfile) {
            console.warn("Client profile not found for current user ID:", CURRENT_USER_ID);
            setContacts([]);
            return;
        }
        const clientID = clientProfile.clientID;

        // Step 2: Fetch all bookings
        const bookingResponse = await axios.get("http://localhost:8080/booking/getAll");
        const allBookings: Booking[] = bookingResponse.data;

        // Set to store unique worker User IDs
        const uniqueWorkerUserIds: Set<string> = new Set();
        const workerContacts: Contact[] = [];

        // Step 3: Filter bookings to find assigned workers for this client
        allBookings
            .filter(b => 
                // Filter by my client ID AND ensure a worker is assigned
                b.client?.clientID === clientID && 
                b.worker !== null && 
                b.worker.user?.userId 
            ) 
            .forEach(b => {
                const workerUser = b.worker!.user;
                const workerUserId = workerUser.userId.toString();

                if (!uniqueWorkerUserIds.has(workerUserId)) {
                    uniqueWorkerUserIds.add(workerUserId);
                    const fullName = `${workerUser.name.firstName} ${workerUser.name.lastName}`;
                    
                    workerContacts.push({
                        id: workerUserId,
                        name: fullName,
                        status: "Active", // Assuming Active if assigned
                        role: workerUser.role || "Worker",
                        avatar: workerUser.photoURL || `https://ui-avatars.com/api/?name=${fullName}&background=random`,
                        lastMessage: "Start a conversation!",
                        lastTime: "",
                        unread: 0,
                    });
                }
            });

        setContacts(workerContacts);

        // Automatically select the first worker
        if (!selectedContactId && workerContacts.length > 0) {
          setSelectedContactId(workerContacts[0].id);
        }
      } catch (error) {
        console.error("Error fetching worker contacts:", error);
      } finally {
        setIsLoadingContacts(false);
      }
    };

    fetchContacts();
  }, [CURRENT_USER_ID]);


  // --- 3. Fetch Messages & Polling (Remains Unchanged) ---
  const fetchMessages = async () => {
    if (!selectedContactId) return;

    try {
      const response = await axios.get("http://localhost:8080/chats");
      const allChats: BackendChat[] = response.data;
      const targetId = Number(selectedContactId);

      // Filter chats: Me <-> Selected User
      const filtered = allChats.filter(
        (chat) =>
          (chat.senderId === CURRENT_USER_ID && chat.receiverId === targetId) ||
          (chat.senderId === targetId && chat.receiverId === CURRENT_USER_ID)
      );

      // Map to UI Message format
      const formattedMessages: Message[] = filtered.map((chat) => ({
        id: chat.chatID.toString(),
        text: chat.messageContent,
        sender: chat.senderId === CURRENT_USER_ID ? "me" : "other",
        time: new Date(chat.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Poll for new messages every 2 seconds
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [selectedContactId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showMobileChat]);

  // --- 4. Send Message to DB (Remains Unchanged) ---
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedContactId) return;

    try {
      const payload = {
        messageContent: messageInput,
        senderId: CURRENT_USER_ID,
        receiverId: Number(selectedContactId),
        sentAt: new Date().toISOString()
      };

      await axios.post("http://localhost:8080/chats", payload);

      setMessageInput("");
      fetchMessages(); // Refresh UI immediately
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleContactClick = (id: string) => {
    setSelectedContactId(id);
    setShowMobileChat(true);
  };

  const handleBackToContacts = () => {
    setShowMobileChat(false);
  };

  // --- RENDER ---
  return (
    <div>
      <div className="h-[calc(100vh-7rem)] p-4 w-full mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 w-full h-full">

          {/* --- Sidebar: Contacts List --- */}
          <div
            className={`
          ${showMobileChat ? "hidden lg:flex" : "flex"}
          w-full lg:w-[350px] bg-white lg:rounded-3xl rounded-xl p-4 lg:p-6 shadow-sm flex-col h-full border border-gray-100
        `}
          >
            <div className="flex justify-between items-center mb-4 lg:mb-6">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                Assigned Workers
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar min-h-0">
              {isLoadingContacts ? (
                <div className="flex items-center justify-center py-10 text-gray-500 gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    <span>Finding assigned workers...</span>
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center text-gray-400 mt-10">No assigned workers found.</div>
              ) : (
                contacts.map((contact) => (
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
                        className="w-12 h-12 rounded-full object-cover bg-gray-200"
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
                      </div>
                      <p className="text-xs text-gray-500 truncate">{contact.role}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* --- Main Chat Window --- */}
          <div
            className={`
          ${!showMobileChat ? "hidden lg:flex" : "flex"}
          flex-1 bg-white lg:rounded-3xl rounded-xl shadow-sm flex-col overflow-hidden h-full border border-gray-100
        `}
          >
            {selectedContact ? (
              <>
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
                        className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover bg-gray-200"
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
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2 opacity-60">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                        <MoreHorizontal size={32} />
                      </div>
                      <p className="text-sm">No messages yet.</p>
                      <p className="text-xs">Say hi to {selectedContact.name}!</p>
                    </div>
                  ) : (
                    messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex w-full ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex max-w-[85%] lg:max-w-[70%] gap-2 lg:gap-3 ${msg.sender === "me" ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div className="flex-shrink-0 mt-auto hidden sm:block">
                            <img
                              src={msg.sender === "me" ? myAvatar : selectedContact.avatar}
                              className="w-8 h-8 lg:w-8 lg:h-8 rounded-full object-cover mb-1 bg-gray-200"
                              alt="Avatar"
                            />
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
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />

                    <div className="flex items-center gap-1 lg:gap-2 pr-2 text-gray-400">
                      <button className="hover:text-[#3b82f6] hover:bg-blue-50 p-2 rounded-full transition hidden sm:block">
                        <Paperclip size={20} />
                      </button>
                      <button
                        className="bg-[#3b82f6] text-white p-2 rounded-xl hover:bg-[#2563eb] transition-transform active:scale-95 shadow-md"
                        onClick={handleSendMessage}
                      >
                        <Send size={18} />
                      </button>
                    </div>
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
              workerUserId={selectedContact.id} // Passing the worker's user ID
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;