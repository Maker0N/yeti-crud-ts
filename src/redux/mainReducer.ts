import { StateType, ActionTypes, constActionTypes } from '../types/types'

const initialState: StateType = {
  base: [],
  currentCaseId: null,
  findArr: []
}

const mainReducer = (state = initialState, action: ActionTypes): StateType => {
  switch (action.type) {
    case constActionTypes.ADD_CASE:
      return (state = {
        ...state,
        base: [
          ...state.base,
          {
            id: !state.base.length
              ? 1
              : state.base[state.base.length - 1].id + 1,
            date: action.payload.date,
            name: action.payload.name,
            driverName: action.payload.driverName,
            phone: action.payload.phone,
            comments: action.payload.comments,
            ati: action.payload.ati,
          },
        ],
        currentCaseId: action.payload.id,
      });

    case constActionTypes.CURRENT_CASE_ID:
      return (state = {
        ...state,
        currentCaseId: action.payload,
      });

    case constActionTypes.DELETE_CASE:
      return (state = {
        ...state,
        base: state.base.filter((it) => it.id !== action.payload),
      });

    case constActionTypes.EDIT_CASE:
      return (state = {
        ...state,
        base: state.base.map((it) => {
          return it.id === action.payload.id
            ? (it = {
                ...it,
                name: action.payload.name,
                driverName: action.payload.driverName,
                phone: action.payload.phone,
                comments: action.payload.comments,
                ati: action.payload.ati,
              })
            : it;
        }),
        currentCaseId: action.payload.id,
      });

    case constActionTypes.FIND_CASE:
      return (state = {
        ...state,
        findArr: state.base.filter((it) => {
          return (
            +String(it.id).includes(action.payload) ||
            it.date.includes(action.payload) ||
            it.name.toLowerCase().includes(action.payload) ||
            it.driverName.toLowerCase().includes(action.payload) ||
            it.phone.includes(action.payload) ||
            it.comments.toLowerCase().includes(action.payload) ||
            it.ati.includes(action.payload)
          );
        }),
      });

    default:
      return state;
  }
}

export function addCase(payload: {}) {
  return { type: constActionTypes.ADD_CASE, payload };
}

export function currentCaseId(payload: number | string) {
  return { type: constActionTypes.CURRENT_CASE_ID, payload };
}

export function deleteCase(payload: number) {
  return { type: constActionTypes.DELETE_CASE, payload}
}

export function editCase(payload: {}) {
  return { type: constActionTypes.EDIT_CASE, payload}
}

export function findCase(payload: string) {
  return { type: constActionTypes.FIND_CASE, payload };
}

export default mainReducer