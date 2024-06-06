// game.model.ts
export interface Planet {
    id: number;
    name: string;
    resources: Resource[];
    buildings: Building[];
}

export interface Resource {
    id: number;
    type: ResourceType;
    amount: number;
}

export interface Building {
    id: number;
    type: string;
    level: number;
    resourceCost: Resource[];
    resourceType: ResourceType;
    productionRate: number;
    productionRateProgress: number;
    productionRateNbSeconds: number;
}

export interface UserGameState {
    id?: number;
    type: string;
    savedAt: Date;
    planets: Planet[];
}

export enum ResourceType {
    Stone = 'Stone',
    Copper = 'Copper',
    Iron = 'Iron'
}