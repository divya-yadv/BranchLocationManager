import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BranchesComponent } from "./branches/branches.component";
import { AuthComponent } from "./auth/auth.component";
import { BranchEditComponent } from "./branches/branch-edit/branch-edit.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
  {
    path: '', component: BranchesComponent, pathMatch:'full'},
  { path: 'auth', component: AuthComponent },
    { path: 'branches/new', component: BranchEditComponent },
  { path: 'branches/:id/edit', component: BranchEditComponent }
 
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
