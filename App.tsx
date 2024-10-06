import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {deleteIcon} from './assets'; // Assuming you have the delete icon
import CustomModal from './components/CustomModal';
import SafeAreaContainer from './components/SafeAreaContainer';

const isAndroid: boolean = Platform.OS === 'android';
const fontScale = (fontSize: number) =>
  Dimensions.get('screen').fontScale * fontSize;

interface Task {
  id: string;
  name: string;
}

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (task.trim()) {
      const newTask: Task = {id: Math.random().toString(), name: task};
      setTasks(prevTasks => [...prevTasks, newTask]);
      setTask('');
      setIsModalVisible(false);
    }
  };

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

  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        <View style={styles.floatButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
            }}
            style={styles.floatButtonBtn}>
            <Text style={styles.floatButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View>
          {tasks.length > 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
              style={styles.flatListStyle}
              data={tasks}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={styles.taskItemWrapper}>
                  <Text numberOfLines={1} style={styles.taskText}>
                    {item.name}
                  </Text>
                  <TouchableOpacity onPress={() => deleteTask(item.id)}>
                    <Image style={styles.deleteIcon} source={deleteIcon} />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>

        <CustomModal
          isModalVisible={isModalVisible}
          statusBarTranslucent
          style={{backgroundColor: 'transparent'}}>
          <KeyboardAvoidingView>
            <View style={styles.modalContentContainer}>
              <View>
                <Text style={styles.modalHeading}>Add A New Task</Text>
              </View>
              <View>
                <TextInput
                  keyboardType="default"
                  maxLength={120}
                  multiline
                  style={styles.input}
                  placeholder="Enter a task"
                  value={task}
                  onChangeText={(text: any) => setTask(text)}
                />
              </View>

              <View style={styles.addButtonWrapper}>
                <TouchableOpacity
                  style={styles.cancelBtnContainer}
                  onPress={() => {
                    setIsModalVisible(false);
                  }}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addBtnContainer}
                  onPress={addTask}>
                  <Text style={styles.addBtnText}>Add Task</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </CustomModal>
      </View>
    </SafeAreaContainer>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <TodoApp />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  floatButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    bottom: '10%',
    right: 30,
    zIndex: 20,
  },
  floatButtonBtn: {
    width: 70,
    height: 70,
    backgroundColor: '#0eb6ac',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatButtonText: {
    fontSize: fontScale(48),
    textAlign: 'center',
    alignSelf: 'center',
    color: '#ffffff',
    marginTop: -6,
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingBottom: '40%',
    paddingTop: '8%',
  },
  modalContentContainer: {
    backgroundColor: 'white',
    height: 250,
    width: '100%',
    padding: 16,
    borderRadius: 17,
  },
  modalHeading: {
    fontSize: fontScale(22),
    color: 'teal',
    fontWeight: '500',
    marginBottom: 10,
  },
  taskItemWrapper: {
    backgroundColor: '#f1f1f1',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    fontSize: fontScale(16),
    color: '#333',
    maxWidth: '80%',
  },
  deleteIcon: {
    height: 25,
    width: 25,
    tintColor: 'teal',
  },
  flatListStyle: {
    flexDirection: 'column',
    rowGap: 10,
    maxHeight: '100%',
  },

  addButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelBtnContainer: {
    backgroundColor: 'lightgrey',
    width: 100,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  addBtnContainer: {
    backgroundColor: '#0eb6ac',
    width: 110,
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  cancelBtnText: {
    fontSize: fontScale(18),
    color: '#444',
  },
  addBtnText: {
    fontSize: fontScale(18),
    color: '#444',
  },
  input: {
    fontSize: fontScale(18),
    paddingLeft: 19,
    paddingTop: 10,
    height: 100,
    borderRadius: 8,
    borderColor: '#ccc',
    color: '#222',
    borderWidth: 1,
    marginVertical: 9,
  },
  container: {
    flex: 1,
  },
});

export default App;
