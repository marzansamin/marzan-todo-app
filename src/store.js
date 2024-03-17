import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const store = set => ({
  loader: true, // which we will show during the time of checking the auth status
  isLoggedIn: false, // from there we will decide on which UI the user should be on, this is false because we'll assume at first that the user is unauthenticated
  setLoginStatus: status => 
    set({
      isLoggedIn: status,
      loader: false,
  }, false, "setLoginStatus"),
});

const useStore = create(devtools(store)); //this is a hook which will help us to navigate the user to their own todo pages

export default useStore;