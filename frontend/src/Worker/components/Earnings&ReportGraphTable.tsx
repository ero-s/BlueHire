import React, { useState, useRef, useEffect } from 'react'; // Added useRef and useEffect for dynamic input sizing

// --- 1. Interfaces ---

interface StatCardProps {
  title: string;
  value: string;
  isRating?: boolean;
}

interface JobType {
  name: string;
  percentage: number;
  color: string;
}

interface EarningsEntry {
  date: string;
  clientName: string;
  serviceType: string;
  durationHours: number;
  amountEarned: number;
  status: 'Completed' | 'Cancelled';
}

// --- 2. Helper Functions and Mock Data ---

// Helper function to format the number with commas (for display outside input)
const formatRateWithCommas = (amount: number | string) => {
    const num = parseFloat(amount.toString()).toFixed(2);
    if (isNaN(parseFloat(num))) return '₱0.00';

    // Separate integer and decimal parts
    const [integerPart, decimalPart] = num.split('.');

    // Add commas to the integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `₱${formattedInteger}.${decimalPart}`;
};

const formatCurrency = (amount: number) => {
  return formatRateWithCommas(amount);
};

const formatYAxisLabel = (value: number) => {
    return `₱${value / 1000}K`;
};

const mockEarningsData: EarningsEntry[] = [
  { date: 'January 25, 2025', clientName: 'Floyd Miles', serviceType: 'House Cleaning', durationHours: 3, amountEarned: 400.00, status: 'Completed' },
  { date: 'February 5, 2025', clientName: 'Ronald Richards', serviceType: 'Laundry & Ironing', durationHours: 4, amountEarned: 260.00, status: 'Cancelled' },
  { date: 'March 5, 2025', clientName: 'Marvin McKinney', serviceType: 'Cooking / Meal Prep', durationHours: 2, amountEarned: 300.00, status: 'Cancelled' },
  { date: 'April 1, 2025', clientName: 'Tesla Gonzaga', serviceType: 'Gardening / Yard Work', durationHours: 5, amountEarned: 520.00, status: 'Completed' },
  { date: 'May 19, 2025', clientName: 'Jerome Bell', serviceType: 'Plumbing', durationHours: 1, amountEarned: 450.00, status: 'Completed' },
  { date: 'June 20, 2025', clientName: 'Kathryn Murphy', serviceType: 'Electrical Repair', durationHours: 2, amountEarned: 500.00, status: 'Completed' },
  { date: 'July 12, 2025', clientName: 'Jacob Jones', serviceType: 'Appliance Repair', durationHours: 2, amountEarned: 470.00, status: 'Completed' },
  { date: 'August 2, 2025', clientName: 'Kristin Watson', serviceType: 'Car Wash & Detailing', durationHours: 2, amountEarned: 340.00, status: 'Cancelled' },
];

// --- 4. Hourly Rate Card Component (Stateful, Centered Layout) ---

const HourlyRateCard: React.FC = () => {
    // State to manage the hourly rate
    const [rate, setRate] = useState(350);
    const [editingRate, setEditingRate] = useState(rate);
    const [isEditing, setIsEditing] = useState(false);

    // Refs for dynamic input sizing
    const inputMirrorRef = useRef<HTMLSpanElement>(null);
    const [inputWidth, setInputWidth] = useState(70); // Default width

    useEffect(() => {
        if (isEditing && inputMirrorRef.current) {
            // Calculate width based on content, plus a buffer
            const newWidth = inputMirrorRef.current.offsetWidth + 12;
            setInputWidth(newWidth > 70 ? newWidth : 70); // Ensure minimum width
        }
    }, [editingRate, isEditing]);


    const handleSave = () => {
        const newRate = parseFloat(editingRate.toString());
        if (!isNaN(newRate) && newRate > 0) {
            // Save rate as a number for internal calculations
            setRate(newRate);
        }
        setIsEditing(false);
    };

    const handleEdit = () => {
        // When editing starts, set input value to raw number string (without commas)
        setEditingRate(rate);
        setIsEditing(true);
    };

    return (
        // The outer div manages alignment for the entire content block
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex-grow h-64 max-w-[350px] flex flex-col justify-start items-start">

            {/* Title (Top-Left) */}
            <h3 className="text-xs font-semibold text-gray-700 mb-2 uppercase">YOUR HOURLY RATE</h3>

            {/* Central Content Area (Flex-Grow to take all vertical space, then center its contents) */}
            <div className="flex flex-col items-center justify-center flex-grow w-full">

                {/* Rate Display / Input */}
                <div className="mb-4">
                    {/* Hidden span used to measure the text width */}
                    {isEditing && (
                        <span
                            ref={inputMirrorRef}
                            className="text-4xl font-bold invisible whitespace-pre absolute"
                        >
                            {/* Use the number string (without ₱) for width calculation */}
                            {editingRate.toString()}
                        </span>
                    )}

                    {isEditing ? (
                        <div className="flex items-center justify-center">
                            <span className="text-4xl font-bold text-gray-900">₱</span>
                            <input
                                type="number"
                                value={editingRate}
                                onChange={(e) => setEditingRate(Number(e.target.value))}
                                // Apply dynamic width
                                className="text-4xl font-bold text-gray-900 border-b border-blue-400 focus:outline-none text-center"
                                style={{ width: `${inputWidth}px` }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') handleSave();
                                }}
                            />
                        </div>
                    ) : (
                        // Use formatCurrency for comma separation and dollar sign
                        <span className="text-4xl font-bold text-gray-900">
                            {formatCurrency(rate)}
                        </span>
                    )}
                </div>

                {/* Button (Centered below rate) */}
                <div className="w-full flex justify-center">
                    {isEditing ? (
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-4 py-2 w-32 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={handleEdit}
                            // Applied black border and text for visual match
                            className="text-[#5AB3E6] border border-[#5AB3E6] px-4 py-2 w-32 rounded-full text-sm font-medium hover:bg-[#5AB3E6] hover:text-white transition"
                        >
                            Edit Rate
                        </button>
                    )}
                </div>

            </div>

            {/* Descriptive text removed */}
        </div>
    );
};


// --- 3. Sub-Components (StatCard, Charts, Table Parts) ---

const StatCard: React.FC<StatCardProps> = ({ title, value, isRating }) => (
  <div className="py-2 px-3 flex-1 min-w-[150px]">
    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
    {isRating ? (
      <div className="mt-1 flex items-center">
        <span className="text-xl font-bold text-gray-900 mr-1">{value}</span>
        <div className="flex text-yellow-400">
          {[...Array(Math.floor(parseFloat(value)))].map((_, i) => (
            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292z" />
            </svg>
          ))}
          {[...Array(5 - Math.ceil(parseFloat(value)))].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    ) : (
      <p className="mt-1 text-xl font-bold text-gray-900">{value}</p>
    )}
  </div>
);

// const FilterSection: React.FC = () => (
//     <div className="bg-white py-2 px-3 rounded-xl shadow-lg flex items-center space-x-2 flex-shrink-0 min-w-[200px]">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </svg>
//         <span className="text-xs font-medium text-gray-700 whitespace-nowrap">FILTER BY Time Period</span>
//         <select className="border border-gray-300 rounded-md py-0.5 text-xs pl-2 pr-7 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white bg-no-repeat bg-right-center"
//             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`, backgroundPosition: 'right 0.3rem center', backgroundSize: '1.2em' }}
//         >
//             <option>All Time</option>
//             <option>Last 30 Days</option>
//             <option>Last 90 Days</option>
//             <option>This Year</option>
//         </select>
//     </div>
// );

const EarningsChart: React.FC = () => {
    const earningsData = [
      { month: 'JAN', value: 25000 }, { month: 'FEB', value: 35000 }, { month: 'MAR', value: 45000 },
      { month: 'APR', value: 38000 }, { month: 'MAY', value: 25000 }, { month: 'JUN', value: 15000 },
      { month: 'JUL', value: 25000 }, { month: 'AUG', value: 20000 }, { month: 'SEP', value: 30000 },
      { month: 'OCT', value: 28000 }, { month: 'NOV', value: 35000 }, { month: 'DEC', value: 45000 },
    ];
    const maxEarnings = Math.max(...earningsData.map(d => d.value));

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm h-64 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-medium text-gray-800 uppercase tracking-wider">EARNINGS THROUGHOUT THE YEAR</h3>
        </div>
        <div className="flex-grow flex items-end pt-2">
          <div className="flex flex-col-reverse justify-between h-full pr-1 text-xs text-gray-500">
            <span>{formatYAxisLabel(60000)}</span>
            <span>{formatYAxisLabel(40000)}</span>
            <span>{formatYAxisLabel(20000)}</span>
            <span>0</span>
          </div>
          <div className="flex flex-grow justify-around items-end h-full border-l border-gray-200 pl-1">
            {earningsData.map((data, index) => (
              <div key={index} className="flex flex-col items-center h-full justify-end">
                <div
                  className="w-3 bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors duration-200"
                  style={{ height: `${(data.value / maxEarnings) * 85}%` }}
                ></div>
                <span className="mt-1 text-xs text-gray-600">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

const JobDistributionChart: React.FC = () => {
    const jobTypes: JobType[] = [
      { name: 'House Cleaning', percentage: 30, color: '#BAD9EB' },
      { name: 'Babysitting', percentage: 25, color: '#2B7BB0' },
      { name: 'Gardening', percentage: 20, color: '#1E40AF' },
      { name: 'Cooking', percentage: 15, color: '#5AAAD2' },
      { name: 'Laundry', percentage: 10, color: '#91C4E7' },
    ];

    const createConicGradient = () => {
      let gradientString = 'conic-gradient(';
      let currentAngle = 0;
      jobTypes.forEach((job, index) => {
        const startAngle = currentAngle;
        const endAngle = currentAngle + (job.percentage / 100) * 360;
        gradientString += `${job.color} ${startAngle}deg ${endAngle}deg${index < jobTypes.length - 1 ? ',' : ''}`;
        currentAngle = endAngle;
      });
      return gradientString;
    };

    return (
      // The outer padding is p-4
      <div className="bg-white p-4 rounded-lg shadow-sm h-64 flex flex-col justify-between flex-shrink-0 w-[660px]">

        <h3 className="text-xs font-medium text-gray-800 uppercase tracking-wider mb-2 text-left px-2">
            DISTRIBUTION BY JOB TYPE
        </h3>

        {/* 1. Donut Chart Area (Stable CSS Conic-Gradient) */}
        <div className="relative w-[150px] h-[150px] flex items-center justify-center -mt-2 mb-4 mx-auto">
            <div
                className="w-full h-full rounded-full absolute"
                style={{
                    background: createConicGradient(),
                    mask: 'radial-gradient(transparent 60%, white 0%)',
                    WebkitMask: 'radial-gradient(transparent 60%, white 0%)',
                }}
            ></div>
             {/* Central hole */}
             <div className="absolute bg-white rounded-full w-[90px] h-[90px]"></div>
        </div>

        {/* 2. Legend (Below the chart, stable layout) */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs px-2 text-gray-700">
            {jobTypes.map((job, index) => (
                <div key={index} className="flex items-center whitespace-nowrap">
                    <span className="w-2.5 h-2.5 rounded-full mr-2 flex-shrink-0" style={{ backgroundColor: job.color }}></span>
                    {/* Displaying name and percentage clearly */}
                    {job.name} ({job.percentage}%)
                </div>
            ))}
        </div>
      </div>
    );
  };

const StatusBadge: React.FC<{ status: EarningsEntry['status'] }> = ({ status }) => {
  const isCompleted = status === 'Completed';
  const bgColor = isCompleted ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500';

  return (
    <span className={`inline-flex items-center px-3 py-0.5 text-xs font-medium rounded-full ${bgColor}`}>
      {status}
    </span>
  );
};

const EarningsReportTable: React.FC = () => {
  return (
    <div className="bg-white pt-4 px-6 pb-4 rounded-xl shadow-lg w-full border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Earnings Report</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-gray-500 text-left text-xs font-normal">
              <th scope="col" className="px-4 py-2 whitespace-nowrap">Date</th>
              <th scope="col" className="px-4 py-2 whitespace-nowrap">Client Name</th>
              <th scope="col" className="px-4 py-2 whitespace-nowrap">Service Type</th>
              <th scope="col" className="px-4 py-2 whitespace-nowrap">Hours/Duration</th>
              <th scope="col" className="px-4 py-2 whitespace-nowrap">Amount Earned</th>
              <th scope="col" className="px-4 py-2 whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {mockEarningsData.map((entry, index) => (
              <tr key={index} className="text-gray-700 text-sm">
                <td className="px-4 py-3 whitespace-nowrap font-medium">{entry.date}</td>
                <td className="px-4 py-3 whitespace-nowrap">{entry.clientName}</td>
                <td className="px-4 py-3 whitespace-nowrap">{entry.serviceType}</td>
                <td className="px-4 py-3 whitespace-nowrap">{entry.durationHours} hours</td>
                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{formatCurrency(entry.amountEarned)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusBadge status={entry.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 text-xs text-gray-50s0">
        <span>Showing data 1 to 8 of 256K entries</span>
        <div className="flex items-center space-x-1">
          <button className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex space-x-1">
            <button className="w-7 h-7 rounded-lg text-white bg-violet-600 font-semibold shadow-md text-xs flex items-center justify-center">1</button>
            <button className="w-7 h-7 rounded-lg text-gray-600 hover:bg-gray-100 text-xs flex items-center justify-center">2</button>
            <button className="w-7 h-7 rounded-lg text-gray-600 hover:bg-gray-100 text-xs flex items-center justify-center">3</button>
            <span className="w-7 h-7 flex items-center justify-center text-xs">...</span>
            <button className="w-7 h-7 rounded-lg text-gray-600 hover:bg-gray-100 text-xs flex items-center justify-center">40</button>
          </div>
          <button className="p-1 text-gray-700 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};


// --- Main Exported Component (The combined content, GraphTable) ---
const GraphTable: React.FC = () => {
  return (
    // The wrapper for the entire dashboard content
    <div>

        {/* 1. Top Section: Stats and Filter (Combined) */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <StatsContainer />
            <FilterContainer />
        </div>

        {/* 2. Middle Section: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <EarningsChart />
            {/* WRAPPER MODIFIED: Holds the Chart and the Hourly Rate Card */}
            <div className="flex flex-col sm:flex-row gap-6">
                <JobDistributionChart />
                <HourlyRateCard />
            </div>
        </div>

        {/* 3. Bottom Section: Earnings Report Table */}
        <div>
            <EarningsReportTable />
        </div>
    </div>
  );
};


// --- Helper Components for GraphTable ---

const StatsContainer: React.FC = () => (
    // Single white container for the four stats
    <div className="bg-white py-2 px-3 rounded-xl shadow-lg flex-grow flex flex-wrap gap-x-4 gap-y-2">
        <StatCard title="TOTAL EARNINGS" value="₱36,000.00" />
        <StatCard title="AVERAGE EARNINGS PER JOB" value="₱800.00" />
        <StatCard title="AVERAGE RATING" value="4.0" isRating={true} />
        <StatCard title="JOBS COMPLETED" value="32" />
    </div>
);

const FilterContainer: React.FC = () => (
    // Separate white container for the filter dropdown
    <div className="bg-white py-2 px-3 rounded-xl shadow-lg flex items-center space-x-2 flex-shrink-0 min-w-[200px]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-xs font-medium text-gray-700 whitespace-nowrap">FILTER BY Time Period</span>
        <select className="border border-gray-300 rounded-md py-0.5 text-xs pl-2 pr-7 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white bg-no-repeat bg-right-center"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`, backgroundPosition: 'right 0.3rem center', backgroundSize: '1.2em' }}
        >
            <option>All Time</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
        </select>
    </div>
);


export default GraphTable;