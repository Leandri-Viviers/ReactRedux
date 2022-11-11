import types from './actionTypes';

export const createCourse = ({ course }) => ({
  type: types.CREATE_COURSE,
  course,
});
