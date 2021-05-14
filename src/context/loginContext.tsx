import React from 'react';
import {LoginDefinition} from '../interface/loginDefinition';
import {bggCheckLogin, bggLogout, bggLogin} from '../service/bggApi';

const initialLogin: LoginDefinition = {
  loggedIn: 0,
  username: '',
};

type LoginContextProps = {
  login: LoginDefinition;
  checkLogin: () => void;
  doLogin: (username: string, password: string) => void;
  doLogout: () => void;
};

export const LoginContext = React.createContext<LoginContextProps>({
  login: initialLogin,
  checkLogin: () => {},
  doLogin: () => {},
  doLogout: () => {},
});

export const LoginProvider: React.FC = ({children}) => {
  const [login, setLogin] = React.useState<LoginDefinition>(initialLogin);

  const checkLogin = async () => {
    setLogin({loggedIn: 0, username: ''});
    const response = await bggCheckLogin();

    if (response !== undefined) {
      setLogin({loggedIn: 1, username: response});
    } else {
      setLogin({loggedIn: -1, username: ''});
    }
  };

  const doLogin = async (username: string, password: string) => {
    try {
      await bggLogin(username, password);
      await checkLogin();
    } catch (error) {
      console.error(error);
    }
  };

  const doLogout = async () => {
    try {
      await bggLogout();
      await checkLogin();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginContext.Provider value={{login, doLogin, doLogout, checkLogin}}>
      {children}
    </LoginContext.Provider>
  );
};
