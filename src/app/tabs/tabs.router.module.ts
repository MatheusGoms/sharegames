import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/login-usuario/login-usuario.module').then(m => m.LoginUsuarioPageModule)
          }
        ]
      },
      {
        path: 'listPlayer',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/list-player/list-player.module').then(m => m.ListPlayerPageModule)
          }
        ]
      },
      {
        path: 'perfilPlayer/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/perfil-player/perfil-player.module').then(m => m.PerfilPlayerPageModule)
          }
        ]
      },
      {
        path: 'addPlayer',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/add-player/add-player.module').then(m => m.AddPlayerPageModule)

            //loadChildren: '../pages/add-player/add-player.module#AddPlayerPageModule'
          }
        ]
      },
      {
        path: 'addPlayer/:id',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/add-player/add-player.module').then(m => m.AddPlayerPageModule)
          }
        ]
      },
      {
        path: 'listGame',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/list-game/list-game.module').then(m => m.ListGamePageModule)
          }
        ]
      },
      {
        path: 'perfilGame/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/perfil-game/perfil-game.module').then(m => m.PerfilGamePageModule)
          }
        ]
      },
      {
        path: 'addGame',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/add-game/add-game.module').then(m => m.AddGamePageModule)
          }
        ]
      },
      {
        path: 'addGame/:id',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/add-game/add-game.module').then(m => m.AddGamePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
