import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-general-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: `./GeneralDialog.component.html`,
  styleUrls: ['./GeneralDialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralDialogComponent implements OnInit{ 

  constructor(
    public dialogRef: MatDialogRef<GeneralDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}


  ngOnInit(): void {
    const paragraph = document.getElementById("mySolutionTemplate");

    let textFormated = this.data.replace(/\n/g, "<br>");

    paragraph!.innerHTML = textFormated;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
