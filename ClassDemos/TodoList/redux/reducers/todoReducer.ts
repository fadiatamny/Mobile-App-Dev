import { INSERT_TASK } from '../types';

const initialState = {
  tasks: [],
};

export default (state = initialState, action: any) => {
  console.log('reducer!');
  console.log(action.type);
  switch (action.type) {
    case INSERT_TASK:
      console.log('reduced!');
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};
