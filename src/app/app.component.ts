import { Component } from '@angular/core';
import { EmotionService } from './emotion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Facial-Recognition';

  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  predictionResult: any = null;
  loading: boolean = false;

  constructor(private emotionService: EmotionService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedImage = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.selectedImage) {
      this.loading = true;
      this.emotionService.predictEmotion(this.selectedImage).subscribe(
        response => {
          console.log('Emotion prediction result:', response);
  
          // Capitalize the predicted_emotion property
          const capitalizedEmotion = this.capitalizeFirstLetter(response.predicted_emotion);
          this.predictionResult = capitalizedEmotion;
        },
        // error => {
        //   console.error('Error predicting emotion:', error);
        //   // Handle errors
        // }
      ).add(() => {
        this.loading = false;
      });
    }
  }
  
  capitalizeFirstLetter(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
}
