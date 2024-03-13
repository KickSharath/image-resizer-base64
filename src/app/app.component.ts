import { Component } from '@angular/core';
import * as Pica from 'pica';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'image-resizer';
  
  imageData: string = '';
  resizedImage: string | ArrayBuffer | null = null;

  constructor() { }

  resizeImage() {
    const img = new Image();
    img.onload = () => {
      const pica = new Pica();
      const targetWidth = 1200; 
      const targetHeight = 1200;
  
      const aspectRatio = img.width / img.height;
  
      let resizeWidth = targetWidth;
      let resizeHeight = targetWidth / aspectRatio;
  
      if (resizeHeight > targetHeight) {
        resizeWidth = targetHeight * aspectRatio;
        resizeHeight = targetHeight;
      }
  
      const canvas = document.createElement('canvas');
      canvas.width = resizeWidth;
      canvas.height = resizeHeight;
  
      pica.resize(img, canvas)
        .then((result: HTMLCanvasElement) => {
          const dataURL = result.toDataURL('image/jpeg', 1);
          this.resizedImage = dataURL;
        })
        .catch((error: any) => {
          console.error('Error resizing image:', error);
        });
    };
  
    img.src = this.imageData;
  }
  
  
  
}
