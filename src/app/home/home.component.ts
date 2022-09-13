import { CourseStore } from "./../services/courses.store";
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
import { MessagesService } from "../messages/messages.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private CourseStore: CourseStore,
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.reloadedCourses();
  }

  reloadedCourses() {
    this.beginnerCourses$ = this.CourseStore.filterByCategory("BEGINNER");

    this.beginnerCourses$ = this.CourseStore.filterByCategory("ADVANCED");
  }
}
// Removed bc of the implemation of store
// reloadedCourses() {
//   const courses$ = this.coursesService.loadAllCourses().pipe(
//     map(courses => courses.sort(sortCoursesBySeqNo)),
//     catchError(err => {
//       const message = "Could not load courses";
//       this.messagesService.showErrors(message);
//       console.log(message, err);
//       return throwError(err);
//     })
//   );

//   const loadCourses$ = this.loadingService.showLoaderUntilComplete(courses$);

//   this.beginnerCourses$ = loadCourses$.pipe(
//     map(courses => courses.filter(course => course.category == "BEGINNER"))
//   );
//   this.advancedCourses$ = loadCourses$.pipe(
//     map(courses => courses.filter(course => course.category == "ADVANCED"))
//   );
// }
