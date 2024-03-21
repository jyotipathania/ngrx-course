import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-type";

export interface CourseState extends EntityState<Course>{
    allCoursesLoaded: false
}

export const adapter = createEntityAdapter<Course>({sortComparer: compareCourses});

export const initialState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const coursesReducer = createReducer(
    initialState,
    on(CourseActions.allCoursesLoaded, (state,action)=> adapter.setAll(action.courses, {...state, allCoursesLoaded: true}))
)

export const { selectAll } = adapter.getSelectors()