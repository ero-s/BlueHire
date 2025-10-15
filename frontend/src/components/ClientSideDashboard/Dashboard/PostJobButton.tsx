import { useNavigate } from "react-router-dom";

export default function PostJobButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/post-job")}
      className="
        bg-blue-500 text-white font-semibold text-lg 
        px-8 py-6 rounded-2xl shadow-md hover:shadow-lg 
        flex items-center justify-center gap-2 transition-all
        hover:bg-blue-600 active:scale-95
      "
    >
      <span className="text-2xl">+</span>
      Post New Job!
    </button>
  );
}
