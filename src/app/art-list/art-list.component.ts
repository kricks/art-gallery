// import { GalleryService } from './../art.service';
import { Gallery } from './../gallery.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css']
})
export class ArtListComponent implements OnInit, OnDestroy {
  gallery: Gallery[] = [];

  constructor() { }
  // public galleryService: GalleryService
  ngOnInit() {
  }

  ngOnDestroy() {

  }

  onDelete() {

  }

}
