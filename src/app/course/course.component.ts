import { CourseService } from "./../services/courses.service";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll,
  shareReplay,
  catchError
} from "rxjs/operators";
import {
  merge,
  fromEvent,
  Observable,
  concat,
  throwError,
  combineLatest
} from "rxjs";
import { Lesson } from "../model/lesson";

interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"]
})
export class CourseComponent implements OnInit {
  data$: Observable<CourseData>;
  course$: Observable<Course>;

  lessons$: Observable<Lesson[]>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    const courseId = parseInt(this.route.snapshot.paramMap.get("courseId"));

    const course$ = this.courseService.loadCourseById(courseId);

    const lessons$ = this.courseService.loadAllCourseLessons(courseId);

    this.data$ = combineLatest([course$, lessons$]).pipe(
      map(([course, lessons]) => {
        return {
          course,
          lessons
        };
      })
    );
  }
}
