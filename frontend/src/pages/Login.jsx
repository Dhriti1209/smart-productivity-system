import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 bg-[#F9F7F4]">
      <div className="absolute inset-0 opacity-[0.25] bg-[linear-gradient(to_right,#eae7e2_1px,transparent_1px),linear-gradient(to_bottom,#eae7e2_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute inset-4 border-[1.5px] border-[#E5D9DE] rounded-[36px] pointer-events-none z-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(247,214,224,0.4),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(221,235,247,0.4),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(233,228,245,0.3),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(220,235,221,0.3),_transparent_30%)]"></div>
      <div className="absolute top-[-120px] left-[-100px] w-[360px] h-[360px] bg-[#F7D6E0] rounded-full blur-[140px] opacity-50"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-[380px] h-[380px] bg-[#DDEBF7] rounded-full blur-[140px] opacity-50"></div>
      <div className="absolute top-[25%] right-[20%] w-[240px] h-[240px] bg-[#E9E4F5] rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.6),_transparent_50%)]"></div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="hidden md:flex flex-col justify-center pl-8">
          <p className="text-sm text-[#8A8A8A] mb-4 tracking-[0.18em] uppercase">
            Smart Productivity System
          </p>

          <h1 className="text-5xl font-semibold leading-tight text-[#2F2F2F]">
            Track your <span className="italic text-[#B88E9E]">focus</span>,
            <br />
            understand your <span className="italic text-[#8DA3B9]">patterns</span>,
            and grow <br />
            with calm.
          </h1>

          <p className="mt-6 text-[#5F5F5F] text-lg max-w-lg leading-relaxed">
            A mindful productivity space that helps you log habits,
            understand burnout, and visualize your progress beautifully.
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-md p-8 bg-white/70 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.08)] border border-white/60">
            <div className="mb-8">
              <p className="text-sm text-[#8A8A8A] mb-2">Welcome back ✨</p>
              <h2 className="text-3xl font-semibold text-[#2F2F2F]">
                Log into your space
              </h2>
              <p className="text-[#6B6B6B] mt-2 text-sm">
                Continue your calm productivity journey.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <div className="pt-2">
                <Button type="submit">Login</Button>
              </div>
            </form>

            <div className="mt-6 text-sm text-[#6B6B6B] flex justify-between">
              <span className="hover:text-[#2F2F2F] cursor-pointer transition">
                Forgot password?
              </span>
              <Link to="/signup" className="hover:text-[#2F2F2F] font-medium transition">
                Create account
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;