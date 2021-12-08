import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { faCaretRight, faCaretDown, faPlus, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddMessageDialogComponent } from '../add-message-dialog/add-message-dialog.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, tap } from 'rxjs/operators';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
 interface TreeNode {
  displayName: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    displayName: 'Direktnachrichten',
    children: [{ displayName: 'Junus Ergin' }, { displayName: 'Manuel Thaler' }, { displayName: 'Mihai' }],
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  displayName: string;
  level: number;
}

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss']
})
export class DirectMessagesComponent implements OnInit {

  moreOptions = false;
  faCaretRight = faCaretRight;
  faCaretDown = faCaretDown;
  faEllipsisV = faEllipsisV;
  faPlus = faPlus;
  users: any = [];
  messages: any = [];
  counterUserList: any = [];

  constructor(private firebaseAuth: AngularFireAuth, 
              private dialog: MatDialog, 
              private firestore: AngularFirestore) { 
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
    this.getUserList();
    this.firestore
    .collection('directMessages')
    .valueChanges()
    .subscribe((changes: any) => {
      this.messages = changes;

      this.messages.forEach(element => {
        console.log('userId : ',element.userIdList)
        let tempUser = this.users.filter( user => user.uid == element.userIdList)[0];
        // console.log('displayName : ', tempUser[0].displayName)
        this.counterUserList.push(tempUser);
      });
      console.log('counterUserList : ', this.counterUserList);
      TREE_DATA[0].children = this.counterUserList;
      this.dataSource.data = TREE_DATA;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMessageDialogComponent);
  }

  isLoggedIn() {
    return this.firebaseAuth.authState.pipe(first()).toPromise();
  }

  getUserList() {
    this.firestore
    .collection('users')
    .valueChanges()
    .subscribe((changes: any) => {
      // console.log('Receive changes from DB', changes);
      this.users = changes.filter((item) => item.displayName != null);
    });
  }

  async getCurrentUser() {
    const user = await this.isLoggedIn()
    if (user) {
      // do something
    } else {
      // do something else
   }
  }

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      displayName: node.displayName,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
