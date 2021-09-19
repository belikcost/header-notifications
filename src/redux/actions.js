import { READ_ALL_EVENTS, REMOVE_ALL_EVENTS, SEND_EVENT } from "../constants";


export const sendEvent = (event) => ({type: SEND_EVENT, payload: event});
export const readAllEvents = () => ({type: READ_ALL_EVENTS});
export const removeAllEvents = () => ({type: REMOVE_ALL_EVENTS});