export class Gallery {
    id: string;
    title: string;
    description: string;
    imagePath: string;
    imageFile: File;

  constructor(id: string, title: string, description: string, imagePath: string, imageFile: File) {
    this.id = id;
    this.title = title;
    this.imageFile = imageFile;
    this.description = description;
    this.imagePath = imagePath;
  }

  }
