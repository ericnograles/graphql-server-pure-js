export const RECEIVE_PROFILE = 'USER:RECEIVE_PROFILE';

export function receive(profile) {
  return (dispatch, store) => {
    dispatch({
      type: RECEIVE_PROFILE,
      data: {
        ...profile
      }
    });
  };
}
