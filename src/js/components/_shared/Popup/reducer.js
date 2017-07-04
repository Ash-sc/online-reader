import { POPUP_OPEN,
         POPUP_CLOSE } from 'constants/sharedConstants';

// Initial state
export const initialState = {
  isOpen: false,
  content: null,
};


// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case POPUP_OPEN: {
      return { ...state,
        ...{ isOpen: true,
          content: action.content,
          cssClass: action.cssClass } };
    }
    case POPUP_CLOSE:
      return { ...state,
        ...{ isOpen: false,
          content: action.content } };
    default: {
      return state;
    }
  }
}
