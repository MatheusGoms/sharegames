import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'list-player', loadChildren: './pages/list-player/list-player.module#ListPlayerPageModule' },
  { path: 'perfil-player', loadChildren: './pages/perfil-player/perfil-player.module#PerfilPlayerPageModule' },
  { path: 'add-gamer', loadChildren: './pages/add-gamer/add-gamer.module#AddGamerPageModule' },
  { path: 'list-gamer', loadChildren: './pages/list-gamer/list-gamer.module#ListGamerPageModule' },
  { path: 'list-gamer', loadChildren: './pages/list-gamer/list-gamer.module#ListGamerPageModule' },
  { path: 'perfil-gamer', loadChildren: './pages/perfil-gamer/perfil-gamer.module#PerfilGamerPageModule' },
  // { path: 'add-player', loadChildren: './pages/add-player/add-player.module#AddPlayerPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
