import store from "../reducers";


export const dispatchAction = (event) => {
    const action = {
        type: event.target.dataset.action,
        payload: event.target.dataset.payload,
    };

    if (action.type) {
        store.dispatch(action);
    }
};