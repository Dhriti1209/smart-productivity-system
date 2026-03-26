import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-[#F7D6E0] text-[#2F2F2F] font-medium"
      : "hover:bg-white/80";

  return (
    <div className="w-64 min-h-screen bg-white/70 backdrop-blur-xl border-r border-[#EAE7E2] px-6 py-8 hidden md:flex flex-col">
      <h1 className="text-xl font-semibold text-[#2F2F2F] mb-10">
        CalmTrack 🌷
      </h1>

      <nav className="flex flex-col gap-3 text-sm text-[#5F5F5F]">
        <button
          onClick={() => navigate("/")}
          className={`text-left px-4 py-3 rounded-2xl transition ${isActive("/")}`}
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/daily-log")}
          className={`text-left px-4 py-3 rounded-2xl transition ${isActive("/daily-log")}`}
        >
          Daily Logs
        </button>

        <button className="text-left px-4 py-3 rounded-2xl hover:bg-white/80 transition">
          Analytics
        </button>

        <button className="text-left px-4 py-3 rounded-2xl hover:bg-white/80 transition">
          Insights
        </button>

        <button className="text-left px-4 py-3 rounded-2xl hover:bg-white/80 transition">
          Profile
        </button>
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-2xl bg-white/80 hover:bg-white transition text-sm text-[#5F5F5F]"
        >
          Logout
        </button>

        <p className="mt-4 text-xs text-[#8A8A8A]">
          Designed for mindful productivity ✨
        </p>
      </div>
    </div>
  );
};

export default Sidebar;