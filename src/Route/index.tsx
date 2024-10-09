import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TasksList from '../screen/TasksList';
import TaskDetails from '../screen/TaskDetails';
import TaskSave from '../screen/TaskSave';
import colors from '../assets/colors';

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: 'white',
          },
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}>
        <Stack.Screen
          name="TaskList"
          options={{title: 'Task List'}}
          component={TasksList}
        />
        <Stack.Screen
          name="TaskDetails"
          options={{title: 'Task Details'}}
          component={TaskDetails}
        />
        <Stack.Screen
          name="TaskSave"
          options={{title: 'Add or Edit Task'}}
          component={TaskSave}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
