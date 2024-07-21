import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserGuard } from './user.guard';
import { LoginComponent } from './pages/login-signup/login/login.component';
import { SignupComponent } from './pages/login-signup/signup/signup.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'cart', component: CartComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [UserGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];
