import React from 'react';
import Dashboard from './Dashboard';
import { Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Dashboard } />
    </Switch>
  );
}
