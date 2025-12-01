
// 1. Define the interface for props
interface DashboardPostJobButtonProps {
  onClick?: () => void;
}

export default function DashboardPostJobButton({ onClick }: DashboardPostJobButtonProps) {
  return (
    <button
      // 2. Use the passed onClick function (opens the modal)
      onClick={onClick}
      // Updated color to match your theme #4D7EAF
      style={{ backgroundColor: "#4D7EAF" }} 
      className="
        text-white font-semibold text-lg
        px-8 py-6 rounded-2xl shadow-md hover:shadow-lg
        flex items-center justify-center gap-2 transition-all
        hover:bg-[#3d6691] active:scale-95 w-full h-full
      "
    >
      <span className="text-3xl font-bold">+</span>
      Post New Job!
    </button>
  );
}