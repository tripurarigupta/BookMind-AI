import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { login, getCurrentUser } from "../../services/authService";
import PasswordInput from "../../components/auth/PasswordInput";

import "../../styles/Auth.css";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(identifier, password);
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            navigate("/");
        }
        catch (error) {
            console.log("Error:", error);
            console.log("Response:", error.response);
            console.log("Data:", error.response?.data);
        }

    };
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>📚 BookMind AI</h1>
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
                    <button type="submit">
                        Login
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