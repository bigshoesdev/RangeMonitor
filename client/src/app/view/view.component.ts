import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Camera } from '../models/camera';
import JSMpeg from '@cycjimmy/jsmpeg-player';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, AfterViewInit {
  cameras$: Observable<any>;
  selectedId: string;
  camera: any;
  stream: any;

  constructor(
    private route: ActivatedRoute,
    private cameraService: CameraService
  ) { }

  ngOnInit() {
    var subject = new Subject<string>();

    this.route.paramMap.subscribe(paramMap => {
      this.selectedId = paramMap.get('id');
    });

    console.log("selected ID: ", this.selectedId);

    this.cameraService.getById(this.selectedId).subscribe(items => {
      this.camera = items;
      console.log(items);
      this.cameraService.getStream(this.selectedId).subscribe((result: any) => {
        var player = new JSMpeg.VideoElement("#video-element", result.url, { autoplay: true });
        player.play();
      })
    });
  }

  ngAfterViewInit() {
  }

}
