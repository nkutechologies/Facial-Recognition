import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmotionService {
  private apiUrl = 'https://19.1.1.38:8000/predict-emotion';

  constructor(private http: HttpClient) { }

  predictEmotion(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    return this.http.post(this.apiUrl, formData);
  }
}
