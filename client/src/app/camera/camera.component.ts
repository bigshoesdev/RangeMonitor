import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Camera } from '../models/camera';
import { CameraService } from '../services/camera.service';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

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

}
