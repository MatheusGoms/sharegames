import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
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
        path: 'listGamer',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/list-gamer/list-gamer.module').then(m => m.ListGamerPageModule)
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
        path: 'perfilGamer/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/perfil-gamer/perfil-gamer.module').then(m => m.PerfilGamerPageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
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
        path: 'addGamer',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/add-gamer/add-gamer.module').then(m => m.AddGamerPageModule)
            
            //loadChildren: '../pages/add-player/add-player.module#AddPlayerPageModule'
          }
        ]
      },
      
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
