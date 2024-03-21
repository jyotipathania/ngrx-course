import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseActions } from "./action-type";
import { concatMap, map } from "rxjs/operators";
import { CoursesHttpService } from "./services/courses-http.service";


@Injectable()

export class CouesesEffects {
    constructor(
        private actions$: Actions,
        private coursesHttpService : CoursesHttpService
    ){}
    loadCourses$ = createEffect(()=>
        this.actions$.pipe(
            ofType(CourseActions.loadAllCourses),
            concatMap(action => this.coursesHttpService.findAllCourses()),
            map((courses)=> CourseActions.allCoursesLoaded({courses}))
        )
    )
}