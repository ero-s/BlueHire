import React, { useState } from 'react';
import { X, CreditCard, CheckCircle, Loader2, Wallet } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
  onConfirmPayment: (paymentId: number, method: string) => Promise<void>;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, booking, onConfirmPayment }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  // Default to CASH as per your Java Enum PaymentMethod { CASH, GCASH, MAYA }
  const [paymentMethod, setPaymentMethod] = useState("CASH"); 

  if (!isOpen || !booking) return null;

  const handlePay = async () => {
    setIsProcessing(true);
    // Extract paymentID safely from the raw data
    // Matches Java Model: private int paymentID;
    const payId = booking.rawBooking?.payment?.paymentID;
    
    if (payId) {
        await onConfirmPayment(payId, paymentMethod);
    } else {
        alert("Error: No Payment ID found for this booking.");
    }
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="bg-[#F6F6F6] px-6 py-4 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <CreditCard size={20} className="text-emerald-600" />
            Complete Payment
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-gray-500 text-sm">Total Amount Due</p>
            {/* Matches Java Model: private BigDecimal amount; */}
            <p className="text-4xl font-bold text-[#4D7EAF]">{booking.amount}</p>
            <p className="text-sm text-gray-400">For {booking.serviceType}</p>
          </div>

          <div className="space-y-3">
             <label className="block text-sm font-semibold text-gray-700">Select Payment Method</label>
             <div className="grid grid-cols-3 gap-2">
                {['CASH', 'GCASH', 'MAYA'].map((method) => (
                    <button 
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`py-3 rounded-xl border-2 text-xs font-bold transition-all flex flex-col items-center gap-1 ${paymentMethod === method ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-500 hover:border-emerald-200'}`}
                    >
                        {method === 'CASH' && <Wallet size={16}/>}
                        {method}
                    </button>
                ))}
             </div>
          </div>

          <button 
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full py-3.5 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : <CheckCircle />}
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentModal;