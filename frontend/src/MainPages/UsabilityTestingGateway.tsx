import React from 'react';
import { User, Briefcase, Info, ArrowRight } from 'lucide-react';
import Logo from '../MainComponents/LandingComponents/Logo/Logo';

interface LoginPageProps {
  onSelectRole: (role: 'worker' | 'client') => void;
}

const UsabilityTestingGateway: React.FC<LoginPageProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
    
        {/* Left Side: Brand & Info */}
        <div className="md:w-5/12 bg-[#4D7EAF] p-12 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10">
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-blue-200 mt-12">
                    Usability <br/>Testing <br/><span className="text-white">Gateway</span>
                </h1>
                <p className="text-blue-100 text-lg leading-relaxed max-w-sm opacity-90 mt-12">
                    Welcome to the prototype environment. Experience the platform from different perspectives.
                </p>
            </div>

            <div className="relative z-10 mt-12">
                <div className="bg-blue-300/40 p-5 rounded-2xl backdrop-blur-md border border-white flex gap-4">
                    <Info className="shrink-0 text-blue-200" size={24} />
                    <div>
                        <h3 className="font-bold mb-1 text-sm uppercase tracking-wider text-blue-100">Prototype Mode</h3>
                        <p className="text-sm text-blue-100/80 leading-relaxed">
                            This session uses <strong className="text-white">mock data</strong>. No real bookings or profile changes will be saved to a persistent database.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side: Role Selection */}
        <div className="md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-white">
            <div className="flex items-center gap-3 mb-8">
                <Logo variant="lg" />
            </div>
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Who are you testing as?</h2>
                <p className="text-gray-500">Select a persona to access the dashboard.</p>
            </div>

            <div className="grid gap-6">
                {/* Worker Button */}
                <button 
                    onClick={() => onSelectRole('worker')}
                    className="group relative flex items-center p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-600 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 text-left bg-gray-50/50 hover:bg-white w-full"
                >
                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mr-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <Briefcase size={32} strokeWidth={1.5} />
                    </div>
                    <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Worker</h3>
                            <ArrowRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-600" />
                        </div>
                        <p className="text-sm text-gray-500 leading-snug">
                            Access profile management, skills, performance stats, and availability settings.
                        </p>
                    </div>
                </button>

                {/* Client Button */}
                <button 
                    onClick={() => onSelectRole('client')}
                    className="group relative flex items-center p-6 border-2 border-gray-100 rounded-2xl hover:border-[#4D7EAF] hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 text-left bg-gray-50/50 hover:bg-white w-full"
                >
                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-sky-100 text-[#4D7EAF] flex items-center justify-center mr-6 group-hover:bg-[#4D7EAF] group-hover:text-white transition-colors duration-300">
                        <User size={32} strokeWidth={1.5} />
                    </div>
                    <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#4D7EAF] transition-colors">Client</h3>
                            <ArrowRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#4D7EAF]" />
                        </div>
                        <p className="text-sm text-gray-500 leading-snug">
                            Book services, manage current jobs, chat with workers, and leave reviews.
                        </p>
                    </div>
                </button>
            </div>
            
            <div className="mt-12 text-center">
                 <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">BlueHire • Usability Testing Build v1.0</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UsabilityTestingGateway;
