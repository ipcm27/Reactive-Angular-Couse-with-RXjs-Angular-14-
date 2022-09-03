import { CourseService } from "./../services/courses.service";
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
import { loadingService } from "../loading/loading.service";

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
    private LoadingComponent: loadingService
  ) {}

  ngOnInit() {
    this.reloadedCourses();
  }

  reloadedCourses() {
    const Courses$ = this.coursesService
      .loadAllCourses()
      .pipe(map(courses => courses.sort(sortCoursesBySeqNo)));

    this.beginnerCourses$ = Courses$.pipe(
      map(courses => courses.filter(course => course.category == "BEGINNER"))
    );
    this.advancedCourses$ = Courses$.pipe(
      map(courses => courses.filter(course => course.category == "ADVANCED"))
    );
  }
}
