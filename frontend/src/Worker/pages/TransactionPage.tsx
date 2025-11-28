import React from "react";
import WorkerHeader from "../components/WorkerHeader";
import TransactionTable from "../components/TransactionTable";

const WorkerTransactionPage: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <WorkerHeader userName="Sherielyn Guadiana" />
    <main className="pt-28 px-6 sm:px-10 lg:px-20">
      <TransactionTable />
    </main>
  </div>
);

export default WorkerTransactionPage;
