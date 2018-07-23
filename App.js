import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AsyncStorage } from 'react-native';

import {
  feathersClient,
  AuthByJWT,
  AuthByPassword,
  UserService,
  // TeacherService,
  CourseAdService,
} from './src/services';

import {
  phoneSignUp,
  // verifyPhone,
  teacherSignUpByPhone,
  // getUser,
  // modifyUser,
  // getTeacherProfile,
  modifyTeacherProfile,
  createCourseAd,
  // getCourseAd,
  // modifyCourseAd,
  findCourseAds,
} from './src/controllers';

export default class App extends React.Component {
  state = {
    name: '',
    phoneNumber: '',
    countryCode: '852',
    phone: '85296344902',
    password: '1234',
    profile: {},
  };

  async componentDidMount() {
    try {
      // login
      // const login = await AuthByPassword('85296344902', '1234', 'teacher');
      // this.setState({
      //   profile: login.profile,
      // });
      // console.log('login', login.profile);

      const response = await AuthByJWT();
      this.setState({
        profile: response.profile,
      });

      const ad = await createCourseAd({
        title: 'Chinese Class',
        fee: 319,
        duration: 60,
      });
      console.log('new course ad created', ad);
      // console.log('authenticated', response);
    } catch (err) {
      console.log('authentication error', err);
    }

    feathersClient.on('reauthentication-error', async err => {
      console.log('reauthentication-error', err);
      try {
        const response = await AuthByJWT();
        this.setState({
          profile: response.profile,
        });
        console.log('re-authenticated', response);
      } catch (err) {
        console.log('authentication error', err);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.profile ? this.state.profile._id : null}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
