import React from 'react';

import classNames from 'classnames';
import { INotificationData } from '../interfaces';
import { getDayFromString } from '../helpers';


interface NotificationProps {
    notificationData: INotificationData;
    setNotificationData: (data: INotificationData) => void;
}

export class Notification extends React.Component<NotificationProps> {

    render() {
        const {
            notificationData,
            setNotificationData,
        } = this.props;
        const {
            isError,
            message,
            appointments,
        } = notificationData;
        return (
            <>
                <div className='overlay'></div>
                <div className={classNames('notification', isError ? 'notification-error' : 'notification-success')}>
                    <div>{message}</div>
                    {!isError && <ul>{
                        appointments.map((a, i) => <li key={i}>{getDayFromString(a.dateStr)} at {a.time}</li>)
                    }</ul>}
                    <button
                        className={classNames('notification-button')}
                        onClick={() => setNotificationData(null)}
                    >
                        OK
                    </button>
                </div>
            </>
        );
    }
}