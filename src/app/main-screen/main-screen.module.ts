import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainScreenComponent } from './main-screen.component';
import { SwipeCardComponent } from '../swipe-card/swipe-card.component';
import { RouterModule } from '@angular/router';
import { SwipeDirective } from '../common/directives/swipe.directive';

@NgModule({
  declarations: [
    MainScreenComponent,
    SwipeCardComponent,
    SwipeDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MainScreenComponent }
    ])
  ]
})
export class MainScreenModule { }
