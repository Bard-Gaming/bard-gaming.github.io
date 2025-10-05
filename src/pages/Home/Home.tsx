import styles from './Home.module.css';
import Toast from "../../components/Toast/Toast";
import enchantedBook from '../../assets/enchanted_book.gif';

function Home() {
    return (
        <section className={styles.home}>
            <section className={styles.tools}>
                <h1>Tools</h1>
                
                <div className={styles.tools_content}>
                    <Toast
                        icon={enchantedBook}
                        title="Mahou Tsukai"
                        linkTo="/mahou_tsukai/enchant_lookup/"
                    >
                        Enchantment Probability Lookup
                    </Toast>
                </div>
            </section>
        </section>
    );
}

export default Home;
