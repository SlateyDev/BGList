import React, {useContext, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {LoginContext} from '../context/loginContext';
import {LoginNavigationProps} from '../interface/navigationProps';

export const Login = ({navigation}: LoginNavigationProps) => {
  const {doLogin} = useContext(LoginContext);
  const [textUsername, onChangeTextUsername] = useState('');
  const [textPassword, onChangeTextPassword] = useState('');

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View>
        <Text style={styles.loginLabel}>Username: </Text>
        <TextInput
          style={styles.loginTextBox}
          onChangeText={onChangeTextUsername}
          value={textUsername}
          autoCompleteType="username"
        />
        <Text style={styles.loginLabel}>Password: </Text>
        <TextInput
          style={styles.loginTextBox}
          onChangeText={onChangeTextPassword}
          value={textPassword}
          autoCompleteType="password"
          secureTextEntry
          textContentType="password"
        />
        <Button
          title="Login"
          onPress={() => {
            doLogin(textUsername, textPassword);
            navigation.goBack();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginLabel: {
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
  },
  loginTextBox: {
    backgroundColor: Colors.light,
    width: '80%',
    alignSelf: 'center',
    height: 32,
    padding: 3,
  },
});
