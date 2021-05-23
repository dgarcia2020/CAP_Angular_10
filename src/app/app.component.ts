import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showBar = false;

  //title = 'curso-angular2';

  constructor(private dataService: DataService, private snackBar: MatSnackBar){
    this.dataService.isLoading.subscribe(isLoading =>{
      this.showBar = isLoading;
    });

    this.dataService.message.subscribe(msg => {
      this.snackBar.open(msg, 'Ok', {duration: 3000});
    });
  }

}
