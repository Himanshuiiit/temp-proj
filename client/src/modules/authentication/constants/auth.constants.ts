import { type AuthState } from '../interfaces';

export const AUTH_INITIAL_STATE: AuthState = localStorage.getItem('user')
  ? {
      user: JSON.parse(localStorage.getItem('user')!),
      loggedIn: true
    }
  : {
      user: {
        id: '',
        email: '',
        name: '',
        ownedApps: []
      },
      loggedIn: false
    };
