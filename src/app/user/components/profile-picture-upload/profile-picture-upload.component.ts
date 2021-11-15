import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UserAccountService } from '@core/services/user-account.service';
import { FileChangeEvent } from '@angular/compiler-cli/src/perform_watch';

@Component({
  selector: 'app-profile-picture-upload',
  template: `
    <div class="container">
      <img class="image mat-elevation-z8" [src]="currentPictureUri" />
      <button (click)="OpenUploadDialog()" class="upload" mat-raised-button>
        <mat-icon>upload</mat-icon>
        Upload
      </button>


      <input
        (change)="UploadSelected($event)"
        #hiddenUpload
        id="fileid"
        type="file"
        hidden
      />
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;

        width: 200px;
        margin: auto;

        .image {
          margin-top: 16px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          margin-bottom: 5px;
        }

        .upload {
          margin-top: 5px;

          width: 100%;
        }
      }
    `,
  ],
})
export class ProfilePictureUploadComponent implements OnInit {
  @Input()
  public currentPictureUri: string | undefined;

  @ViewChild('hiddenUpload')
  public hiddenUpload: ElementRef | undefined;

  constructor(private userAccount: UserAccountService) {
    this.currentPictureUri = 'https://localhost:5001/api/Image/Get?guid=s'; //userAccount.getProfilePictureUri();
  }

  ngOnInit(): void {}

  OpenUploadDialog() {
    this.hiddenUpload?.nativeElement?.click();
  }

  UploadSelected(fileEvent: Event) {
    let event = fileEvent as unknown as FileChangeEvent;

    const file = (fileEvent.target as any).files[0];

    console.log('event changed');
    console.log(fileEvent);
    if (file) {
      const formData = new FormData();
      formData.append('profilePicture', file);

      console.log('posting');
      console.log(file);
      this.userAccount.uploadProfilePicture(formData);
      console.log('post_posting');
    }
  }
}
