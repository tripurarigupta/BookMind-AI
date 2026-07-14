import api from "./axios";
const ProfileApi = {
    async getProfile() {
        const response = await api.get("/auth/profile");
        return response.data;
    }
};
export default ProfileApi;