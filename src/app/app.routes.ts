import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserGuard } from './guards/user.guard';
import { LoginComponent } from './login-signup/login/login.component';
import { SignupComponent } from './login-signup/signup/signup.component';
import { WebsiteComponent } from './website/website.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { AdminGuard } from './guards/admin.guard';
import { VisitorGuard } from './guards/visitor.guard';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [VisitorGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [VisitorGuard] },
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
        { path: 'products/:id', component: ProductComponent },
        { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] }
    ]}
];
