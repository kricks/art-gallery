import { Gallery } from './../gallery.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-art-create',
  templateUrl: './art-create.component.html',
  styleUrls: ['./art-create.component.css']
})
export class ArtCreateComponent implements OnInit {
  gallery: Gallery;
  orignalArt: Gallery;
  editMode = false;
  id: string;


  @ViewChild('title') titleInputRef: ElementRef;
  @ViewChild('image') imageInputRef: ElementRef;
  @ViewChild('description') descriptionInputRef: ElementRef;

  constructor(private galleryService: Gallery,
              private router: Router,
              private route: ActivatedRoute) { }

ngOnInit() {
  this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (this.id === null || this.id === undefined) {
          this.editMode = false;
          return;
        }
        this.orignalArt = this.galleryService.getArt(this.id);
        if (this.orignalArt === undefined || this.orignalArt === null) {
          this.editMode = false;
          return;
        }
        this.editMode = true;
        this.gallery = JSON.parse(JSON.stringify(this.orignalArt));
      });
}

  onSave(form: NgForm) {
    const title = this.titleInputRef.nativeElement.value;
    const image = this.imageInputRef.nativeElement.value;
    const description = this.descriptionInputRef.nativeElement.value;
    const value = form.value;
    const newArt = new Gallery(value.id, value.title, value.description, value.imagePath);

    if (this.editMode === true) {l
      this.galleryService.updateArt(this.orignalArt, newArt);
    } else {
      this.galleryService.addArt(newArt);
    }

  }

  onClear() {
    this.titleInputRef.nativeElement.value = '';
    this.imageInputRef.nativeElement.value = '';
    this.descriptionInputRef.nativeElement.value = '';

  }

  onCancel() {
    this.router.navigate(['/gallery']);
  }

  // onImagePicked(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({ image: file });
  //   this.form.get('image').updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result;
  //   };
  //   reader.readAsDataURL(file);
  // }

}
