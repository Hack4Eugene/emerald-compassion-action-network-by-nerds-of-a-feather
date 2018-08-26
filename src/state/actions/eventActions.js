import _ from 'lodash';

import { HttpClient, loadEndpoint } from '../../lib/common';
import {
    ADD_EVENT_REJECTED, ADD_EVENT_RESOLVED,
    DELETE_EVENT_REJECTED,
    DELETE_EVENT_RESOLVED,
    GET_EVENTS_REJECTED,
    GET_EVENTS_RESOLVED, INCREMENT_EVENT_FINISH, SET_EVENTS_FINISHED,
    GET_EVENT_RESOLVED, GET_EVENT_REJECTED,
    UPDATE_EVENT_RESOLVED, UPDATE_EVENT_REJECTED
} from '../types';

import { serviceRoutes } from '../../config/routes';

const { GET_EVENTS, POST_EVENT, DELETE_EVENT, GET_EVENT_BY_ID, UPDATE_EVENT } = serviceRoutes;

export const getEvents = () => {
    return (dispatch, getState) => {
        HttpClient(getState(), dispatch)
            .then(client => client.get(loadEndpoint(_.get(getState(), 'env'), GET_EVENTS)))
            .then(result => dispatch({ type: GET_EVENTS_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_EVENTS_REJECTED, payload: err }));
    };
};

export const createEvent = (event) => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.post(
            loadEndpoint(_.get(getState(), 'env'), POST_EVENT), event
            ))
            .then(result => {
                dispatch({ type: ADD_EVENT_RESOLVED, payload: result });
            })
            .catch(err => dispatch({ type: ADD_EVENT_REJECTED, error: err }));
    };
};

export const deleteEvent = eventID => {
    return (dispatch, getState) => {
        HttpClient(getState()).then(client => client.delete(`${loadEndpoint(_.get(getState(), 'env'), DELETE_EVENT)}/${eventID}`))
            .then(result => dispatch({ type: DELETE_EVENT_RESOLVED }))
            .then(() => dispatch(getEvents()))
            .catch(err => dispatch({ type: DELETE_EVENT_REJECTED, payload: err }));
    };
};

export const setEventsFinished = (val) => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_EVENTS_FINISHED,
            payload: val
        });
    };
};

export const incrementEventsFinished = () => {
    return (dispatch, getState) => {
        const currentVal = _.get(getState(), 'events.animationVal', null);
        const targetVal = _.get(getState(), 'events.numFinishedEvents', null);
        if (currentVal < targetVal) {
            dispatch({
                type: INCREMENT_EVENT_FINISH,
                payload: currentVal + 1
            });
        }
    };
};

export const getEventById = (eventId) => {
    return (dispatch, getState) => {
        HttpClient(getState(), dispatch)
            .then(client => client.get(loadEndpoint(_.get(getState(), 'env'), `${GET_EVENT_BY_ID}/${eventId}`)))
            .then(result => dispatch({ type: GET_EVENT_RESOLVED, payload: result }))
            .catch(err => dispatch({ type: GET_EVENT_REJECTED, payload: err  }))

    }
};

export const updateEvent = (eventId, updateObj) => (dispatch, getState) => {
    const url = `${loadEndpoint(_.get(getState(), 'env'), `${UPDATE_EVENT}/${eventId}`)}`;

    HttpClient(getState())
        .then(client => client.post(url, updateObj))
        .then(result => {
            dispatch({ type: UPDATE_EVENT_RESOLVED })
            dispatch(getEvents())
        })
        .catch(err => dispatch({ type: UPDATE_EVENT_REJECTED, payload: err  }))    
}