import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { PlanetComponent } from './planet/planet.component';
import { BuildingComponent } from './building/building.component';
import { ResourceComponent } from './resource/resource.component';
import { HighestTierPipe } from "../shared/highest-tier.pipe";

@NgModule({
    declarations: [
        HomeComponent,
        GameComponent,
        PlanetComponent,
        ResourceComponent,
        BuildingComponent
    ],
    exports: [
        GameComponent
    ],
    imports: [
        CommonModule,
        HighestTierPipe
    ]
})
export class GameModule { }
