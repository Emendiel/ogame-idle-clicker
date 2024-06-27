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
    resourceProduction: ResourceType;
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

export enum BuildingType {
    Quarry = 'Quarry',
    Mine = 'Mine',
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

export const BuildingTypeResourceMapping: {
    [key in BuildingType]: ResourceType
} = {
    [BuildingType.Quarry]: ResourceType.Stone,
    [BuildingType.Mine]: ResourceType.Copper,
}

export const ResourceTierMapping: {
    [key in ResourceType]: ResourceTier
} = {
    [ResourceType.Stone]: ResourceTier.Tier1,
    [ResourceType.Copper]: ResourceTier.Tier2,
    [ResourceType.Iron]: ResourceTier.Tier3,
}