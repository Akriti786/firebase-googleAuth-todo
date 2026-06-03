import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Login = () => {
    const { login, user } = useAuth();

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-page">
            <h1>Todo App</h1>

            <button onClick={login}>
                Sign in with Google
            </button>
        </div>
    );
};

export default Login;