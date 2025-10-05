import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App.tsx';
import Home from "./pages/Home/Home.tsx";
import EnchantLookup from "./pages/MahouTsukai/EnchantLookup/EnchantLookup.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route element={<App/>}>
                <Route index element={<Home/>} />
                <Route path="/mahou_tsukai/enchant_lookup/" element={<EnchantLookup/>} />
            </Route>
        </Routes>
    </BrowserRouter>,
);
