import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-fixed-size-image',
  templateUrl: './fixed-size-image.component.html',
  styleUrls: ['./fixed-size-image.component.scss'],
})
export class FixedSizeImageComponent {
  @Input() width: string = "auto";
  @Input() height: string = "auto";

  displayedImage: string | ArrayBuffer | null = null;
  imageUrl = 'assets/ramka.png';

  @ViewChild('myCanvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | undefined;

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files.item(0);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (e.target) {
            this.displayedImage = e.target.result;

            if (!this.canvas) {
              console.error('Canvas element not found');
              return;
            }
            const ctx = this.canvas.nativeElement.getContext('2d');
            const img = new Image();
            const frame = new Image();

            let frameLoaded = false;
            let imgLoaded = false;

            img.src = this.displayedImage as string;
            frame.src = this.imageUrl;

            const drawImages = () => {
              if (!frameLoaded || !imgLoaded) return;

              // Размеры холста
              this.canvas.nativeElement.width = frame.width;
              this.canvas.nativeElement.height = frame.height;

              // Нарисуйте рамку
              ctx.drawImage(frame, 0, 0);

              // Размеры изображения с учетом уменьшения на 30%
              const imgWidth = frame.width * 0.7;
              const imgHeight = frame.height * 0.7;

              // Отцентровка изображения относительно рамки
              const offsetX = (frame.width - imgWidth) / 2;
              const offsetY = (frame.height - imgHeight) / 2;

              // Нарисуйте изображение поверх рамки
              ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);
            };

            frame.onload = () => {
              frameLoaded = true;
              drawImages();
            };

            img.onload = () => {
              imgLoaded = true;
              drawImages();
            };
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
