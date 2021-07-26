export type CaseType = {
  id: number;
  date: string;
  name: string;
  driverName: string;
  phone: string;
  comments: string;
  ati: string;
};

export type StateType = {
  base: Array<CaseType> | [];
  currentCaseId: number | null;
  findArr: Array<CaseType> | [];
};

export enum constActionTypes {
  ADD_CASE = "ADD_CASE",
  CURRENT_CASE_ID = "CURRENT_CASE_ID",
  DELETE_CASE = "DELETE_CASE",
  EDIT_CASE = "EDIT_CASE",
  FIND_CASE = "FIND_CASE",
}

interface addCaseAction {
  type: constActionTypes.ADD_CASE;
  payload: CaseType
}

interface carrentCaseIdAction {
  type: constActionTypes.CURRENT_CASE_ID;
  payload: number;
}

interface deleteCaseAction {
  type: constActionTypes.DELETE_CASE;
  payload: number;
}

interface editCaseAction {
  type: constActionTypes.EDIT_CASE;
  payload: CaseType
}

interface findCaseAction {
  type: constActionTypes.FIND_CASE;
  payload: string;
}

export type ActionTypes =
  | addCaseAction
  | carrentCaseIdAction
  | deleteCaseAction
  | editCaseAction
  | findCaseAction;
