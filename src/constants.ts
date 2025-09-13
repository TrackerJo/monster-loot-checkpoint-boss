export const Skill = {
    Strength: 'Strength',
    Agility: 'Agility',
    Magic: 'Magic'
} as const;

export type Skill = typeof Skill[keyof typeof Skill];

export const Loot = {
    CursedAmulet: 'Cursed Amulet',
    HealthPotion: 'Health Potion',
    SpeedPotion: 'Speed Potion',
    LuckyPotion: 'Lucky Potion',
    StrengthPotion: 'Strength Potion',
    BlessedBracelet: 'Blessed Bracelet',
}
export type Loot = typeof Loot[keyof typeof Loot];

export const Icon = {
    M: 'M',
    L: 'L',
    C: 'C',
    B: 'B',
}
export type Icon = typeof Icon[keyof typeof Icon];

export class Player {
    id: string;
    name: string;
    health: number;
    strength: number;
    agility: number;
    magic: number;
    inventory: Loot[];
    icon: Icon | null = null;
    currentCell: CellId;
    checkpoint: CellId | null = null;

    constructor({ health, strength, agility, magic, inventory = [], id, name, icon = null, currentCell }: { health: number, strength: number, agility: number, magic: number, inventory: Loot[], id: string, name: string, icon: Icon | null, currentCell: CellId }) {
        this.health = health;
        this.strength = strength;
        this.agility = agility;
        this.magic = magic;
        this.inventory = inventory;
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.currentCell = currentCell;
    }
}


export class PlayerIcon {
    playerId: string;
    icon: Icon;

    constructor(playerId: string, icon: Icon) {
        this.playerId = playerId;
        this.icon = icon;
    }

}

export class Monster {
    skill: Skill;
    level: 1 | 2 | 3 | 5;
    ignorePlayers: string[] = [];

    constructor(skill: Skill, level: 1 | 2 | 3 | 5) {
        this.skill = skill;
        this.level = level;
    }

}

export class CellId {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x},${this.y})`;
    }

    fromString(s: string): CellId {
        const match = s.match(/\((\-?\d+),(\-?\d+)\)/);
        if (!match) {
            throw new Error(`Invalid CellId string: ${s}`);
        }
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        return new CellId(x, y);
    }
}


export const CellType = {
    Empty: 'Empty',
    Monster: 'Monster',
    Loot: 'Loot',
    Checkpoint: 'Checkpoint',
    Boss: 'Boss',
    Start: 'Start',
    End: 'End',
    Title: 'Title',
} as const;

export type CellType = typeof CellType[keyof typeof CellType];

export class Cell {

    type: CellType;
    playerIcons: PlayerIcon[];

    constructor(type: CellType, playerIcons: PlayerIcon[] = []) {

        this.type = type;
        this.playerIcons = playerIcons;
    }
}

export class EmptyCell extends Cell {
    constructor() {
        super(CellType.Empty);
    }
}
export class MonsterCell extends Cell {
    monster: Monster;

    constructor(monster: Monster, playerIcons: PlayerIcon[] = []) {
        super(CellType.Monster);
        this.monster = monster;
        this.playerIcons = playerIcons;
    }
}

export class LootCell extends Cell {


    constructor(playerIcons: PlayerIcon[] = []) {
        super(CellType.Loot);
        this.playerIcons = playerIcons;

    }
}
export class CheckpointCell extends Cell {
    constructor(playerIcons: PlayerIcon[] = []) {
        super(CellType.Checkpoint);
        this.playerIcons = playerIcons;
    }
}
export class BossCell extends Cell {
    boss: Monster;

    constructor(boss: Monster, playerIcons: PlayerIcon[] = []) {
        super(CellType.Boss);
        this.boss = boss;
        this.playerIcons = playerIcons;
    }
}


export class StartCell extends Cell {
    constructor(playerIcons: PlayerIcon[] = []) {
        super(CellType.Start);
        this.playerIcons = playerIcons;
    }
}
export class EndCell extends Cell {
    constructor(playerIcons: PlayerIcon[] = []) {
        super(CellType.End);
        this.playerIcons = playerIcons;
    }
}

export class TitleCell extends Cell {


    constructor() {
        super(CellType.Title);

    }
}

export const LOOT_ITEMS: Loot[] = [
    Loot.CursedAmulet,
    Loot.HealthPotion,
    Loot.SpeedPotion,
    Loot.LuckyPotion,
    Loot.StrengthPotion,
    Loot.BlessedBracelet,
];