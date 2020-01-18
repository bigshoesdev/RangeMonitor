import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Camera } from '../models/camera';

@Injectable({
    providedIn: 'root'
  })
export class CameraService {
    constructor(private http: HttpClient) { }

    getAll() {
		return this.http.get<Camera[]>(`${environment.apiURL}/cameras`);
    }

    getById(id: string) {
        return this.http.get(`${environment.apiURL}/cameras/` + id);
    }

    getStream(id: string) {
        return this.http.get(`${environment.apiURL}/cameras/viewStream/` + id);
    }

    create(camera: Camera) {
        console.log(camera);
        return this.http.post(`${environment.apiURL}/cameras/create`, camera);
    }

    update(camera: Camera) {
        return this.http.put(`${environment.apiURL}/cameras/` + camera.id, camera);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiURL}/cameras/` + id);
    }
}
