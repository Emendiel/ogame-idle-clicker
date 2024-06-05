// game.model.ts
export interface Planet {
    id: number;
    name: string;
    resources: Resource[];
    buildings: Building[];
}

export interface Resource {
    id: number;
    type: string;
    amount: number;
}

export interface Building {
    id: number;
    type: string;
    level: number;
    resourceType: string;
    productionRate: number;
}

export interface UserGameState {
    id?: number;
    type: string;
    savedAt: Date;
    planets: Planet[];
}
