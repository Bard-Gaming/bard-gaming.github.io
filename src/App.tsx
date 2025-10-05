import './App.css';
import { Outlet } from "react-router";
import NavigationBar from "./components/NavigationBar/NavigationBar";


function App() {

    return (
        <>
            <NavigationBar title="Bard-Gaming's Tools" />
            <Outlet />
        </>
    );
}

export default App
