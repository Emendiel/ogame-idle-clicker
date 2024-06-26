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
    tier: ResourceTier;
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

export enum ResourceTier {
    Tier1 = 'Tier1',
    Tier2 = 'Tier2',
    Tier3 = 'Tier3',
}

export const ResourceTierMapping: {
    [key in ResourceType]: ResourceTier
} = {
    [ResourceType.Stone]: ResourceTier.Tier1,
    [ResourceType.Copper]: ResourceTier.Tier2,
    [ResourceType.Iron]: ResourceTier.Tier3,
}