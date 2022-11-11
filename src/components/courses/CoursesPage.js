import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../redux/actions/courseActions';

class CoursesPage extends React.Component {
  state = {
    course: {
      title: '',
    },
  };

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.createCourse({ course: this.state.course });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map((course, index) => (
          <div key={index}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = ({ courses }) => ({ courses });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(courseActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
