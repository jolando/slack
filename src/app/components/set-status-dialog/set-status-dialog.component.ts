import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


import { User } from 'src/app/pages/login/user';
import { UpdatefirebaseService } from 'src/app/services/updatefirebase.service';

@Component({
  selector: 'app-set-status-dialog',
  templateUrl: './set-status-dialog.component.html',
  styleUrls: ['./set-status-dialog.component.scss'],
})
export class SetStatusDialogComponent implements OnInit {
  @ViewChild('status', { static: true }) statusElement: ElementRef;

  currentStatus: string = '';
  currentUser: User;

  options = [
    { optionText: 'In einem Meeting', smiley: '&#9757' },
    { optionText: 'Unterwegs', smiley: '&#9757' },
    { optionText: 'Krank', smiley: '&#9757' },
    { optionText: 'Im Urlaub', smiley: '&#9757' },
    { optionText: 'Home Office', smiley: '&#9757' },
  ];

  constructor(
    private updateFirestoreService: UpdatefirebaseService,
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  }

  changeStatus() {
    this.updateFirestoreService.updateFirestore(
      'statusText',
      this.statusElement.nativeElement.value
    );
  }
}
