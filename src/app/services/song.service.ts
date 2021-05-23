import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../model/song.model';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  getSongs(): Observable<[Song]>{
    return this.http.get<[Song]>('https://super-rest.herokuapp.com/test/songs');
  }

  getSingleSong(id: string): Observable<Song> {
    return this.http.get<Song>('https://super-rest.herokuapp.com/test/songs/' + id);
  }

  saveSong(item: Song, id?: string): Observable<any> {
    if(id !== ''){
      return this.http.put('https://super-rest.herokuapp.com/test/songs/'+ id, item);
    }

    return this.http.post('https://super-rest.herokuapp.com/test/songs', item);

  }


  deleteSong(item:Song) : Observable<any>{
    return this.http.delete('https://super-rest.herokuapp.com/test/songs/'+item._id);
  }

}
