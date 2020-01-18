import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Camera } from '../models/camera';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	cameras: Camera[] = [];

    constructor(private cameraService: CameraService) {
     }

    ngOnInit() {
		this.loadAllCameras();
	  }

	private loadAllCameras() {
		this.cameraService.getAll().pipe(first()).subscribe(cameras => {
			this.cameras = cameras;
		});
	}

	deleteCamera(id: number) {
		this.cameraService.delete(id).pipe(first()).subscribe(() => {
			this.loadAllCameras()
		});

  }
}