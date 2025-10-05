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


def generate_data(source: str | Path, destination: str | Path) -> None:
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

    with open(destination, "wt") as file:
        file.write(json.dumps(line_data, indent=2))


def main():
    source_dir = root_dir / "data"
    destination_dir = root_dir / "public" / "data"

    for file_name in os.listdir(source_dir):
        extensionless_name = ".".join(file_name.split('.')[:-1])

        generate_data(
            source_dir / file_name,
            destination_dir / f"{extensionless_name}.json"
        )


if __name__ == '__main__':
    main()
