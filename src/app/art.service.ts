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

    constructor(private http: HttpClient,
                private router: Router) {}

    getGallery() {
      this.http.get<{ message: string, gallery: Gallery[] }>('http://localhost:3000/art/')
      .pipe(
        map(postData => {
          return postData.gallery.map(art => {
            return {
              id: art.id,
              imagePath: art.imagePath,
              title: art.title,
              description: art.description,
            };
          });
        })
      )
      .subscribe(transformedArt => {
        this.gallery = transformedArt;
        this.galleryEventChanged.next([...this.gallery]);
      });
    }

    getArtUpdateListener() {
      return this.galleryEventChanged.asObservable();
    }

    getArt(id: string) {
      return this.http.get<{ id: string, imagePath: string, title: string, description: string  }>(
        'http://localhost:3000/art/' + id
      );
    }

    addArt(image: File, title: string, description: string) {
      const artData = new FormData();
      artData.append('image', image, title);
      artData.append('title', title);
      artData.append('description', description);
      this.http
        .post<{ message: string; gallery: Gallery }>(
          'http://localhost:3000/art/',
          artData
        )
        .subscribe(res => {
          const gallery: Gallery = {
            id: res.gallery.id,
            imagePath: res.gallery.imagePath,
            title,
            description
          };
          this.gallery.push(gallery);
          this.galleryEventChanged.next([...this.gallery]);
          this.router.navigate(['/']);
          // this.router.navigate(['/gallery']);
        });
    }

    updateArt(id: string, image: File | string, title: string, description: string) {
      let artData: Gallery | FormData;
      if (typeof image === 'object') {
        artData = new FormData();
        artData.append('id', id);
        artData.append('image', image, title);
        artData.append('title', title);
        artData.append('description', description);
      } else {
        artData = {
          id,
          imagePath: image,
          title,
          description
        };
      }
      this.http
        .put('http://localhost:3000/art/' + id, artData)
        .subscribe(response => {
          const updatedGallery = [...this.gallery];
          const oldArtIndex = updatedGallery.findIndex(p => p.id === id);
          const gallery: Gallery = {
            id,
            imagePath: '',
            title,
            description
          };
          updatedGallery[oldArtIndex] = gallery;
          this.gallery = updatedGallery;
          this.galleryEventChanged.next([...this.gallery]);
          this.router.navigate(['/']);
        });
    }

    deleteArt(artId: string) {
      this.http.delete('http://localhost:3000/art/' + artId)
      .subscribe(() => {
        const updatedGallery = this.gallery.filter(art => art.id !== artId);
        this.gallery = updatedGallery;
        this.galleryEventChanged.next([...this.gallery]);
      });
    }
}
