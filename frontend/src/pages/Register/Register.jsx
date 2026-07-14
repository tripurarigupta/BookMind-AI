import { useState } from "react";
import { register } from "../../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "../../components/auth/PasswordInput";

import "../../styles/Auth.css";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            setLoading(true);
            await register({
                username: form.username,
                email: form.email,
                password: form.password
            });
            alert("Registration Successful!");
            navigate("/login");
        }
        catch (err) {
            setError(
                err.response?.data?.detail || "Registration failed."
            );
        }
        finally {
            setLoading(false);
        }
    };
    return (
        <div className="auth-page">
            <div className="auth-card">
            <h1> 📚 BookMind AI </h1>
            <p className="subtitle"> Create your free account and start building your personal library. </p>
            <form onSubmit={handleSubmit}>
                <h2>Create Account</h2>
                {error &&
                    <p className="error">
                        {error}
                    </p>
                }
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <PasswordInput
                    name="password"
                    value={form.password}
                    placeholder="Password"
                    onChange={handleChange}
                />

                <PasswordInput
                    name="confirmPassword"
                    value={form.confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {
                        loading
                            ? "Creating..."
                            : "Create Account"
                    }
                </button>
                <div className="auth-footer"> 
                    Already have an account?
                    <Link to="/login"> Login </Link>
                </div>
            </form>
        </div>
        </div>
    );
};
export default Register;