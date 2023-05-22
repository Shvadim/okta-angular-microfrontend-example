import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./products/products.component";
import { OktaCallbackComponent } from "@okta/okta-angular";
import { loadRemoteModule } from "@angular-architects/module-federation";

const routes: Routes = [
  { path: "", component: ProductsComponent },
  {
    path: "basket",
    loadChildren: () =>
      loadRemoteModule({
        type: "module",
        remoteEntry: `http://localhost:4201/remoteEntry.js`,
        exposedModule: "./Module",
      }).then((m) => m.BasketModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      loadRemoteModule({
        type: "module",
        remoteEntry: `http://localhost:4202/remoteEntry.js`,
        exposedModule: "./Module",
      }).then((m) => m.ProfileModule),
  },
  { path: "login/callback", component: OktaCallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
