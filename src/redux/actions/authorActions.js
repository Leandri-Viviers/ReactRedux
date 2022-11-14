import types from './actionTypes';
import * as authorApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

// Thunk
export const loadAuthors = () => (dispatch) => {
  dispatch(beginApiCall());
  return authorApi
    .getAuthors()
    .then((authors) =>
      // Action creator
      dispatch({
        type: types.LOAD_AUTHORS_SUCCESS,
        authors,
      }),
    )
    .catch((err) => {
      dispatch(apiCallError(err));
      throw err;
    });
};
