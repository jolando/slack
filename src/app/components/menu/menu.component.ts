import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { faComments, faAt, faBookmark, faCommentDots, faLink, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from 'src/app/services/theme.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AuthProcessService, NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  title = 'dark-theme-yt';


  faCommentDots = faCommentDots;
  faComments = faComments;
  faAt = faAt;
  faBookmark = faBookmark;
  faLink = faLink;
  faEllipsisV = faEllipsisV;
  showFiller = false;

  constructor(
    private breakpointObserver: BreakpointObserver,

    public router: Router,
    public afAuth: AngularFireAuth,
    public authProcess: AuthProcessService

  ) {
    // this.dataSource.data = TREE_DATA;
    // this.themeService.initTheme();
    // this.isDarkMode = this.themeService.isDarkMode();
  }


  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  // private _transformer = (node: FoodNode, level: number) => {
  //   return {
  //     expandable: !!node.children && node.children.length > 0,
  //     name: node.name,
  //     level: level,
  //   };
  // };

  // treeControl = new FlatTreeControl<ExampleFlatNode>(
  //   (node) => node.level,
  //   (node) => node.expandable
  // );

  // treeFlattener = new MatTreeFlattener(
  //   this._transformer,
  //   (node) => node.level,
  //   (node) => node.expandable,
  //   (node) => node.children
  // );

  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  // hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
