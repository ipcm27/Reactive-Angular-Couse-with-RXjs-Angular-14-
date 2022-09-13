import { CourseStore } from "./../services/courses.store";
import { MessagesService } from "./../messages/messages.service";
import { CourseService } from "./../services/courses.service";
import { HttpClient } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from "moment";
import { catchError } from "rxjs/operators";
import { pipe, throwError } from "rxjs";
import { LoadingService } from "../loading/loading.service";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
  providers: [LoadingService, MessagesService]
})
export class CourseDialogComponent implements AfterViewInit {
  form: FormGroup;

  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private courseStore: CourseStore,
    // private coursesService: CourseService,
    // private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });
  }

  ngAfterViewInit() {}

  save() {
    const changes = this.form.value;

    const saveCourse$ = this.courseStore
      .saveCourse(this.course.id, changes)

      .subscribe();

    this.dialogRef.close(changes);
  }

  close() {
    this.dialogRef.close();
  }
}
