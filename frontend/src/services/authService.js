import api from "../api/axios";

export const login = async (identifier, password) => {

    const formData = new URLSearchParams();

    formData.append("username", identifier);
    formData.append("password", password);

    const response = await api.post(
        "/auth/login",
        formData,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
    const token = response.data.access_token;
    localStorage.setItem("token", token);
    return response.data;
};

export const getCurrentUser = async () => {

    const response = await api.get("/auth/me");

    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
};