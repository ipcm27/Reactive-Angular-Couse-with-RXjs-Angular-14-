import { LoadingService } from "./../loading/loading.service";
import { HttpClient } from "@angular/common/http";
import { catchError, filter, map, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { MessagesService } from "../messages/messages.service";

@Injectable({
  providedIn: "root"
})
export class CourseStore {
  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private laoding: LoadingService,
    private messages: MessagesService
  ) {
    this.loadAllCourses();
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map(courses =>
        courses
          .filter(course => course.category == category)
          .sort(sortCoursesBySeqNo)
      )
    );
  }

  private loadAllCourses() {
    const loadCourses$ = this.http.get("/api/courses").pipe(
      map(response => response["payload"]),
      catchError(err => {
        const message = "Could not load courses";
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(courses => this.subject.next(courses))
    );

    this.laoding.showLoaderUntilComplete(loadCourses$).subscribe();
  }
}
