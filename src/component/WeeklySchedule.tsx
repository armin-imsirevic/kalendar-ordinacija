import React from 'react';
import { APPOINTMENT_TIMES, DAYS } from '../constants';
import { Appointment } from './Appointment';
import { IAppointment } from '../state/interface';

export class WeeklySchedule extends React.Component<{daysArray: any[], appointments: IAppointment[], saveAppointment: any, editAppointment: any}> {

    render() {
        const {
            daysArray,
            saveAppointment,
            appointments,
            editAppointment,
        } = this.props;

        return (
            <div className='appointments'>
                {
                    daysArray.map((d, i) => {
                        const date = new Date(new Date().setDate(new Date().getDate() + i + 1));
                        const isEven = date.getDate() % 2 === 0;
                        const isSunday = date.getDay() === 0;
                        const isSaturday = date.getDay() === 6;
                        return (
                            <div key={i} className='day'>
                                <div className='day-text'>{DAYS[date.getDay()]} - {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</div>
                                {
                                    APPOINTMENT_TIMES.filter((at) => at.even === isEven).map((at, i) => {
                                        return (
                                            <Appointment
                                                appointments={appointments}
                                                required
                                                date={date}
                                                appointmentTime={at}
                                                closed={isSunday || (!isEven && isSaturday)}
                                                isEven={isEven}
                                                saveAppointment={saveAppointment}
                                                editAppointment={editAppointment}
                                                key={i}
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