import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <>
            {/* Navbar will come here */}

            <Outlet />

            {/* Footer will come here */}
        </>
    );
}

export default MainLayout;