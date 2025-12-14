import React, { useState, useEffect } from "react";
import WorkerHeader from "../components/WorkerHeader";
import TransactionTable from "../components/TransactionTable";
import axios from 'axios'; 

const WorkerTransactionPage: React.FC = () => {
    // State to hold the worker's full name
    const [workerFullName, setWorkerFullName] = useState('Guest Worker');

    // 1. Fetch current Worker Name based on logged in user
    useEffect(() => {
        const fetchWorkerProfile = async () => {
            const storedUser = localStorage.getItem("currentUser");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                
                try {
                    // Fetch all workers to find the profile associated with the logged-in user ID
                    const response = await axios.get("http://localhost:8080/api/worker/getAllWorkers");
                    if (response.status === 200) {
                        const workers = response.data;
                        // Find the worker profile corresponding to the logged-in user ID
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
                }
            }
        };
        fetchWorkerProfile();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ✅ Use the dynamically fetched name */}
            <WorkerHeader userName={workerFullName} />
            <main className="pt-28 px-6 sm:px-10 lg:px-20">
                <TransactionTable />
            </main>
        </div>
    );
};

export default WorkerTransactionPage;