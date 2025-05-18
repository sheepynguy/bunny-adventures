type Item = {
    name: string;
    count: number;
    image: string;
};

type Character = {
    name: string;
    class: string;
    health: number;
    attack: number;
    inventory: Item[];
};