import moment from 'moment';
import React, { useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { deleteIcon, editIcon } from '../assets'; // Assuming you have the delete icon
import colors from '../assets/colors';
import SafeAreaContainer from '../components/SafeAreaContainer';
import { Task, useTasks } from '../context/TaskContext';

const fontScale = (fontSize: number) =>
  Dimensions.get('screen').fontScale * fontSize;

const TasksList = ({navigation}) => {
  const {tasks, setTasks} = useTasks();
  console.log(tasks);

  const [fadeAnim] = useState(new Animated.Value(0));

  const deleteTask = (taskId: string) => {
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
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
          },
        },
      ],
      {cancelable: false},
    );
  };

  const addNewTask = () => {
    navigation.navigate('TaskSave', {
      title: 'Add New Task',
    });
  };

  const viewTask = (item: Task) => {
    navigation.navigate('TaskDetails', {
      title: 'Add New Task',
      data: item,
    });
  };

  const editTask = (item: Task) => {
    navigation.navigate('TaskSave', {
      title: item.title,
      data: item,
    });
  };

  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        <View style={styles.floatButtonContainer}>
          <TouchableOpacity onPress={addNewTask} style={styles.floatButtonBtn}>
            <Text style={styles.floatButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View>
          {tasks.length > 0 ? (
            <FlatList
              contentContainerStyle={styles.flatListContainerStyle}
              showsVerticalScrollIndicator={false}
              style={styles.flatListStyle}
              data={tasks}
              keyExtractor={(item: any) => item.id}
              ListFooterComponent={() => <View style={{height: 140}} />}
              renderItem={({item, index}: any) => (
                <View style={[styles.taskItemWrapper]}>
                  <TouchableOpacity onPress={() => viewTask(item)}>
                    <Text numberOfLines={1} style={styles.taskText}>
                      {item.title}
                    </Text>
                    <Text style={styles.taskDate}>
                      {moment(item.date).format('ddd DD, MMMM YYYY')}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity
                      style={[styles.iconBtn, styles.editBtn]}
                      onPress={() => editTask(item)}>
                      <Image style={styles.iconBase} source={editIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.iconBtn, styles.deleteBtn]}
                      onPress={() => deleteTask(item.id)}>
                      <Image style={styles.iconBase} source={deleteIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          ) : (
            <View
              style={{
                height: Dimensions.get('screen').height / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.dark,
                  fontSize: 22,
                  fontWeight: 'bold',
                }}>
                No Tasks Added.
              </Text>
              <Text
                style={{
                  color: '#111',
                  fontSize: 16,
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                {`Please add new tasks by \nclicking the add button below.`}
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  taskDate: {
    marginTop: 2,
    fontSize: 12,
    color: 'slategrey',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  floatButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    bottom: 40,
    right: 20,
    zIndex: 20,
  },
  floatButtonBtn: {
    width: 64,
    height: 64,
    backgroundColor: colors.primary,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  floatButtonText: {
    fontSize: fontScale(38),
    textAlign: 'center',
    alignSelf: 'center',
    color: '#ffffff',
    marginTop: -6,
  },
  taskItemWrapper: {
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colors.dark,
    shadowOffset: {height: 0, width: 0},
    elevation: 4,
    shadowOpacity: 0.3,
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  taskText: {
    fontSize: fontScale(17),
    color: colors.dark,
    fontWeight: '500',
    width: '100%',
    marginRight: 6,
    maxWidth: Dimensions.get('screen').width - 190,
  },
  deleteBtn: {
    backgroundColor: colors.danger,
  },
  editBtn: {
    backgroundColor: colors.primary,
  },
  iconBtn: {
    height: 40,
    width: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBase: {
    height: 14,
    width: 14,
    tintColor: '#fff',
  },
  iconContainer: {
    position: 'absolute',
    flexDirection: 'row',
    columnGap: 8,
    right: 8,
    paddingRight: 8,
    zIndex: 10,
  },
  flatListContainerStyle: {
    paddingTop: 20,
  },
  flatListStyle: {
    flexDirection: 'column',
    maxHeight: '100%',
  },
});

export default TasksList;
