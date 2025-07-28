import { createContext } from 'react';

export const UserContext = createContext({
  user: null,         // { name, email, password }
  setUser: () => {}   // function to update user
});
