import feathersClient from './feathersSocketClient';
import { AsyncStorage } from 'react-native';

const AuthByJWT = async () => {
  return feathersClient.authenticate({
    strategy: 'jwt',
    accessToken: await AsyncStorage.getItem('learnla'),
    platform: 'teacher',
  });
};

const AuthByPassword = async (phone, password, platform) => {
  return feathersClient.authenticate({
    strategy: 'local',
    phone,
    password,
    platform,
  });
};

const UserService = feathersClient.service('users');
const TeacherService = feathersClient.service('teachers');
const CourseAdService = feathersClient.service('course-ads');

export {
  feathersClient,
  AuthByJWT,
  AuthByPassword,
  UserService,
  TeacherService,
  CourseAdService,
};
