import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainScreenComponent } from './main-screen.component';
import { SwipeCardComponent } from '../swipe-card/swipe-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainScreenComponent,
    SwipeCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MainScreenComponent }
    ])
  ]
})
export class MainScreenModule { }
