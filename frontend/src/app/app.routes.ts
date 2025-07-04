import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdDetailComponent } from './ad-detail/ad-detail.component';
import { SearchComponent } from './search/search.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'ads/:id', component: AdDetailComponent},
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full'},
    { path: 'search', component: SearchComponent}
];
