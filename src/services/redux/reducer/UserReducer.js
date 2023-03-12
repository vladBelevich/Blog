const defaultState = {
  username: null,
  email: null,
  token: null,
  image: null,
  activeUser: false,
};

// eslint-disable-next-line default-param-last
const userReducer = (state = defaultState, action) => {
  const { username, email, token, image } = action;
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        username,
        email,
        token,
        activeUser: true,
      };
    case 'SET_USER_DATA_FROM_LOCAL':
      return {
        ...state,
        username,
        email,
        token,
        image,
        activeUser: true,
      };
    case 'CLEAR_USER_DATA':
      return {
        ...state,
        username: null,
        email: null,
        token: null,
        activeUser: false,
      };
    case 'EDIT_USER_DATA':
      return {
        ...state,
        username,
        email,
        token,
        image,
        activeUser: true,
      };
    default:
      return state;
  }
};

export default userReducer;
