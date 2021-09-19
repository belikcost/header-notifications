import { READ_ALL_EVENTS, REMOVE_ALL_EVENTS, SEND_EVENT } from "../constants";


const initialState = {
    events: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_EVENT:
            return {...state, events: [...state.events, action.payload]};
        case READ_ALL_EVENTS:
            return {...state, events: state.events.map(event => ({...event, read: true}))};
        case REMOVE_ALL_EVENTS:
            return {...state, events: []}
        default:
            return state;
    }
}