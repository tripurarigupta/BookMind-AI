import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { login, getCurrentUser } from "../../services/authService";
import PasswordInput from "../../components/auth/PasswordInput";
import { BookOpen } from "lucide-react";
import toast from "react-hot-toast";

import "../../styles/Auth.css";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(identifier, password);
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            toast.success("Welcome back!");
            navigate("/");
        }
        catch (error) {
            const message =
                error.response?.data?.detail ||
                "Invalid credentials. Please try again.";
            toast.error(message);
        }
        finally {
            setLoading(false);
        }
    };
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1><BookOpen size={24} /> BookMind AI</h1>
                <p className="subtitle">  Welcome back! Sign in to continue your reading journey. </p>
                <form onSubmit={handleSubmit}>
                    <label>Email or Username</label>
                    <input
                        type="text"
                        placeholder="Enter your email or username"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                    <label>Password</label>
                    <PasswordInput
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>
                <div className="auth-footer"> 
                    Don't have an account?
                    <Link to="/register"> Register </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;