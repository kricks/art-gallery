export class Gallery {
    id: string;
    title: string;
    description: string;
    imagePath: string;

  constructor(id: string, title: string, description: string, imagePath: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imagePath = imagePath;
  }

  }
