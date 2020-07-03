import React, {
  useState,
  useEffect,
  useContext,
  createContext
} from 'react';
import axios from 'axios';

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider
    value={auth}>
      { children }
  </authContext.Provider>
};

export const useAuth = () => {
  return useContext(authContext);
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  // Sign in
  const signIn = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await axios.post('/api/v1/account/login',
        formData,
        config);

      localStorage.setItem('userToken', response.data.userToken);
      
      const loggedUser = getUser();
      
      console.log(loggedUser);
      setUser(loggedUser);

    } catch (error) {
      console.log(error);
    }
  }

  // Sign out
  const signOut = () => {
    localStorage.removeItem('userToken');
    setUser(null);
  }

  // Sign up
  const signUp = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await axios.post('/api/v1/account/signup',
        formData,
        config);

      localStorage.setItem('userToken', response.data.userToken);
      
      const loggedUser = getUser();
      
      console.log(loggedUser);
      setUser(loggedUser);

    } catch (error) {
      console.log(error);
    }
  }

  // Get user
  const getUser = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    };

    try {
      const response = await axios.get('/api/v1/account/user', config);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }

  // Reset password


  useEffect(() => {
    // Check of user changes 
    // e.g. sign in and/or sign out
    // for this call get user and it will determine
    // if valid depending on the token in the header.


  }, [])

  return {
    user,
    signIn,
    signUp
  }
}
