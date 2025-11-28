import React from "react";
import Header from "../components/ClientHeader";
import TransactionTable from "../components/TransactionTable";

const ClientTransactionPage: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <Header userName="Sherielyn Guadiana" />
    <main className="pt-28 px-6 sm:px-10 lg:px-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Transactions</h2>
      <TransactionTable />
    </main>
  </div>
);

export default ClientTransactionPage;
