from csv import DictReader
from pathlib import Path
from typing import Iterator
import json
import os


root_dir = Path(__file__).parent.parent


def process_enchantments(line: str) -> Iterator[dict[str, str]]:
    """
    Turns a line (e.g. "Silk Touch", "Sharpness 5") into
    a dict of a fixed format.

    Examples:
    For "Silk Touch", you'd get: {"id": "silk_touch", "lvl": 1}
    For "Sharpness 5", you'd get: {"id": "sharpness", "lvl": 5}
    """
    default_level: int = 1  # level to use if not specified

    for enchantment in line.split(', '):
        # enchantment == "Name 3" or enchantment == "Name"
        parts = enchantment.strip().split(' ')
        try:
            level = int(parts[-1])
        except ValueError:
            level = None

        name = " ".join(parts[:-1]) if level is not None else " ".join(parts)

        yield {
            "id": name.lower().replace(' ', '_'),
            "lvl": level if level is not None else default_level
        }


def process_file_data(source: str | Path) -> list[dict]:
    with open(source, "rt") as file:
        csv_dict = DictReader(file.readlines())

    line_data = []

    for line in csv_dict:
        processed_data = {
            "dividend": int(line["Dividend"]),
            "enchantments": {
                "option_low": tuple(process_enchantments(line["Enchantment 1"])),
                "option_medium": tuple(process_enchantments(line["Enchantment 2"])),
                "option_high": tuple(process_enchantments(line["Enchantment 3"])),
            },
        }
        line_data.append(processed_data)

    line_data.sort(key=lambda data: data.get("Dividend", -1))

    return line_data

def generate_data(source_dir: str | Path, destination_dir: str | Path, /, *, pretty: bool = False) -> None:
    data_files = set()
    bundled_data = {}

    for file_name in os.listdir(source_dir):
        extensionless_name = ".".join(file_name.split('.')[:-1])
        data_files.add(extensionless_name)

        bundled_data[extensionless_name] = process_file_data(source_dir / file_name)
    
    with open(destination_dir / "lookup.json", "wt") as file:
        indent = 2 if pretty else None
        file.write(json.dumps(bundled_data, indent=indent))

    with open(destination_dir / "types.ts", "wt") as file:
        lookup_elements = "\n".join(f"    {name}: MahouTsukaiDividendData[];" for name in data_files)
        content = (
            "/**\n"
            " * This file is auto generated. Please do not manually modify,\n"
            " * as changes will get discarded.\n"
            " */\n"
            "\n"
            "export type MinecraftEnchantment = {\n"
            "    id: string;\n"
            "    lvl: number;\n"
            "};\n"
            "\n"
            "export type MahouTsukaiDividendData = {\n"
            "    dividend: number;\n"
            "    enchantments: {"
            "        option_low: MinecraftEnchantment[];\n"
            "        option_medium: MinecraftEnchantment[];\n"
            "        option_high: MinecraftEnchantment[];\n"
            "    };\n"
            "};\n"
            "\n"
            "export type MahouTsukaiLookup = {\n"
            f"{lookup_elements}\n"
            "};\n"
        )

        file.write(content)

def main():
    source_dir = root_dir / "data" / "mahou_tsukai"
    destination_dir = root_dir / "src" / "pages" / "MahouTsukaiLookupPage" / "data"

    generate_data(source_dir, destination_dir)

    print(f"Generated files in {destination_dir}")

if __name__ == '__main__':
    main()
