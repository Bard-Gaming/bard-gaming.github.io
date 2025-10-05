import './App.css';
import { useState } from "react";
import CurrentPageContext from "./hooks/CurrentPageContext";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import HomePage from "./pages/HomePage/HomePage";


function App() {
    const [currentPage, setCurrentPage] = useState(<HomePage/>);

    return (
        <>
            <CurrentPageContext value={[currentPage, setCurrentPage]}>
                <NavigationBar title="Bard-Gaming's Tools" />
                {currentPage}
            </CurrentPageContext>
        </>
    );
}

export default App
