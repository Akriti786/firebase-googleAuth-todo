import Navbar from "../components/Navbar";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <TodoForm />
            <TodoList />
        </div>
    );
};

export default Dashboard;