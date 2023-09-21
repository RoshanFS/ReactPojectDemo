import { REDUX_ACTION_API_CALL, REDUX_ACTION_SET_PEOPLE, REDUX_ACTION_PAGINATION_LOADING, SET_CONTACTS_PAGINATION } from './ReduxActionTypes';
import AxiosService from 'axios';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4';
const API_URL = 'https://api.dev.pastorsline.com/api/contacts.json'

AxiosService.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const GetDataRedux = (params, pagination) => {
    return async (dispatch, getState) => {
        if (pagination) {
            let state = getState();
            dispatch({ type: REDUX_ACTION_PAGINATION_LOADING, payload: true });
            let data = await GetData(params);
            data = {
                ...data,
                contacts: { ...state.Contacts.contacts, ...data?.contacts },
                ContactsIdsState: [...state.Contacts.ContactsIdsState, ...data?.ContactsIdsState],
            }
            dispatch({ type: SET_CONTACTS_PAGINATION, payload: { ...data, page: params.page } });
        } else {
            dispatch({ type: REDUX_ACTION_API_CALL, payload: true });
            let data = await GetData(params);
            dispatch({ type: REDUX_ACTION_SET_PEOPLE, payload: { ...data, page: 1 } });
        }
    }
}

export const clearContacts = () => {
    return async (dispatch) => {
        dispatch({ type: REDUX_ACTION_SET_PEOPLE, payload: null });
    }
}

const GetData = async function (params) {
    try {

        let response = await AxiosService.get(API_URL, {
            params: params,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4',
            }
        });
        return response.data;
    } catch (error) {
        console.log("error : ", error)
        return null
    }
}