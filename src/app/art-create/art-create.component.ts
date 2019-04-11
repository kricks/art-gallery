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
  mode = 'create';

  // @ViewChild('title') titleInputRef: ElementRef;
  // @ViewChild('image') imageInputRef: ElementRef;
  // @ViewChild('description') descriptionInputRef: ElementRef;

  constructor(private artService: ArtService,
              private router: Router,
              private route: ActivatedRoute) { }

ngOnInit() {
  // const title = this.titleInputRef.nativeElement.value;
  // const image = this.imageInputRef.nativeElement.value;
  // const description = this.descriptionInputRef.nativeElement.value;

  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('artId')) {
      this.mode = 'edit';
      this.artId = paramMap.get('artId');
      this.isLoad = true;
      this.artService.getArt(this.artId).subscribe(art => {
        this.isLoad = false;
        this.gallery = {
          id: art.id,
          imagePath: art.imagePath,
          title: art.title,
          description: art.description
        };
        this.form.setValue({
          imagePath: art.imagePath,
          title: art.title,
          description: art.description
        });
      });
    } else {
      this.mode = 'create';
      this.artId = null;
    }
  });
}

  onSave(form: NgForm) {
    if (this.form.invalid) {
      return;
    }
    this.isLoad = true;
    if (this.mode === 'create') {
      this.artService.addArt(
        this.form.value.image,
        this.form.value.title,
        this.form.value.description
      );
    } else {
      this.artService.updateArt(
        this.artId,
        this.form.value.image,
        this.form.value.title,
        this.form.value.description
      );
    }
    // this.form.reset();
    // this.router.navigate(['/gallery']);
  }

  // onClear() {
  //   this.titleInputRef.nativeElement.value = '';
  //   this.imageInputRef.nativeElement.value = '';
  //   this.descriptionInputRef.nativeElement.value = '';

  // }

  onCancel() {
    this.router.navigate(['/gallery']);
  }
}

