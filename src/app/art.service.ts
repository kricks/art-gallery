import { Gallery } from './gallery.model';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GalleryService {
    private gallery: Gallery[] = [];
    private galleryUpdated = new Subject<Gallery[]>();
    maxGalleryId: number;

    constructor(private http: HttpClient,
                private galleryService: GalleryService) {}

    // get gallery

    // get art

    // add art
    addArt(newArt: Gallery) {
        if (!newArt) {
            return;
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        newArt.id = '';
        const strArt = JSON.stringify(newArt);

        this.http.post<{ message: string, gallery: Gallery[] }>('http://localhost:3000/art',
        strArt,
        { headers })
        .subscribe(
          (res) => {
            this.gallery = res.gallery;
            this.gallery.sort((a, b) => (a.title < b.title) ? 1 : (a.title > b.title) ? -1 : 0);
            this.galleryUpdated.next(this.gallery.slice());
          });
    }

    // update art

    // delete art

    getMaxId(): number {
        let maxId = 0;
        for (const message of this.gallery) {
          const currentId = +message.id;
          if (currentId > maxId) {
            maxId = currentId;
          }
        }
        return maxId;
      }
}
