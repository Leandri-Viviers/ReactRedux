import types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

// Thunks
export const loadCourses = () => (dispatch) => {
  dispatch(beginApiCall());
  return courseApi
    .getCourses()
    .then((courses) =>
      // Action creator
      dispatch({
        type: types.LOAD_COURSES_SUCCESS,
        courses,
      }),
    )
    .catch((err) => {
      dispatch(apiCallError(err));
      throw err;
    });
};

export const saveCourse = (course) => (dispatch) => {
  dispatch(beginApiCall());
  return courseApi
    .saveCourse(course)
    .then((savedCourse) => {
      course.id
        ? dispatch({ type: types.UPDATE_COURSE_SUCCESS, course: savedCourse })
        : dispatch({ type: types.CREATE_COURSE_SUCCESS, course: savedCourse });
    })
    .catch((err) => {
      dispatch(apiCallError(err));
      throw err;
    });
};

export const deleteCourse = (course) => (dispatch) => {
  dispatch({ type: types.DELETE_COURSE_OPTIMISTIC, course });
  return courseApi.deleteCourse(course.id);
};
