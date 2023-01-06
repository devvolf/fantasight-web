import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterModule } from './register/register/register.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule, LoginModule, RegisterModule],
})
export class AuthModule {}
