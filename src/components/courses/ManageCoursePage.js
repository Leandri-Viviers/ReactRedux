import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Actions
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
// Components
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

const ManageCoursePage = ({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) => {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((err) => alert(err));
    } else {
      setCourse({ ...props.course });
    }
    if (authors.length === 0) {
      loadAuthors().catch((err) => alert(err));
    }
  }, [props.course]);

  const handleChange = ({ target: { name, value } }) => {
    setCourse({
      ...course,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    });
  };

  const formIsValid = () => {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = 'Title is required.';
    if (!authorId) errors.author = 'Author is required.';
    if (!category) errors.category = 'Category is required.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;

    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success('Course saved.');
        history.push('/courses');
      })
      .catch((err) => {
        setSaving(false);
        setErrors({ onSave: err.message });
      });
  };

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(
  ({ courses, authors }, ownProps) => ({
    course:
      courses.length > 0 && ownProps.match.params.slug
        ? courses.find(
            (course) => course.slug === ownProps.match.params.slug,
          ) || null
        : newCourse,
    courses,
    authors,
  }),
  {
    loadCourses,
    loadAuthors,
    saveCourse,
  },
)(ManageCoursePage);
