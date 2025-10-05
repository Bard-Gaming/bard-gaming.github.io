import styles from './MinecraftInventory.module.css';
import { useState } from "react";

interface MinecraftItem {
    id: string;
    name: string;
    icon: string;
}

type MinecraftItemProps = MinecraftItem & { onClick: MinecraftInventoryProps["onClick"] };

interface MinecraftInventoryProps {
    items?: MinecraftItem[];
    onClick?: (id: string) => void;
}

function MinecraftItem({ id, name, icon, onClick }: MinecraftItemProps) {
    const [panelPos, setPanelPos] = useState<{x: number, y: number} | null>(null);
    const offset = 15;

    const panel = !panelPos ? null : (
        <div className={styles.item_panel} style={{ left: panelPos.x + offset, top: panelPos.y + offset }}>
            <span className={styles.panel_name}>{name}</span>
            <span className={styles.panel_id}>minecraft:{id}</span>
        </div>
    );

    return (
        <div
            className={styles.inventory_item}
            onMouseMove={evt => setPanelPos({x: evt.pageX, y: evt.pageY})}
            onMouseLeave={() => setPanelPos(null)}
            onClick={onClick ? () => onClick(id) : undefined}
        >
            <img src={icon} alt={name} width={32} height={32} draggable={false} />
            {panel}
        </div>
    );
}


function MinecraftInventory({ onClick, items = [] }: MinecraftInventoryProps) {
    const itemComponents = items.map(item => (
        <MinecraftItem key={item.id} {...item} onClick={onClick} />
    ));

    return (
        <div className={styles.minecraft_inventory}>
            {itemComponents}
        </div>
    );
}


export default MinecraftInventory;
