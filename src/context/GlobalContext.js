import { createContext, useContext, useReducer } from 'react';

export const GlobalStateContext = createContext();
export const GlobalDispatchContext = createContext();

const initialState = {
  users: [],
  currentUser: {},
  isPopupOpened: false,
  isInfoPopupOpened: false,
  tableFilter: {
    tracked: false,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };

    case 'SET_IS_POPUP_OPENED':
      return {
        ...state,
        isPopupOpened: action.payload,
      };

    case 'SET_IS_MESSAGE_POPUP_OPENED':
      return {
        ...state,
        isInfoPopupOpened: action.payload,
      };

    case 'CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      };

    case 'UPDATE_USER':
      const userArrayIndex = action.payload.indexArray;
      const users = state.users;
      const userUpdates = action.payload;
      users.splice(userArrayIndex, 1, userUpdates);
      return {
        ...state,
        currentUser: users,
      };

    case 'FILTER_TRACKED':
      const filter = {
        tracked: action.payload,
      };

      return {
        ...state,
        tableFilter: filter,
      };

    default:
      throw new Error(`No such action type as ${action.type}!`);
  }
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

//  -- hooks block--
export function useFilterTrackedCTX() {
  const dispatch = useGlobalDispatchCTX();

  return [
    isTracked =>
      dispatch({
        type: 'FILTER_TRACKED',
        payload: isTracked,
      }),
  ];
}

export function useUpdateUserCTX() {
  const dispatch = useGlobalDispatchCTX();

  return [
    user =>
      dispatch({
        type: 'UPDATE_USER',
        payload: user,
      }),
  ];
}

export function useCurrentUserCTX() {
  const dispatch = useGlobalDispatchCTX();
  const { currentUser } = useContext(GlobalStateContext);

  return [
    currentUser,
    user =>
      dispatch({
        type: 'CURRENT_USER',
        payload: user,
      }),
  ];
}

export function useSetUsersCTX() {
  const dispatch = useGlobalDispatchCTX();
  const { users } = useContext(GlobalStateContext);

  return [
    users,
    usersArray =>
      dispatch({
        type: 'SET_USERS',
        payload: usersArray,
      }),
  ];
}

export function useIsPopupOpenedCTX() {
  const dispatch = useGlobalDispatchCTX();
  const { isPopupOpened } = useContext(GlobalStateContext);

  return [
    isPopupOpened,
    isOpened =>
      dispatch({
        type: 'SET_IS_POPUP_OPENED',
        payload: isOpened,
      }),
  ];
}

export function useIsMessagePopupOpenedCTX() {
  const dispatch = useGlobalDispatchCTX();
  const { isInfoPopupOpened } = useContext(GlobalStateContext);

  return [
    isInfoPopupOpened,
    isOpened =>
      dispatch({
        type: 'SET_IS_MESSAGE_POPUP_OPENED',
        payload: isOpened,
      }),
  ];
}

export function useGlobalStateCTX() {
  const state = useContext(GlobalStateContext);

  if (!state) {
    throw Error('useGlobalState must be used within GlobalContextProvider');
  }

  return state;
}

export function useGlobalDispatchCTX() {
  const dispatch = useContext(GlobalDispatchContext);

  if (!dispatch) {
    throw Error('useGlobalDispatch must be used within GlobalContextProvider');
  }

  return dispatch;
}
