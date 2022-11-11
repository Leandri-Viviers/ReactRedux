import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Components
import Header from './common/Header';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import CoursesPage from './courses/CoursesPage';
import PageNotFound from './PageNotFound';

const App = () => (
  <div className="container-fluid">
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/courses" component={CoursesPage} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);

export default App;
