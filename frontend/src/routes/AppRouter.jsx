import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Search from "../pages/Search/Search";
import BookDetails from "../pages/BookDetails/BookDetails";
import Favorites from "../pages/Favorites/Favorites";
import Recommendations from "../pages/Recommendations/Recommendations";
import Shelves from "../pages/Shelves/Shelves";
import Profile from "../pages/Profile/Profile";

function AppRouter() {
    return (
        <Routes>

            {/* Authentication Routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            {/* Main Application Routes */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/books/:bookId" element={<BookDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/shelves" element={<Shelves />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

        </Routes>
    );
}

export default AppRouter;