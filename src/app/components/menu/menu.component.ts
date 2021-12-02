import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { FlatTreeControl } from '@angular/cdk/tree';


import { AuthProcessService, NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ThemeService } from 'src/app/services/theme.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Channels',
    children: [{ name: 'example' }, { name: 'example' }, { name: 'example' }],
  },
  {
    name: 'Direktnachrichten',
    children: [
      {
        name: 'example',
      },
      {
        name: 'example',
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  title = 'dark-theme-yt';
  isDarkMode: boolean;
  showFiller = false;


  constructor(
    private breakpointObserver: BreakpointObserver,
    public themeService: ThemeService,
    public router: Router,
    public afAuth: AngularFireAuth,
    public authProcess: AuthProcessService

  ) {
    this.dataSource.data = TREE_DATA;
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  async signOut() {
    await this.authProcess.signOut()
    this.router.navigate(['/']);
  }



  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();

    this.isDarkMode
      ? this.themeService.update('lightMode')
      : this.themeService.update('darkMode');
  }




  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
