const IS_LOGIN = 'IS_LOGIN'

type AuthType = {
  isLogin: boolean;
};

const initialState: AuthType = {
  isLogin: false,
};

if (!localStorage.getItem('auth'))
localStorage.setItem('auth', JSON.stringify(initialState))

const stringAuth: any = localStorage.getItem('auth')
const localAuth: AuthType = JSON.parse(stringAuth)

type ActionType = {
  type: typeof IS_LOGIN, payload: boolean
}

const authReducer = (state = localAuth, action: ActionType): AuthType => {
  switch (action.type) {

    case IS_LOGIN:
      return state = {...state, isLogin: action.payload}
    default:
      return state;
  }
};

export function isLogin(payload: boolean) {
  return { type: IS_LOGIN, payload };
}

export default authReducer;
