import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App.tsx';
import HomePage from "./pages/HomePage/HomePage.tsx";
import MahouTsukaiLookupPage from "./pages/MahouTsukaiLookupPage/MahouTsukaiLookupPage.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route element={<App/>}>
                <Route index element={<HomePage/>} />
                <Route path="/mahou_tsukai/enchant_lookup/" element={<MahouTsukaiLookupPage/>} />
            </Route>
        </Routes>
    </BrowserRouter>,
)
