import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromCourses from './reducer/course.reducer'

export const selectCoursesState = createFeatureSelector<fromCourses.CourseState>("courses");

export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourses.selectAll
)

export const selectAllBeginnerCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category=== 'BEGINNER')
)

export const selectAllAdvancedCourses = createSelector(
    selectAllCourses,
    courses =>  courses.filter(course => course.category=== 'ADVANCED')
)

export const selectPromoTotal = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.promo).length
)

export const areCoursesLoaded = createSelector(
    selectCoursesState,
    state => state.allCoursesLoaded
)