import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../services/alert.service';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createCamera: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cameraService: CameraService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.createCamera = this.formBuilder.group({
      address: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      description: [''],
      status: [true]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.createCamera.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.createCamera.invalid) {
      return;
    }

    this.loading = true;
    this.cameraService.create(this.createCamera.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Camera created successfully', true);
            this.router.navigate(['/dashboard']);
          },
          error => {
            console.log('error ' + error);
            this.alertService.error(error);
            this.loading = false;
          });
  }
}
