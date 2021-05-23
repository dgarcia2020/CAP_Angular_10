import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Song } from '../model/song.model';
import { DataService } from '../services/data.service';
import { SongService } from '../services/song.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //title, Artist, numero de reproduction
  //https://super-rest.herokuapp.com/test/
  //https://super-rest.herokuapp.com/test/songs

  dataSource = new MatTableDataSource<Song>();
  columns = ['name','artist','album', 'actions']

  constructor(private dataService: DataService, private songService: SongService, private router: Router) {

    this.loadData();

   }

   loadData(): void {
    this.dataService.isLoading.next(true);

    this.songService.getSongs().subscribe(songs =>{
      this.dataSource.data = songs;
      this.dataService.isLoading.next(false);
    }, () => {
      this.dataService.isLoading.next(false);
      this.dataService.message.next('Lo sentimos, no se pudieron cargar los elementos');
      //alert('Lo sentimos, no se pudieron cargar los elementos');
    });
   }

  ngOnInit(): void {

  }

  edit(item:Song): void{
    console.log('Elemento a editar: ',item);
    this.router.navigate(['song',item._id]);

  }

  newItem(): void {
    this.router.navigate(['song']);
  }
  delete(item:Song): void{
    console.log('Elemento a eliminar: ',item);
    this.dataService.isLoading.next(true);

    this.songService.deleteSong(item).subscribe(songs =>{
      this.dataService.isLoading.next(false);
      this.loadData();
      this.dataService.message.next('Borrado exitoso del registro');
    }, () => {
      this.dataService.isLoading.next(false);
      this.dataService.message.next('Lo sentimos, no se pudieron borrar el elemento');
      //alert('Lo sentimos, no se pudieron cargar los elementos');
    });
  }

}
