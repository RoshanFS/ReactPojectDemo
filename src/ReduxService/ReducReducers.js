import { REDUX_ACTION_API_CALL, REDUX_ACTION_SET_PEOPLE, SET_CONTACTS_PAGINATION, REDUX_ACTION_PAGINATION_LOADING } from './ReduxActionTypes';

const initialState = {
    APICall: false,
    APICallPagination: false,
    isLoading : true,
    Contacts: null
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX_ACTION_API_CALL:
            return { ...state, APICall: action.payload };
        case REDUX_ACTION_SET_PEOPLE:
            console.log("REDUX_ACTION_SET_PEOPLE : ",action.payload)

            return { ...state, Contacts: action.payload, APICall: false, isLoading : false };
        case REDUX_ACTION_PAGINATION_LOADING:
            return { ...state, APICallPagination: action.payload };
        case SET_CONTACTS_PAGINATION:
            console.log("SET_CONTACTS_PAGINATION : ",action.payload)
            return { ...state, Contacts: action.payload, APICallPagination: false };
        default:
            return state;
    }
}
export default reducer;