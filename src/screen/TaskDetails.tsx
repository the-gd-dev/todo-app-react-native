import moment from 'moment';
import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../assets/colors';
import SafeAreaContainer from '../components/SafeAreaContainer';
import {useTasks} from '../context/TaskContext';

const TaskDetails = ({route, navigation}) => {
  const {setTasks} = useTasks();
  const task = route?.params?.data ?? {};
  const deleteTask = () => {
    Alert.alert(
      'Are you sure ?',
      'Do you want to delete the task?',
      [
        {
          text: 'Discard',
          onPress: () => {},
          style: 'destructive',
        },
        {
          text: 'Confirm',
          onPress: () => {
            setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
            navigation.navigate('TaskList')
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        <View style={styles.detailsWrapper}>
          <Text style={styles.title}>{task?.title}</Text>
          <Text style={styles.description}>{task.description ?? '-NA-'}</Text>
          <Text style={styles.date}>
            {task.date ? moment(task.date).format('ddd DD, MMMM YYYY') : ''}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TaskList')}
            style={{
              ...styles.btnBase,
              gap: 8,
              backgroundColor: colors.lightgrey,
            }}>
            <Text style={{color: colors.dark, fontWeight: '500'}}>Back</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TaskSave', {
                  title: task.title,
                  data: task,
                });
              }}
              style={{
                ...styles.btnBase,
                backgroundColor: colors.primary,
              }}>
              <Text style={{color: 'white', fontWeight: '500'}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={deleteTask}
              style={{
                ...styles.btnBase,
                backgroundColor: colors.danger,
              }}>
              <Text style={{color: 'white', fontWeight: '500'}}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  btnBase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    minWidth: 80,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
  },
  detailsWrapper: {
    flexDirection: 'column',
    gap: 10,
    // borderWidth: 1,
    // borderColor: 'grey',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 6,
    margin: 16,
    backgroundColor: '#fff',
    padding: 16,
  },
  container: {
    flex: 1,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    color: colors.dark,
  },
  description: {
    minHeight: 50,
    fontWeight: '500',
    fontSize: 15,
    color: '#666',
    marginBottom: 16,
  },
  date: {
    fontWeight: '500',
    fontSize: 14,
    color: colors.grey,
    marginBottom: 4,
  },
});
