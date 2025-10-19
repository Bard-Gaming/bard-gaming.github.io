import { useState } from "react";
import styles from './EnchantLookup.module.css';
import lookupData from './data/lookup.json'
import MinecraftInventory, { type MinecraftItem } from "../../../components/MinecraftInventory/MinecraftInventory";
import ContentPanel from "../../../components/ContentPanel/ContentPanel";
import probabilityAlterImage from '../../../assets/probability_alter.png';
import enchantLevel1 from '../../../assets/enchant_level_1.png';
import enchantLevel2 from '../../../assets/enchant_level_2.png';
import enchantLevel3 from '../../../assets/enchant_level_3.png';
import bookImage from '../../../assets/book.png';
import enchantedBookImage from '../../../assets/enchanted_book.gif';
import ironSwordImage from '../../../assets/iron_sword.png';
import enchantedIronSwordImage from '../../../assets/enchanted_iron_sword.gif';
import ironPickaxeImage from '../../../assets/iron_pickaxe.png';
import enchantedIronPickaxeImage from '../../../assets/enchanted_iron_pickaxe.gif';
import type { MahouTsukaiLookup, MinecraftEnchantment } from "./data/types";


function EnchantLookup() {
    const [enchantments, setEnchantments] = useState(getAvailableEnchants());
    const [selectedEnchants, setSelectedEnchants] = useState<Set<MinecraftItem>>(new Set<MinecraftItem>());
    const [itemClass, setItemClass] = useState<MinecraftItemClass>(getItemClasses()[0]);

    const searchEnchants = (input: HTMLInputElement) => {
        const normalized_input = input.value.trim().toLowerCase().replaceAll(/[\s-]+/g, '_');

        const availableEnchants = getAvailableEnchants();
        setEnchantments(availableEnchants.filter(
            enchant => enchant.id.startsWith(normalized_input)
        ));
    };

    const selectItem = (item: MinecraftItem) => setSelectedEnchants(old => new Set(old).add(item));
    const unselectItem = (item: MinecraftItem) => setSelectedEnchants(old => {
        const newItems = new Set(old);
        newItems.delete(item);
        
        return newItems;
    });

    const lookupResults = getLookupResults(itemClass.id, [...selectedEnchants].map(item => item.id))

    const lookupResultComponents = lookupResults.map(result => (
        <SearchResult key={`${result.dividend}-${result.level}-${result.enchantments}`} result={result} />
    ));

    return (
        <section className={styles.enchant_lookup}>
            <div className={styles.user_input_panels}>
                <ContentPanel title="Current Selection">
                    <img src={selectedEnchants.size > 0 ? itemClass.enchantedIcon : itemClass.icon} alt={itemClass.name}/>
                    
                    <h1>Enchantments:</h1>
                    <MinecraftInventory
                        items={[...selectedEnchants]}
                        onClick={unselectItem}
                    />
                </ContentPanel>
                
                <ContentPanel title="Available Options">
                    <h1>Item Class</h1>
                    <MinecraftInventory
                        items={getItemClasses()}
                        onClick={item => setItemClass(item)}
                    />

                    <h1>Enchantments</h1>
                    <div className={styles.search_bar_container}>
                        <label htmlFor="enchant_search_input">Search:</label>
                        <input type="text" id="enchant_search_input" onChange={evt => searchEnchants(evt.target)} />
                    </div>
                    <MinecraftInventory
                        items={enchantments}
                        onClick={selectItem}
                    />
                </ContentPanel>
            </div>

            <div className={styles.lookup_result}>
                <ContentPanel title="Results" minWidth={470} minHeight={100}>
                    {lookupResultComponents.length > 0 ? lookupResultComponents : "No results"}
                </ContentPanel>
            </div>
        </section>
    );
}

function SearchResult({ result }: { result: LookupSearchResult }) {
    const enchantLevels = [enchantLevel1, enchantLevel2, enchantLevel3];
    const romanNumeral = ["", "I", "II", "III", "IV", "V"];

    const enchantDisplays = result.enchantments
        .map((enchant, index) => {
            const key = `${enchant.id}-${enchant.lvl}-${index}`;
            return <span key={key}>{`${displayName(enchant.id)} ${romanNumeral[enchant.lvl]}`}</span>
        });
    
    return (
        <div className={styles.search_result}>
            <img
                src={enchantLevels[result.level - 1]}
                alt={`enchant level ${result.level}`}
                className={styles.search_result_enchant_level}
                draggable={false}
                width={32}
                height={32}
            />
            
            <div className={styles.search_result_enchants}>
                {enchantDisplays}
            </div>

            <div className={styles.search_result_dividend}>
                <img
                    src={probabilityAlterImage}
                    alt="rule breaker dividend level"
                    draggable={false}
                    width={32}
                    height={32}
                />
                <span>{result.dividend.toString().padStart(2, "0")}</span>
            </div>
        </div>
    );
}

function getAvailableEnchants(): MinecraftItem[] {
    const availableEnchants = new Set<string>();

    for (const itemClassData of Object.values(lookupData)) {
        for (const dividendData of itemClassData) {
            for (const enchantments of Object.values(dividendData.enchantments)) {
                enchantments.forEach(enchantment => availableEnchants.add(enchantment.id));
            }
        }
    }

    return [...availableEnchants]
        .sort()
        .map(id => ({
            id,
            name: displayName(id),
            icon: enchantedBookImage,
        }));
}

const itemClassIconLookup = {
    book: [bookImage, enchantedBookImage],
    sword: [ironSwordImage, enchantedIronSwordImage],
    pickaxe: [ironPickaxeImage, enchantedIronPickaxeImage],
} satisfies Record<keyof MahouTsukaiLookup, [string, string]>;

function getItemClasses(): MinecraftItemClass[] {
    return mahouTsukaiLookupKeys()
        .sort()
        .map(key => ({
            id: key,
            name: displayName(key),
            icon: itemClassIconLookup[key][0],
            enchantedIcon: itemClassIconLookup[key][1],
        }));
}

function mahouTsukaiLookupKeys(): (keyof MahouTsukaiLookup)[] {
    return Object.keys(lookupData) as (keyof MahouTsukaiLookup)[];
}

function displayName(id: string): string {
    const words = id.split('_');

    return words
        .map(word => word.charAt(0).toUpperCase() + word.substring(1))
        .join(' ');
}

function getLookupResults(itemClass: keyof MahouTsukaiLookup, enchantmentIds: string[]) {
    const results: LookupSearchResult[] = [];

    for (const dividendData of lookupData[itemClass]) {
        Object.values(dividendData.enchantments).forEach((enchantments, level) => {
            if (!enchantments.find(enchant => enchantmentIds.includes(enchant.id)))
                return;

            results.push({ dividend: dividendData.dividend, level: level + 1, enchantments });
        });
    }

    const getTotalSearchedEnchantmentsLevel = (value: LookupSearchResult) => {
        return value.enchantments
            .filter(enchant => enchantmentIds.includes(enchant.id))
            .reduce((total, enchant) => total + enchant.lvl, 0);
    } 

    return results
        .sort((a, b) => {
            const levelA = getTotalSearchedEnchantmentsLevel(a);
            const levelB = getTotalSearchedEnchantmentsLevel(b);

            const scoreA = levelA * 1000 + a.enchantments.length * 100 - a.level * 10 - a.dividend;
            const scoreB = levelB * 1000 + b.enchantments.length * 100 - b.level * 10 - b.dividend;

            // Sort highest score to lowest
            return - (scoreA - scoreB);
        });
}

interface MinecraftItemClass extends MinecraftItem {
    id: keyof MahouTsukaiLookup;
    enchantedIcon: string;
}

type LookupSearchResult = {
    dividend: number;
    level: number;
    enchantments: MinecraftEnchantment[];
}

export default EnchantLookup;

