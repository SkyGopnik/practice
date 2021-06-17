import {
  SYNC_USER
} from './actions';

export interface UserInterface {
  id?: number
  login: string
  password: string
  token: string
  agentId?: number
  questionnaire: UserQuestionnaireInterface
}

export interface UserQuestionnaireInterface {
  id?: string,
  firstName: string
  lastName: string
  age: number
  sex: 0 | 1 | 2 // 0 - неопр, 1 - женский, 2 - мужской
  phone: string
  about: string
  isArchive: boolean
}

const defaultState = {
  data: null
};

export const userReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
  case SYNC_USER:
    console.log(payload)
    return {
      ...state,
      data: {
        ...payload
      }
    };

  default:
    break;
  }

  return state;
};
