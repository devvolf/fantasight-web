import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/auth.reducers';
import { Features } from '../shared/consts/features.consts';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(Features.Auth, authReducer),
    EffectsModule.forFeature([AuthEffects]),
    CommonModule,
    AuthRoutingModule,
    LoginModule,
  ],
})
export class AuthModule {}
