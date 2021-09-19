import { useState } from "react";
import { connect } from "react-redux";

import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

import { readAllEvents, removeAllEvents, sendEvent } from "../redux/actions";

import './App.css';


const App = ({events, onSendEvent, onReadAllEvents, onRemoveAllEvents}) => {
    const initialEvent = {
        date: null,
        name: '',
        read: false,
    };
    const [eventToRequest, setEventToRequest] = useState(initialEvent);
    const [showPopup, setShowPopup] = useState(false);

    const getNoReadEvents = (events) => events.filter(event => !event.read);

    const onClick = () => {
        onSendEvent({...eventToRequest, date: new Date()});
        setEventToRequest(initialEvent);
    };

    const handlePopup = () => setShowPopup(!showPopup);

    return (
        <>
            <header className="header">
                <div className="header__notifications" onClick={handlePopup} role="notifications">
                    &#9993;
                    <span role="noReadEvents">{getNoReadEvents(events).length}</span>
                    {showPopup && (
                        <div className="popup">
                            {getNoReadEvents(events).length !== 0 ? getNoReadEvents(events).slice(0, 5).map((event, i) => (
                                <div className="event" key={i}>
                                    <h5>{event.name}</h5>
                                    <p>{formatDistance(event.date, new Date(), {locale: ru})} назад</p>
                                </div>
                            )) : (
                                <p>А здесь пусто :)</p>
                            )}
                        </div>
                    )}
                </div>
            </header>
            <div className="label">
                <input
                    value={eventToRequest.name}
                    onChange={(e) => setEventToRequest({...eventToRequest, name: e.target.value})}
                    type="text"
                    placeholder="Введите название события"
                />
                <button onClick={onClick}>Отправить</button>
            </div>
            <button onClick={onReadAllEvents}>Пометить все события прочитанными</button>
            <button onClick={onRemoveAllEvents}>Удалить все события</button>
            <button onClick={handlePopup}>Скрыть/показать попап нотификаций</button>
        </>
    );
}

const mapStateToProps = (state) => ({
    events: state.events,
});

const mapDispatchToProps = (dispatch) => ({
    onSendEvent: (event) => dispatch(sendEvent(event)),
    onReadAllEvents: () => dispatch(readAllEvents()),
    onRemoveAllEvents: () => dispatch(removeAllEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
