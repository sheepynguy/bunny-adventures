type Item = {
    name: string;
    count: number;
    image: string;
};

type Character = {
    class: string;
    health: number;
    attack: number;
    inventory: Item[];
};