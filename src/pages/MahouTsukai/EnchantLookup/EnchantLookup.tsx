import styles from './EnchantLookup.module.css';
import lookupData from './data/lookup.json'


function EnchantLookup() {
    console.log(lookupData);

    return (
        <section className={styles.enchant_lookup}>
            <h1>Mahou Tsukai Lookup</h1>
        </section>
    );
}


export default EnchantLookup;

