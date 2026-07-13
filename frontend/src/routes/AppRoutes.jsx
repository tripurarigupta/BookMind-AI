import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/home/Home";
import BookDetails from "../pages/BookDetails/BookDetails";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layout/Layout";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/books/:bookId"
                        element={<BookDetails />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;