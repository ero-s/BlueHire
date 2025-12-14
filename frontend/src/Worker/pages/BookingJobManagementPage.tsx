import React, { useState, useEffect } from 'react';
import Header from '../components/WorkerHeader'; // Assuming your Navbar is here based on previous context
import BookingJobManagementMainSection from '../components/BookingJobManagementMainSection.tsx';
import Footer from '../components/WorkerFooter.tsx';
import axios from 'axios'; // Import axios for API calls
  
const BookingJobManagementPage: React.FC = () => {
    // State to hold the worker's full name
    const [workerFullName, setWorkerFullName] = useState('Guest Worker');
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    // 1. Fetch current Worker Name based on logged in user
    useEffect(() => {
        const fetchWorkerProfile = async () => {
            const storedUser = localStorage.getItem("currentUser");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                
                // If user is logged in, attempt to fetch worker details
                try {
                    const response = await axios.get("http://localhost:8080/api/worker/getAllWorkers");
                    if (response.status === 200) {
                        const workers = response.data;
                        const myProfile = workers.find((w: any) => w.user.userId === user.userId);
                        
                        if (myProfile) {
                            // Safely retrieve the full name from the nested user object
                            if (myProfile.user?.name) {
                                const { firstName, lastName } = myProfile.user.name;
                                setWorkerFullName(`${firstName} ${lastName}`);
                            } else {
                                // Fallback to username
                                setWorkerFullName(user.username || "Worker");
                            }
                        }
                    }
                } catch (error) {
                    console.error("Failed to load worker profile for header:", error);
                    // On error, the name remains 'Guest Worker'
                } finally {
                    setIsLoadingUser(false);
                }
            } else {
                setIsLoadingUser(false);
            }
        };
        fetchWorkerProfile();
    }, []);

  return (
    <div className="bg-[#F6F6F6] min-h-screen w-full font-sans">
      {/* Fixed Navbar */}
      <div className="fixed top-0 w-full z-40 bg-[#F6F6F6]">
        {/* ✅ Using the dynamically fetched name */}
        <Header userName={workerFullName} />
      </div>

      {/* Main Content Area */}
      <div className="pt-28 pb-10 px-4 md:px-8 lg:px-12">
        <BookingJobManagementMainSection />
      </div>
      <Footer />
    </div>
  );
};

export default BookingJobManagementPage;