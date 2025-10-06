import styles from './MinecraftInventory.module.css';
import { useState } from "react";

interface MinecraftItem {
    id: string;
    name: string;
    icon: string;
}

type MinecraftItemProps<T extends MinecraftItem = MinecraftItem> = {
    item: T;
    onClick: MinecraftInventoryProps<T>["onClick"];
}

interface MinecraftInventoryProps<T extends MinecraftItem = MinecraftItem> {
    items?: T[];
    onClick?: (item: T) => void;
    columns?: number;
}

function MinecraftItem<T extends MinecraftItem>({ item, onClick }: MinecraftItemProps<T>) {
    const [panelPos, setPanelPos] = useState<{x: number, y: number} | null>(null);
    const offset = 15;

    const panel = !panelPos ? null : (
        <div className={styles.item_panel} style={{ left: panelPos.x + offset, top: panelPos.y + offset }}>
            <span className={styles.panel_name}>{item.name}</span>
            <span className={styles.panel_id}>minecraft:{item.id}</span>
        </div>
    );

    return (
        <div
            className={styles.inventory_item}
            onMouseMove={evt => setPanelPos({x: evt.pageX, y: evt.pageY})}
            onMouseLeave={() => setPanelPos(null)}
            onClick={onClick ? () => onClick(item) : undefined}
        >
            <img src={item.icon} alt={item.name} width={32} height={32} draggable={false} />
            {panel}
        </div>
    );
}


function MinecraftInventory<T extends MinecraftItem>({ onClick, items = [], columns = 13 }: MinecraftInventoryProps<T>) {
    const itemComponents = items.map(item => (
        <MinecraftItem key={item.id} item={item} onClick={onClick} />
    ));

    return (
        <div className={styles.minecraft_inventory} style={{ width: columns * 36 + 24 }}>
            {itemComponents}
        </div>
    );
}

export type { MinecraftItem };
export default MinecraftInventory;
