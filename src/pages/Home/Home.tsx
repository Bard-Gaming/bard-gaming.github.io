import styles from './Home.module.css';
import Toast from "../../components/Toast/Toast";
import enchantedBook from '../../assets/enchanted_book.gif';

function Home() {
    return (
        <section className={styles.home}>
            <div className={styles.home_tools}>

            </div>
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

export default Home;
