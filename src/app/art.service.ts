import { Gallery } from './gallery.model';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArtService {
    gallery: Gallery[] = [];
    galleryEventChanged = new Subject<Gallery[]>();
    maxDocumentId: number;

    constructor(private http: HttpClient,
                private router: Router) {
      this.maxDocumentId = this.getMaxId();
    }

    // getGallery() {
    //   this.http.get('http://localhost:3000/art')
    //   .subscribe(res => {
    //     ////console.log('res');
    //     ////console.log(res, typeof res);
    //     // this.gallery = res
    //     // this.galleryEventChanged.next([...this.gallery]);
    //   });
    // }

    getGallery() {
      this.http.get<{ message: string, gallery: Gallery[] }>('http://localhost:3000/arts')
        .subscribe(
          (res) => {
            this.gallery = res.gallery;
            // this.gallery.sort((a, b) => (a.title < b.title) ? 1 : (a.title > b.title) ? -1 : 0);
            // this.galleryEventChanged.next(this.gallery.slice());
            this.galleryEventChanged.next(this.gallery);
            //// console.log(res);
          }, (error: any) => {
            //// console.log('something bad happened...');
          }
        );
    }

    getArtUpdateListener() {
      return this.galleryEventChanged.asObservable();
    }

    getArt(id: string) {
      return this.http.get<{ id: string, imagePath: string, title: string, description: string  }>(
        'http://localhost:3000/arts/' + id
      );
    }

    addArt(newArt: Gallery) {
      // if (!newArt) {
      //   return;
      // }
      //// console.log('new', newArt);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      newArt.id = '';
      const strArt = JSON.stringify(newArt);
      this.http.post<{ message: string, gallery: Gallery[] }>('http://localhost:3000/arts',
      strArt,
        { headers })
        .subscribe(
          (res) => {
            this.gallery = res.gallery;
          });
    }

    // updateArt(originalArt: Gallery, newArt: Gallery) {
      updateArt(newArt: Gallery, id: string) {
      console.log('updating');

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const strArt = JSON.stringify(newArt);
      this.http.put<{ message: string, gallery: Gallery[]}>('http://localhost:3000/arts/' + id
        , strArt
        , { headers })
        .subscribe(
          (responseData) => {
            this.gallery = responseData.gallery;
          });
    }

    deleteArt(artId: string) {
      this.http.delete('http://localhost:3000/arts/' + artId)
      .subscribe(() => {
        const updatedGallery = this.gallery.filter(art => art.id !== artId);
        this.gallery = updatedGallery;
        this.galleryEventChanged.next([...this.gallery]);
      });
    }

    getMaxId(): number {
      let maxId = 0;
      for (const gallery of this.gallery) {
        const currentId = parseInt(gallery.id, 10);
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
      return maxId;
    }

}
