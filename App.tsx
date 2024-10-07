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
  Animated,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {deleteIcon} from './assets'; // Assuming you have the delete icon
import CustomModal from './components/CustomModal';
import SafeAreaContainer from './components/SafeAreaContainer';
import colors from './assets/colors';

const isAndroid: boolean = Platform.OS === 'android';
const fontScale = (fontSize: number) =>
  Dimensions.get('screen').fontScale * fontSize;

interface Task {
  id?: string;
  name?: string;
}

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalDetailsVisible, setIsModalDetailsVisible] = useState(false);
  const [viewDetailsItem, setViewDetailsItem] = useState<Task>({});
  const [tasks, setTasks] = useState<Task[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Fade animation for task items
  const startFadeAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const addTask = () => {
    if (task.trim()) {
      const newTask: Task = {id: Math.random().toString(), name: task};
      setTasks(prevTasks => [...prevTasks, newTask]);
      setTask('');
      setIsModalVisible(false);
      startFadeAnimation();
    }
  };

  const openViewDetails = (item: any) => {
    setIsModalDetailsVisible(true);
    setViewDetailsItem(item);
  };

  const closeViewDetails = () => {
    setIsModalDetailsVisible(false);
    setViewDetailsItem({});
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
    <>
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
            {tasks.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
                style={styles.flatListStyle}
                data={tasks}
                keyExtractor={(item: any) => item.id}
                ListFooterComponent={() => <View style={{height: 140}} />}
                renderItem={({item, index}: any) => (
                  <Animated.View
                    style={[
                      styles.taskItemWrapper,
                      {
                        borderBottomColor:
                          index === tasks.length - 1
                            ? 'transparent'
                            : '#bbbbbb',
                      },
                      {opacity: fadeAnim},
                    ]}>
                    <TouchableOpacity onPress={() => openViewDetails(item)}>
                      <Text numberOfLines={1} style={styles.taskText}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteIconContainer}
                      onPress={() => deleteTask(item.id)}>
                      <Image style={styles.deleteIcon} source={deleteIcon} />
                    </TouchableOpacity>
                  </Animated.View>
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
      <CustomModal
        isModalVisible={isModalVisible}
        statusBarTranslucent
        style={{backgroundColor: 'transparent'}}>
        <KeyboardAvoidingView behavior={isAndroid ? 'height' : 'padding'}>
          <View style={styles.modalContentContainer}>
            <View>
              <Text style={styles.modalHeading}>New Task</Text>
            </View>
            <View>
              <TextInput
                textAlignVertical="top"
                keyboardType="default"
                maxLength={120}
                multiline
                style={styles.input}
                placeholderTextColor={'#aaa'}
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

      <CustomModal
        isModalVisible={isModalDetailsVisible}
        statusBarTranslucent
        style={{backgroundColor: 'transparent'}}>
        <View style={{...styles.modalContentContainer}}>
          <View style={styles.modalContent}>
            <View>
              <Text style={styles.modalHeading}>Task Details</Text>
            </View>
            <View style={styles.viewDetailsContainer}>
              <Text style={styles.viewDetailsText}>
                {viewDetailsItem?.name}
              </Text>
            </View>

            <View
              style={{...styles.addButtonWrapper, justifyContent: 'center'}}>
              <TouchableOpacity
                style={styles.addBtnContainer}
                onPress={closeViewDetails}>
                <Text style={styles.addBtnText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomModal>
    </>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: fontScale(26),
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
  },
  modalContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
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
    width: 70,
    height: 70,
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
  viewDetailsContainer: {
    minHeight : 100,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    padding: 16,
  },
  viewDetailsText: {
    fontSize: fontScale(18),

    color: '#444',
    marginBottom: 6,
  },
  floatButtonText: {
    fontSize: fontScale(48),
    textAlign: 'center',
    alignSelf: 'center',
    color: '#ffffff',
    marginTop: -6,
  },
  flatListContent: {},
  modalContentContainer: {
    backgroundColor: 'white',
    height: 250,
    width: '100%',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    alignSelf: 'center',
  },
  modalHeading: {
    fontSize: fontScale(22),
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 10,
  },
  taskItemWrapper: {
    backgroundColor: 'lighgrey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: 1,
  },
  taskText: {
    padding: 20,
    fontSize: fontScale(18),
    color: colors.dark,
    fontWeight: '500',
    backgroundColor: '#f1f1f1',
    width: Dimensions.get('screen').width - 60,
  },
  deleteIconContainer: {
    height: 64,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightblue,
  },
  deleteIcon: {
    height: 25,
    width: 25,
    tintColor: '#fff',
  },
  flatListStyle: {
    flexDirection: 'column',
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
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
  },
  addBtnContainer: {
    backgroundColor: colors.primary,
    width: 110,
    alignItems: 'center',
    padding: 8,
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
    color: '#fff',
  },
  input: {
    fontSize: fontScale(16),
    paddingHorizontal: 15,
    height: 100,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#f1f1f1',
    color: '#444',
    // borderWidth: 1,
    marginVertical: 4,
  },
});

export default App;
