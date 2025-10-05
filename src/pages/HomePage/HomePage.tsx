import Toast from "../../components/Toast/Toast";
import enchantedBook from '../../assets/enchanted_book.gif';

function HomePage() {
    return (
        <section>
            <Toast
                icon={enchantedBook}
                title="Mahou Tsukai"
                linkTo="/mahou_tsukai/enchant_lookup/"
            >
                Enchantment Probability Lookup
            </Toast>
        </section>
    );
}

export default HomePage;
