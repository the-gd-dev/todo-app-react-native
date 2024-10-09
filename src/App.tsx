import React from 'react';
import {TaskProvider} from './context/TaskContext';
import Route from './Route';

const App = () => {
  return (
    <TaskProvider>
      <Route />
    </TaskProvider>
  );
};

export default App;
