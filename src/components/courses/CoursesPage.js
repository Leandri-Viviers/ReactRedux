import React from 'react';
import PropTypes from 'prop-types';
// Router
import { Redirect } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
// Components
import CourseList from './CourseList';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      actions
        .loadCourses()
        .catch((err) => alert(`Failed to load courses: ${err}`));
    }

    if (authors.length === 0) {
      actions
        .loadAuthors()
        .catch((err) => alert(`Failed to load authors: ${err}`));
    }
  }

  handleDeleteCourse = async (course) => {
    toast.success('Course deleted');
    try {
      await this.props.actions.deleteCourse(course);
    } catch (err) {
      toast.error(`Delete failed. ${err.message}`, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              className="btn btn-primary add-course my-3"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = ({ courses, authors, apiCallsInProgress }) => ({
  courses: courses.map((course) => ({
    ...course,
    authorName:
      authors.length > 0
        ? authors.find((auth) => auth.id === course.authorId)?.name
        : '',
  })),
  authors,
  loading: apiCallsInProgress > 0,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
    loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
