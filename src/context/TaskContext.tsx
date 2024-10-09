import React, {createContext, useContext, useState} from 'react';

export interface Task {
  id?: string;
  title?: string; // Changed to string
  name?: string;
  description?: string; // Changed to string (primitive type)
  date?: string;
}

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const initialData: TaskContextType = {
  tasks: [],
  setTasks: () => {}, // Dummy function to satisfy type requirement
};

export const TaskContext = createContext<TaskContextType>(initialData);

export const TaskProvider = ({children}: {children: React.ReactNode}) => {
  const [tasks, setTasks] = useState<Task[]>([]); // Specified type for tasks
  return (
    <TaskContext.Provider value={{tasks, setTasks}}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
