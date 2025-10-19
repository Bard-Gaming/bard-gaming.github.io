type ItemPath<T extends string = string> = `/assets/minecraft/item/${T}.png`;
type EnchantedItemPath<T extends string = string> = `/assets/minecraft/item_enchanted/${T}.gif`;


export function getItemTexture<T extends string = string>(itemId: T, enchanted?: false): ItemPath<T>;
export function getItemTexture<T extends string = string>(itemId: T, enchanted: true): EnchantedItemPath<T>;
export function getItemTexture(itemId: string, enchanted: boolean = false): ItemPath | EnchantedItemPath {
    return enchanted
        ? `/assets/minecraft/item_enchanted/${itemId}.gif`
        : `/assets/minecraft/item/${itemId}.png`;
}
