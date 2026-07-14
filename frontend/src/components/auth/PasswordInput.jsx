import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./PasswordInput.css";

const PasswordInput = ({
    name,
    value,
    onChange,
    placeholder
}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="password-field">
            <input
                type={showPassword ? "text" : "password"}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required
            />

            <button
                type="button"
                className="eye-btn"
                onClick={() =>
                    setShowPassword(!showPassword)
                }
            >
                {
                    showPassword
                        ? <FaEyeSlash />
                        : <FaEye />
                }
            </button>
        </div>
    );
};

export default PasswordInput;