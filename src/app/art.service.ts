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
    //     console.log('res');
    //     console.log(res, typeof res);
    //     // this.gallery = res
    //     // this.galleryEventChanged.next([...this.gallery]);
    //   });
    // }

    getGallery() {
      this.http.get<{ message: string, gallery: Gallery[] }>('http://localhost:3000/arts')
        .subscribe(
          (res) => {
            this.gallery = res.gallery;
            this.gallery.sort((a, b) => (a.title < b.title) ? 1 : (a.title > b.title) ? -1 : 0);
            this.galleryEventChanged.next(this.gallery.slice());
            console.log(res);
          }, (error: any) => {
            console.log('something bad happened...');
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

    // addArt(imagePath: string, imageFile: File, title: string, description: string) {
    //   const artData = new FormData();
    //   artData.append('image', imagePath);
    //   artData.append('title', title);
    //   artData.append('description', description);
    //   artData.append('imageFile', imageFile);
    //   this.http
    //     .post<{ message: string; gallery: Gallery }>(
    //       'http://localhost:3000/arts/',
    //       artData
    //     )
    //     .subscribe(res => {
    //       const gallery: Gallery = {
    //         id: res.gallery.id,
    //         imagePath: res.gallery.imagePath,
    //         title: res.gallery.title,
    //         description: res.gallery.description,
    //         imageFile: res.gallery.imageFile
    //       };
    //       this.gallery.push(gallery);
    //       this.galleryEventChanged.next([...this.gallery]);
    //       // this.router.navigate(['/']);
    //       // this.router.navigate(['/gallery']);
    //     });
    // }

    addArt(newArt: Gallery) {
      if (!newArt) {
        return;
      }
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
            // this.gallery.sort((a, b) => (a.title < b.title) ? 1 : (a.title > b.title) ? -1 : 0);
            this.galleryEventChanged.next(this.gallery.slice());
            console.log("BLAAAAAAAAh",res);
          });
    }

    updateArt(originalArt: Gallery, newArt: Gallery) {
      if (!originalArt || !newArt) {
        return;
      }
      const pos = this.gallery.indexOf(originalArt);
      if (pos < 0) {
        return;
      }
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const strDocument = JSON.stringify(newArt);
      this.http.patch<{ message: string, gallery: Gallery[]}>('http://localhost:3000/documents/' + originalArt.id
        , strDocument
        , { headers })
        .subscribe(
          (responseData) => {
            this.gallery = responseData.gallery;
            this.gallery.sort((a, b) => (a.title < b.title) ? 1 : (a.title > b.title) ? -1 : 0);
            this.galleryEventChanged.next(this.gallery.slice());
          });
    }

    // updateArt(newArt: Gallery) {
    //   let artData: Gallery | FormData;
    //   if (typeof imagePath === 'object') {
    //     artData = new FormData();
    //     artData.append('id', id);
    //     artData.append('image', imagePath, title);
    //     artData.append('title', title);
    //     artData.append('description', description);
    //   } else {
    //     artData = {
    //       id,
    //       imagePath,
    //       title,
    //       description,
    //       imageFile
    //     };
    //   }
    //   this.http
    //     .put('http://localhost:3000/arts/' + id, artData)
    //     .subscribe(response => {
    //       const updatedGallery = [...this.gallery];
    //       const oldArtIndex = updatedGallery.findIndex(p => p.id === id);
    //       const gallery: Gallery = {
    //         id,
    //         imagePath: '',
    //         title,
    //         description,
    //         imageFile
    //       };
    //       updatedGallery[oldArtIndex] = gallery;
    //       this.gallery = updatedGallery;
    //       this.galleryEventChanged.next([...this.gallery]);
    //       // this.router.navigate(['/']);
    //     });
    // }

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
