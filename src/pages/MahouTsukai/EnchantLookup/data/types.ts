/**
 * This file is auto generated. Please do not manually modify,
 * as changes will get discarded.
 */

export type MinecraftEnchantment = {
    id: string;
    lvl: number;
};

export type MahouTsukaiDividendData = {
    dividend: number;
    enchantments: {
        option_low: MinecraftEnchantment[];
        option_medium: MinecraftEnchantment[];
        option_high: MinecraftEnchantment[];
    };
};

export type MahouTsukaiLookup = {
    iron_pickaxe: MahouTsukaiDividendData[];
    iron_sword: MahouTsukaiDividendData[];
    book: MahouTsukaiDividendData[];
};
