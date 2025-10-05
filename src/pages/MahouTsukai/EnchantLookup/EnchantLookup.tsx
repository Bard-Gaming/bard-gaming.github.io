import Toast from "../../../components/Toast/Toast";
import styles from './EnchantLookup.module.css';
import lookupData from './data/lookup.json'
import MinecraftInventory from "../../../components/MinecraftInventory/MinecraftInventory";
import probabilityAlterImage from '../../../assets/probability_alter.png';
import enchantedBookImage from '../../../assets/enchanted_book.gif';


function EnchantLookup() {
    const availableEnchants = getAvailableEnchants();

    return (
        <section className={styles.enchant_lookup}>
            <MinecraftInventory
                items={availableEnchants}
                onClick={id => console.log(id)}
            />

            <div className={styles.lookup_result}>
                <Toast title="Rule Breaker" icon={probabilityAlterImage}>
                    <span>Dividend: {5}</span>
                </Toast>
            </div>
        </section>
    );
}

function getAvailableEnchants(): { id: string, name: string, icon: string }[] {
    const availableEnchants = new Set<string>();

    for (const itemClassData of Object.values(lookupData)) {
        for (const dividendData of itemClassData) {
            for (const enchantments of Object.values(dividendData.enchantments)) {
                enchantments.forEach(enchantment => availableEnchants.add(enchantment.id));
            }
        }
    }

    return [...availableEnchants].map(id => ({
        id,
        name: displayName(id),
        icon: enchantedBookImage,
    }));
}

function displayName(id: string): string {
    const words = id.split('_');

    return words
        .map(word => word.charAt(0).toUpperCase() + word.substring(1))
        .join(' ');
}

export default EnchantLookup;

