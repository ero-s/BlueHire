import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Clock, Loader2 } from "lucide-react";

// --- Interfaces for Backend Data Mapping ---
interface WorkerDetails {
    name: string;
    avatar: string;
    category: string;
}

interface Booking {
    id: string;
    worker: WorkerDetails;
    serviceDate: string; // The scheduled date/time string
    status: string;
}

interface PendingRequestsProps {
    count?: number; // Optional prop to limit the number of displayed items
}

export default function PendingRequests({ count }: PendingRequestsProps) {
    const navigate = useNavigate();
    const [pendingBookings, setPendingBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentClientId, setCurrentClientId] = useState<number | null>(null);

    // 1. Fetch Client ID
    useEffect(() => {
        const fetchClientProfile = async () => {
            const storedUser = localStorage.getItem("currentUser");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                try {
                    // Fetch all clients to find the current client's ID based on userId
                    const response = await fetch("http://localhost:8080/api/client/getAllClients");
                    if (response.ok) {
                        const clients = await response.json();
                        const myProfile = clients.find((c: any) => c.user.userId === user.userId);
                        if (myProfile) setCurrentClientId(myProfile.clientID);
                    }
                } catch (error) {
                    console.error("Failed to load client profile", error);
                }
            }
            // Note: Loading state relies on the fetch below, but we set it to false if no user is found
            if (!storedUser) setLoading(false);
        };
        fetchClientProfile();
    }, []);

    // 2. Fetch Pending Bookings
    useEffect(() => {
        const fetchRequests = async () => {
            if (!currentClientId) return; // Wait until client ID is established

            setLoading(true);
            try {
                const response = await fetch("http://localhost:8080/booking/getAll");
                if (response.ok) {
                    const allBookings = await response.json();
                    
                    // Filter bookings by client ID and 'Pending' status
                    const clientPendingBookings = allBookings
                        .filter((b: any) => 
                            b.client && 
                            b.client.clientID === currentClientId && 
                            b.status === 'Pending' 
                        )
                        .slice(0, count || 5); // Apply the limit/count prop

                    const mappedBookings: Booking[] = clientPendingBookings.map((b: any) => {
                        const workerFirstName = b.worker?.user?.name?.firstName || '';
                        const workerLastName = b.worker?.user?.name?.lastName || '';

                        return {
                            id: b.bookingID.toString(),
                            worker: {
                                name: b.worker?.user?.name ? `${workerFirstName} ${workerLastName}` : "Worker Not Assigned",
                                category: b.serviceCategory || "General Service",
                                // Avatar fallback using initials
                                avatar: b.worker?.user?.photoURL || 
                                    `https://ui-avatars.com/api/?name=${workerFirstName}+${workerLastName}&background=random&color=fff&size=128&rounded=true`,
                            },
                            // Format date for display
                            serviceDate: b.scheduledDateTime ? new Date(b.scheduledDateTime).toLocaleDateString() : "N/A Date",
                            status: b.status,
                        };
                    });

                    setPendingBookings(mappedBookings);
                } else {
                    console.error("Failed to fetch bookings:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching pending requests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [currentClientId, count]);

    // Handler for navigation
    const handleItemClick = (bookingId: string) => {
        // Redirect to client bookings page and pass the ID to highlight
        navigate("/client/bookings", { state: { highlightId: bookingId } });
    };

    return (
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex-1 flex flex-col h-full min-w-[300px]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Pending Requests</h2>
                <button
                    onClick={() => navigate("/client/bookings")}
                    className="text-sm text-[#4F7FAF] font-semibold hover:underline"
                >
                    View All
                </button>
            </div>
            
            {loading ? (
                <div className="flex items-center justify-center h-40 text-[#4F7FAF]">
                    <Loader2 className="animate-spin mr-2" size={20} />
                    <span>Loading...</span>
                </div>
            ) : (
                <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar flex-1">
                    {pendingBookings.length > 0 ? (
                        pendingBookings.map((booking) => (
                            <div
                                key={booking.id}
                                onClick={() => handleItemClick(booking.id)}
                                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-blue-50 cursor-pointer transition-colors border border-transparent hover:border-blue-100 group"
                            >
                                <img
                                    src={booking.worker.avatar}
                                    alt={booking.worker.name}
                                    className="w-12 h-12 rounded-full object-cover border border-gray-100"
                                />

                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 text-sm truncate">
                                        {booking.worker.name}
                                    </h4>
                                    <p className="text-xs text-gray-500 mb-1">
                                        {booking.worker.category}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs text-[#4F7FAF]">
                                        <Clock size={12} />
                                        <span>{booking.serviceDate}</span>
                                    </div>
                                </div>

                                <div className="text-gray-300 group-hover:text-[#4F7FAF] transition-colors">
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                            <Clock size={32} className="mb-2 opacity-20" />
                            <p className="text-sm">No pending requests</p>
                            <p className="text-xs mt-1">Book a service to see it here.</p>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">
                    Showing {pendingBookings.length} pending items
                </p>
            </div>
        </div>
    );
}