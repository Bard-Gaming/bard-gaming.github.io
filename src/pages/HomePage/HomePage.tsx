import Toast from "../../components/Toast/Toast";
import enchantedBook from '../../assets/enchanted_book.gif';
import { useContext } from "react";
import CurrentPageContext from "../../hooks/CurrentPageContext";
import MahouTsukaiLookupPage from "../MahouTsukaiLookupPage/MahouTsukaiLookupPage";

function HomePage() {
    const [_currentPage, setCurrentPage] = useContext(CurrentPageContext);

    return (
        <section>
            <Toast
                icon={enchantedBook}
                title="Mahou Tsukai"
                onClick={() => setCurrentPage(<MahouTsukaiLookupPage />)}
            >
                Enchantment Probability Lookup
            </Toast>
        </section>
    );
}

export default HomePage;
