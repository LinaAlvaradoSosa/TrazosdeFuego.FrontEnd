import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { SobreNosotrsComponent } from './pages/sobre-nosotrs/sobre-nosotrs.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdmiComponent } from './pages/admi/admi.component';
import { AdminContactosComponent } from './pages/admin-contactos/admin-contactos.component';
import { PrincipalAdmiComponent } from './pages/principal-admi/principal-admi.component';
import { AdminProductosComponent } from './pages/admin-productos/admin-productos.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
    {path: "", component:HomeComponent},
    {path: "catalogo", component: CatalogoComponent},
    {path: "sobre-nosotros", component: SobreNosotrsComponent},
    {path: "contacto", component:ContactoComponent},
    {path: "admi-trazosdeFuego", component: AdmiComponent},
    {path: 'galeria-tipos/:tipo',
        loadComponent: () =>
        import('./pages/galeriaportipos/galeriaportipos.component').then(m => m.GaleriaportiposComponent)
    },

    // necesitan token

    {
        path: "principalAdmi",
        component: PrincipalAdmiComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "admi-productos",
        component: AdminProductosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "admi-contactos",
        component: AdminContactosComponent,
        canActivate: [AuthGuard]
    } 
];
