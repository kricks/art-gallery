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

  // @ViewChild('title') titleInputRef: ElementRef;
  // @ViewChild('image') imageInputRef: ElementRef;
  // @ViewChild('description') descriptionInputRef: ElementRef;

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
  // const title = this.titleInputRef.nativeElement.value;
  // const image = this.imageInputRef.nativeElement.value;
  // const description = this.descriptionInputRef.nativeElement.value;

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


  // this.route.paramMap.subscribe((paramMap: ParamMap) => {
  //   if (paramMap.has('artId')) {
  //     this.mode = 'edit';
  //     this.editMode = true;
  //     this.artId = paramMap.get('artId');
  //     this.isLoad = true;
  //     this.artService.getArt(this.artId).subscribe((art: Gallery) => {
  //       this.isLoad = false;
  //       this.gallery = {
  //         id: art.id,
  //         imagePath: art.imagePath,
  //         title: art.title,
  //         description: art.description,
  //         imageFile: art.imageFile
  //       };
  //       this.form.setValue({
  //         imagePath: art.imagePath,
  //         title: art.title,
  //         description: art.description
  //       });
  //     });
  //   } else {
  //     this.mode = 'create';
  //     this.artId = null;
  //   }
  // });
}

  onSubmit() {
    // onSubmit(form: NgForm) {
    // const value = form.value;
    // const newArt = new Gallery(value.id, value.imagePath, value.title, value.description, null);
    //// console.log('here');
    //// console.log(this.gallery);
    if (this.editMode === true) {
      // this.artService.updateArt(this.originalArt, this.gallery);
      this.artService.updateArt(this.gallery, this.artId);
    } else {
      this.artService.addArt(this.gallery);
    }

    // ////console.log("MODE", this.mode);

    // if (this.mode === 'create') {
    //   this.artService.addArt(
    //     {
    //       id: '',
    //       imagePath: this.gallery.imagePath,
    //      imageFile: this.gallery.imageFile,
    //       title: this.gallery.title,
    //       description: this.gallery.description
    //   }
    //   );

    //   ////console.log(  , this.artService);
    // } else {
    //   this.artService.updateArt(
    //     this.artId,
    //     this.gallery.imagePath,
    //     this.gallery.imageFile,
    //     this.gallery.title,
    //     this.gallery.description
    //   );
    // }
    // this.form.reset();
    this.router.navigate(['/gallery']);
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

