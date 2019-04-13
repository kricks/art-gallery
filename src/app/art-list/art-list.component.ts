import { ArtService } from './../art.service';
import { Gallery } from './../gallery.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css']
})
export class ArtListComponent implements OnInit, OnDestroy {
  gallery: Gallery[] = [];
  isLoad = false;
  subs: Subscription;

  constructor(public artService: ArtService) { }
  ngOnInit() {
    this.isLoad = true;
    this.artService.getGallery();
    this.subs = this.artService.getArtUpdateListener()
      .subscribe((gallery: Gallery[]) => {
        //// console.log('test', gallery);
        this.isLoad = false;
        this.gallery = gallery;
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onDelete(artId: string) {
    this.artService.deleteArt(artId);
  }

}
