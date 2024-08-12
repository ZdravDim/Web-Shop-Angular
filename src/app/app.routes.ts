import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserGuard } from './user.guard';
import { LoginComponent } from './login-signup/login/login.component';
import { SignupComponent } from './login-signup/signup/signup.component';
import { WebsiteComponent } from './website/website.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', component: WebsiteComponent, children: [
        { path: '', component: HomeComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'about', component: AboutComponent },
        { path: 'cart', component: CartComponent, canActivate: [UserGuard] },
        { path: 'profile', component: ProfileComponent, canActivate: [UserGuard] },
        { path: 'products', component: ProductsComponent, children: [
            { path: 'men', component: ProductsComponent },
            { path: 'women', component: ProductsComponent }
        ]},
        { path: 'products/:id', component: ProductComponent }
    ]}
];
