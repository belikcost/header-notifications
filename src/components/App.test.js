import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from "react-redux";

import store from "../redux/store";

import App from './App';

const AppWithProvider = (
    <Provider store={store}>
        <App/>
    </Provider>
);

test('send event', () => {
    render(AppWithProvider);
    expect(screen.getByRole('noReadEvents')).toHaveTextContent('0');

    fireEvent.click(screen.getByText('Отправить'));
    expect(screen.getByRole('noReadEvents')).toHaveTextContent('1');
});

test('read all events', () => {
    render(AppWithProvider);
    fireEvent.click(screen.getByText('Отправить'));
    expect(screen.getByRole('noReadEvents')).toHaveTextContent('1');

    fireEvent.click(screen.getByText('Пометить все события прочитанными'));
    expect(screen.getByRole('noReadEvents')).toHaveTextContent('0');
});

test('remove all events', () => {
    render(AppWithProvider);
    fireEvent.click(screen.getByText('Отправить'));
    expect(screen.getByRole('noReadEvents')).toHaveTextContent('1');

    fireEvent.click(screen.getByText('Удалить все события'));
    expect(screen.getByRole('noReadEvents')).toHaveTextContent('0');
});

test('show / hide popup', () => {
    render(AppWithProvider);
    const showOrHideButton = screen.getByText('Скрыть/показать попап нотификаций');

    fireEvent.click(showOrHideButton);
    expect(screen.getByRole('notifications')).toHaveTextContent('А здесь пусто :)');

    fireEvent.click(showOrHideButton);
    expect(screen.getByRole('notifications')).not.toHaveTextContent('А здесь пусто :)');
});
