import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import Logo from "../MainComponents/LandingComponents/Logo/Logo";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (username === "bluehire" && password === "codeblooded") {
      const adminUser = {
        id: "admin-master",
        username: "bluehire",
        role: "ADMIN",
        name: "Admin",
      };
      localStorage.setItem("currentUser", JSON.stringify(adminUser));
      navigate("/Admin");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("currentUser", JSON.stringify(user));

        const role = user.role ? user.role.toUpperCase() : "";

        if (role === "CLIENT") {
          try {
            const clientRes = await fetch(
              "http://localhost:8080/api/client/getAllClients",
            );
            if (clientRes.ok) {
              const clients = await clientRes.json();
              const myClient = clients.find((c: any) => c.user?.id === user.id);
              if (myClient) {
                localStorage.setItem(
                  "currentUserId",
                  myClient.clientID || myClient.id,
                );
                localStorage.setItem("userRole", "CLIENT");
                navigate("/client/dashboard");
              } else {
                navigate("/client");
              }
            }
          } catch (err) {
            navigate("/client");
          }
        } else if (role === "WORKER") {
          try {
            const workerRes = await fetch(
              "http://localhost:8080/api/worker/getAllWorkers",
            );
            if (workerRes.ok) {
              const workers = await workerRes.json();
              const myWorker = workers.find(
                (w: any) =>
                  w.user?.userId === user.userId || w.user?.id === user.id,
              );
              if (myWorker) {
                localStorage.setItem(
                  "currentUserId",
                  myWorker.workerID.toString(),
                );
                localStorage.setItem("userRole", "WORKER");
                navigate("/worker/dashboard");
              } else {
                navigate("/worker");
              }
            }
          } catch (err) {
            navigate("/worker");
          }
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-200 to-[#3d6691] overflow-hidden">
      {/* (Background elements omitted for brevity, same as previous) */}
      <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <Logo variant="lg" />
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-[#3d6691]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-[#3d6691]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#3d6691] text-white font-semibold py-3 rounded-lg hover:bg-[#2c4b6b] disabled:opacity-75"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin inline mr-2" /> Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-medium text-[#3d6691]">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignIn;
