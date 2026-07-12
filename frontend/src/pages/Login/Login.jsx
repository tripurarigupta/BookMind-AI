import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { login, getCurrentUser } from "../../services/authService";

import "./Login.css";

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
        <div className="login-page">
            <div className="login-card">
                <h1>📚 BookMind AI</h1>
                <p>
                    Discover, organize and review your favorite books.
                </p>
                <form onSubmit={handleSubmit}>
                    <label>Email or Username</label>
                    <input
                        type="text"
                        placeholder="Enter your email or username"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">
                        Login
                    </button>
                </form>
                <span>
                    Don't have an account?
                    <Link to="/register">
                        Register
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Login;