import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { CmContactData } from './mock';
import { CmCoreModule } from './core/core.module';
import { CmSharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './shared/table/table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatSnackBarModule } from '@angular/material';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';

export const InMemoryModule = HttpClientInMemoryWebApiModule.forRoot(CmContactData, {
  // hijack the http.get, which gives problem for remote fetching of MarkDown documents
  passThruUnknownUrl: true
});

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    TableComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InMemoryModule,
    CmSharedModule,
    CmCoreModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
