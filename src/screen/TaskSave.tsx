import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeAreaContainer from '../components/SafeAreaContainer';
import colors from '../assets/colors';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {Task, useTasks} from '../context/TaskContext';

const TaskSave = ({route, navigation}) => {
  const {tasks, setTasks} = useTasks();
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [formatDate, setFormatDate] = useState<string>('');
  const [formData, setFormData] = useState<Task>({
    description: undefined,
    title: undefined,
    date: undefined,
  });

  const title = route?.params?.title ?? '';
  const tasksLength = route?.params?.tasksLength ?? '';
  const editTask = route?.params?.data ?? '';

  useEffect(() => {
    navigation.setOptions({title: title});
  }, []);

  useEffect(() => {
    if (editTask) {
      setFormData(editTask);
    }
  }, [editTask]);

  useEffect(() => {
    if (date) {
      setFormData(prevData => ({
        ...prevData,
        date: moment(date).toISOString(),
      }));
      setFormatDate(moment(date).format('ddd DD, MMMM YYYY'));
    }
  }, [date]);

  const onBack = () => {
    if (formData.title && formData.description && formData.date) {
      navigation.navigate('TaskList', {
        newTask: {id: tasksLength + 1, ...formData},
      });
    } else {
      navigation.navigate('TaskList');
    }
  };

  const onSave = () => {
    if (!formData.description || !formData.title) {
      Alert.alert('Please fill all data.');
      return false;
    } else {
      let updateTasks = [];
      if (editTask) {
        updateTasks = tasks.map(obj =>
          obj.id === editTask?.id ? {...obj, ...formData} : obj,
        );
      } else {
        updateTasks = [...tasks, {...formData, id: tasks.length + 1}];
      }
      setTasks(updateTasks);
      navigation.navigate('TaskList');
    }
  };

  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              onChangeText={txt =>
                setFormData(prevData => ({...prevData, title: txt}))
              }
              placeholder="e.g Grab a coffee."
              placeholderTextColor={'#bbbbbb'}
              value={formData.title}
              style={styles.input}
            />
          </View>
          <View style={[styles.formControl, styles.description]}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              textAlignVertical="top"
              onChangeText={txt =>
                setFormData(prevData => ({...prevData, description: txt}))
              }
              placeholder="e.g grab a coffee and leave for office."
              placeholderTextColor={'#bbbbbb'}
              value={formData.description}
              maxLength={500}
              multiline
              verticalAlign="top"
              style={styles.input}
            />
            <Text style={styles.charCount}>{`${
              formData.description
                ? 500 - formData.description.length + ' characters left.'
                : ''
            }`}</Text>
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Task Date</Text>
            <TouchableOpacity
              onPress={() => {
                setOpen(true);
              }}
              style={styles.input}>
              <Text style={{color : colors.dark}}>{formatDate || 'e.g 10 Jan 2020'}</Text>
            </TouchableOpacity>
            <DatePicker
              title={'Task Date'}
              modal
              open={open}
              mode="date"
              date={date}
              minimumDate={new Date()}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.formBtnContainer}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.btnBase, styles.secondaryBtn]}>
            <Text style={[styles.btnTitleBase, styles.btnTitleSecondary]}>
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSave}
            style={[styles.btnBase, styles.primaryBtn]}>
            <Text style={[styles.btnTitleBase, styles.btnTitlePrimary]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default TaskSave;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.white,
    padding: 16,
    paddingTop: 25,
  },
  formControl: {
    height: 45,
    marginBottom: '10%',
  },
  label: {
    color: colors.dark,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
    height: '100%',
    width: '100%',
    color: colors.dark,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 18,
  },
  charCount: {
    color: colors.dark,
    fontSize: 16,
    marginVertical: 6,
    textAlign: 'right',
  },
  formBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  btnBase: {
    height: 40,
    minWidth: 80,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
  },
  btnTitleBase: {
    textAlign: 'center',
    fontWeight: '500',
  },
  description: {
    height: 100,
    marginBottom: '16%',
  },
  primaryBtn: {
    backgroundColor: colors.primary,
  },
  btnTitlePrimary: {
    color: colors.white,
  },
  secondaryBtn: {
    backgroundColor: colors.lightgrey,
  },
  btnTitleSecondary: {
    color: colors.dark,
  },
});
