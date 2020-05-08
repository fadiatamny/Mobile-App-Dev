import { INSERT_TASK } from '../types';

export const insertTask = () => (dispatch: any) => {
  console.log('im here');
  dispatch({
    type: INSERT_TASK,
    payload: ['task1', 'task2'],
  });
};
