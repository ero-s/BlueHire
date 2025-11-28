import React from "react";
import Header from "../components/ClientHeader";
import TransactionTable from "../components/TransactionTable";

const ClientTransactionPage: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <Header userName="Sherielyn Guadiana" />
    <main className="pt-28 px-6 sm:px-10 lg:px-20">
      <TransactionTable />
    </main>
  </div>
);

export default ClientTransactionPage;
