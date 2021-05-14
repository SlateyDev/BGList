import React from 'react';
import {LoginDefinition} from '../interface/loginDefinition';

const initialLogin: LoginDefinition = {
  loggedIn: 0,
  username: '',
};

type LoginContextProps = {
  login?: LoginDefinition;
  checkLogin?: () => void;
  doLogin?: (username: string, password: string) => void;
  doLogout?: () => void;
};

export const LoginContext = React.createContext<LoginContextProps>({});

export const LoginProvider: React.FC = ({children}) => {
  const [login, setLogin] = React.useState<LoginDefinition>(initialLogin);

  const checkLogin = async () => {
    try {
      setLogin({loggedIn: 0, username: ''});
      const response = await fetch(
        'https://boardgamegeek.com/api/accounts/current',
        {
          method: 'GET',
        },
      );

      console.log(response);
      if (response.status === 200) {
        const loggedInDetails = await response.json();
        console.log(loggedInDetails);
        setLogin({loggedIn: 1, username: loggedInDetails.username});
      } else {
        setLogin({loggedIn: -1, username: ''});
      }
    } catch (error) {
      console.error(error);
      setLogin({loggedIn: -1, username: ''});
    }
  };

  const doLogin = async (username: string, password: string) => {
    try {
      const response = await fetch('https://boardgamegeek.com/login/api/v1', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          credentials: {username: username, password: password},
        }),
      });

      console.log(response.headers);
      checkLogin();
    } catch (error) {
      console.error(error);
    }
  };

  const doLogout = async () => {
    try {
      await fetch('https://boardgamegeek.com/logout', {
        method: 'GET',
      });

      checkLogin();
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
