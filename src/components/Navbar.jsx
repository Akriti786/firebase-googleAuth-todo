import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav>
            <h2>
                Welcom {user?.displayName}
            </h2>

            <button onClick={logout}>
                Logout
            </button>
        </nav>
    );
};

export default Navbar;