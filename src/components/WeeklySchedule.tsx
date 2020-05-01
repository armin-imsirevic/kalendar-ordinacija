import React from 'react';
import { APPOINTMENT_TIMES } from '../constants';
import { Appointment } from './Appointment';
import { IAppointment, IDay, INotificationData } from '../interfaces';

interface IWeeklySchedule {
    days: IDay[],
    appointments: IAppointment[],
    selectAppointment: (appointment: IAppointment) => void,
    deselectAppointment: (appointment: IAppointment) => void,
    setNotificationData: (notificationData: INotificationData) => void,
}

export class WeeklySchedule extends React.Component<IWeeklySchedule> {

    render() {
        const {
            days,
            selectAppointment,
            deselectAppointment,
            appointments,
            setNotificationData,
        } = this.props;

        return (
            <div className='appointments'>
                {
                    days.map((day, i) => {
                        return (
                            <div key={i} className='day'>
                                <div className='day-text'>{day.name} - {day.date.getDate()}/{day.date.getMonth() + 1}/{day.date.getFullYear()}</div>
                                {
                                    APPOINTMENT_TIMES.filter((at) => at.even === day.even).map((at, i) => {
                                        return (
                                            <Appointment
                                                appointments={appointments}
                                                appointmentTime={at}
                                                day={day}
                                                selectAppointment={selectAppointment}
                                                deselectAppointment={deselectAppointment}
                                                key={i}
                                                setNotificationData={setNotificationData}
                                            />
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}