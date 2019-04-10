import { Gallery } from './../gallery.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-art-create',
  templateUrl: './art-create.component.html',
  styleUrls: ['./art-create.component.css']
})
export class ArtCreateComponent implements OnInit {
  gallery: Gallery[] = [];
  selectedGallery: Gallery;
  imagePreview: string;
  form: FormGroup;
  subs: Subscription;

  constructor(private galleryService: Gallery) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newArt = new Gallery(value.id, value.title, value.description, value.imagePath);
    this.onClear();
  }

  onCancel() {

  }

  onClear() {

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
