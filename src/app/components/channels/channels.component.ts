import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { faCaretRight, faCaretDown, faPlus, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelDialogComponent } from '../add-channel-dialog/add-channel-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Channel } from 'src/app/models/channel.class';
import { map } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface TreeNode {
  id: string;
  name: string;
  level: number;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    id: 'channels',
    name: 'Channels',
    level: 1,
    children: [ { id: '1', name: 'allgemein', level: 2 }, 
                { id: '2', name: 'bewebung' , level: 2  }, 
                { id: '3', name: 'javascript', level: 2 }],
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  faCaretRight = faCaretRight;
  faCaretDown = faCaretDown;
  faEllipsisV = faEllipsisV;
  faPlus = faPlus;
  moreOptions: boolean = false;
  channels: any = [];
  chatType = 'channels'

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.firestore
    .collection('channels')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(change => {
          const data = change.payload.doc.data();
          const id = change.payload.doc.id;
          return { id, ...(data as object) };
        });     
      }
      )
    )
    .subscribe((changes: any) => {
      this.channels = changes.filter((item) => item.name != null);
      console.log('Channels : ', this.channels);
      TREE_DATA[0].children = this.channels;

      this.dataSource.data = TREE_DATA;
      //console.log('dataSource.data : ', this.dataSource.data);
      }
    )
    // .valueChanges()
    // .subscribe((changes: any) => {
    //   this.channels = changes.filter((item) => item.name != null);
    //   console.log('Channels : ', this.channels);
    //   TREE_DATA[0].children = this.channels;
    //   this.dataSource.data = TREE_DATA;
    // });
  }

  openDialog(): void {
      const dialogRef = this.dialog.open(AddChannelDialogComponent);
  }

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id: node.id,
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

  isTopLevel = (_: number, node: ExampleFlatNode) => node.level == 1;
}
