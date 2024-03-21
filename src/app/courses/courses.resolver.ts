
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { filter, finalize, first, tap } from "rxjs/operators";
import { CourseActions } from "./action-type";
import { inject } from "@angular/core";
import { areCoursesLoaded } from "./courses.selector";
//https://blog.bitsrc.io/how-ive-replaced-deprecated-resolvers-in-angular-16-59811f79cd5b

let loading = false;

export const CoursesResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    store: Store<AppState> = inject(Store)
): Observable<any> =>  store.pipe(
    select(areCoursesLoaded),
    tap((coursesLoaded)=>{
        if(!loading && !coursesLoaded){
            loading = true
            store.dispatch(CourseActions.loadAllCourses())
        }
       
    }),
    filter(coursesLoaded => coursesLoaded),
    first(),
    finalize(()=> loading = false)
)
