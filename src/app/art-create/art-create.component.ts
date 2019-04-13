import { ArtService } from './../art.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { Gallery } from '../gallery.model';

@Component({
  selector: 'app-art-create',
  templateUrl: './art-create.component.html',
  styleUrls: ['./art-create.component.css']
})
export class ArtCreateComponent implements OnInit {
  gallery: Gallery;
  isLoad = false;
  form: FormGroup;
  imagePreview: string;
  artId: string;
  editMode = false;
  mode = 'create';
  originalArt: Gallery;

  constructor(private artService: ArtService,
              private router: Router,
              private route: ActivatedRoute) {
                this.gallery = {
                  id: '',
                  imagePath: '',
                  title: '',
                  description: '',
                  imageFile: null
                };
              }

ngOnInit() {

  this.gallery = {
    id: '',
    imagePath: '',
    title: '',
    description: '',
    imageFile: null
  };

  this.artId = this.route.snapshot.paramMap.get('artId');
  if (this.artId) {
    this.mode = 'edit';
    this.editMode = true;

    for (let i = 0; i < this.artService.gallery.length; i++) {
      if (this.artService.gallery[i].id === this.artId) {
        this.gallery = this.artService.gallery[i];
      }
    }
  }
}

  onSubmit() {
    if (this.editMode === true) {
      this.artService.updateArt(this.gallery, this.artId);
    } else {
      this.artService.addArt(this.gallery);
    }
    this.router.navigate(['/gallery']);
  }

  onCancel() {
    this.router.navigate(['/gallery']);
  }
}

