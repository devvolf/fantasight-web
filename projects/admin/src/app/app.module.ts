import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';
import { authReducer } from './auth/state/auth.reducers';
import { genresReducer } from './main/genres/state/genres.reducers';
import { characteristicsReducer } from './main/characteristics/state/characteristics.reducers';
import { watchablesReducer } from './main/watchables/state/watchables.reducers';
import { WatchablesEffects } from './main/watchables/state/watchables.effects';
import { GenresEffects } from './main/genres/state/genres.effects';
import { CharacteristicsEffects } from './main/characteristics/state/characteristics.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      Auth: authReducer,
      Watchables: watchablesReducer,
      Genres: genresReducer,
      Characteristics: characteristicsReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      WatchablesEffects,
      GenresEffects,
      CharacteristicsEffects,
    ]),
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
