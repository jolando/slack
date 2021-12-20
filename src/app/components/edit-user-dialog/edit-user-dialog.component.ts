import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

import { User } from 'src/app/pages/login/user';
import { UpdatefirebaseService } from 'src/app/services/updatefirebase.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent implements OnInit, MatFormFieldModule {
  value: string;
  currentUser: User;
  displayName = true;

  selectedFile;

  @ViewChild('name', { static: true }) name: ElementRef;

  constructor(
    private updateFirestoreService: UpdatefirebaseService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    //current User should be subscribed from firebase
    this.currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  }

  updateName() {
    this.updateFirestoreService.updateFirestore(
      'displayName',
      this.name.nativeElement.value
    );
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    return new Promise((resolve, reject) => {
      let n = Date.now();
      const file = this.selectedFile;
      const filePath = `images/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`images/${n}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            let imageURL = fileRef.getDownloadURL();
            imageURL.subscribe((url: any) => {
              if (url) {
                console.log(url, 'done');
                resolve(url);
                this.updateFirestoreService.updateFirestore('photoUrL', url);
              }
            });
          })
        )
        .subscribe((url) => {
          if (url) {
            console.log(url, 'hello');
          }
        });
    });
  }
}
