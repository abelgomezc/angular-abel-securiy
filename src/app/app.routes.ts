import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { isAuthGuard } from './auth/guard/isAuth.guard';
import { isNotAuthGuard } from './auth/guard/isNotAuth.guard';
import { BarChartComponent } from './dashboard/components/bar-chart/bar-chart.component';
import { LineChartComponent } from './dashboard/components/line-chart/line-chart.component';
import { PerfilComponent } from './dashboard/components/perfil/perfil.component';
import { UserComponent } from './dashboard/components/user/user.component';
import { HomeComponent } from './dashboard/components/home/home.component';
import { ListadoFacturasComponent } from './dashboard/components/listado-facturas/listado-facturas.component';
import { NuevaFacturaComponent } from './dashboard/components/nueva-factura/nueva-factura.component';
import { PedidoHomeComponent } from './dashboard/components/pedido-home/pedido-home.component';
import { ListadoProductosComponent } from './dashboard/components/listado-productos/listado-productos.component';
import { RegistroProductoComponent } from './dashboard/components/registro-producto/registro-producto.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [isAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [isNotAuthGuard] },

  {
    path: 'dashboard', component: DashboardComponent, canActivate: [isAuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },  
      { path: 'bar', component: BarChartComponent },
      { path: 'line', component: LineChartComponent },
      { path : 'perfil',component:PerfilComponent}  ,
      { path: 'user', component:UserComponent },
      { path: 'home', component:HomeComponent },
      {path: 'listado-facturas' ,component:ListadoFacturasComponent},
      {path: 'nueva-factura', component:NuevaFacturaComponent},
      {path:'pedidos', component:PedidoHomeComponent},
      {path : 'listado-productos' , component:ListadoProductosComponent},
      {path: 'registro-producto', component:RegistroProductoComponent}
    ]
  }

];
