import { Component, OnInit } from '@angular/core';
import { Song } from '../model/song.model';
import { SongService } from '../services/song.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  formSong : FormGroup = this.formBuilder.group({});
  disableButton= false;
  id:string = '';
  title = 'Crear Elemento';

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private song: SongService,
    private activateRoute: ActivatedRoute) {
    this.formSong = this.formBuilder.group({
      name: ['', Validators.required],
      artist: ['', Validators.required],
      album: ['', Validators.required]
    });

    this.dataService.isLoading.subscribe(isLoading =>{
      this.disableButton = isLoading;
    });

    this.activateRoute.params.subscribe(parameters => {
      if(parameters.id){
        this.id = parameters.id;
        this.title = 'Actualizar Elemento';

        this.dataService.isLoading.next(true);

        this.song.getSingleSong(parameters.id).subscribe(item =>{
          //this.formSong.get('name')?.setValue(item.name);
          //this.formSong.get('artist')?.setValue(item.artist);
          //this.formSong.get('album')?.setValue(item.album);
          this.formSong.patchValue(item);
          this.dataService.isLoading.next(false);
        });
      }
    });

  }

  ngOnInit(): void {
  }

  save():void {
    const data = {
      name: this.formSong.get('name')?.value,
      artist: this.formSong.get('artist')?.value,
      album: this.formSong.get('album')?.value
    } as Song;

    /*
    if(this.id !== ''){
      data._id = this.id;
    }
    */
    console.log(data);

    this.dataService.isLoading.next(true);

    this.song.saveSong(data, this.id).subscribe(()=>{
      this.dataService.isLoading.next(false);
      this.router.navigate(['home']);
    }, () => {
      //alert('Lo sentimos, ocurrio un error');
      this.dataService.message.next('Lo sentimos, ocurrio un error');
    });
  }



}
