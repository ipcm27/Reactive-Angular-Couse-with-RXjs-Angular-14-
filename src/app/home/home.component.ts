import { CourseService } from "./../services/courses.service";
import { LoadingService } from "./../loading/loading.service";

import { Component, OnInit } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from "rxjs";
import {
  catchError,
  delay,
  delayWhen,
  filter,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap
} from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private coursesService: CourseService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.reloadedCourses();
  }

  reloadedCourses() {
    // this.loadingService.loadingOn();

    // const Courses$ = this.coursesService.loadAllCourses().pipe(
    //   map(courses => courses.sort(sortCoursesBySeqNo)),
    //   finalize(() => this.loadingService.loadingOff())
    // );

    //   this.beginnerCourses$ = Courses$.pipe(
    //   map(courses => courses.filter(course => course.category == "BEGINNER"))
    // );
    // this.advancedCourses$ = Courses$.pipe(
    //   map(courses => courses.filter(course => course.category == "ADVANCED"))
    // );

    const courses$ = this.coursesService
      .loadAllCourses()
      .pipe(map(courses => courses.sort(sortCoursesBySeqNo)));

    const loadCourses$ = this.loadingService.showLoaderUntilComplete(courses$);

    this.beginnerCourses$ = loadCourses$.pipe(
      map(courses => courses.filter(course => course.category == "BEGINNER"))
    );
    this.advancedCourses$ = loadCourses$.pipe(
      map(courses => courses.filter(course => course.category == "ADVANCED"))
    );
  }
}
