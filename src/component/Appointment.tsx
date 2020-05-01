import React from 'react';
import { IAppointmentTimes, DAYS } from '../constants';
import classNames from 'classnames';
import { IAppointment, AppointmentType, IDay, INotificationData } from './interface';
import { findAppointment, checkIfAppointmentTakenForDay, checkIfTwoAppointmentsTakenForWeek } from '../helpers';

interface IAppointmentProps {
    appointments: IAppointment[],
    appointmentTime: IAppointmentTimes,
    day: IDay,
    selectAppointment: (appointment: IAppointment) => void,
    deselectAppointment: (appointment: IAppointment) => void,
    setNotification: (notificationData: INotificationData) => void,
}

export class Appointment extends React.PureComponent<IAppointmentProps, {free: boolean, markedForReserve: boolean, existingAppointment: IAppointment}> {

    constructor(props: IAppointmentProps) {
        super(props);
        const {
            appointments,
            day,
            appointmentTime,
        } = props;

        const existingAppointment: IAppointment | any = findAppointment(appointments, {time: appointmentTime.time, dateStr: day.date.toDateString()});

        this.state = {
            free: !Boolean(existingAppointment) && !appointmentTime.isBreak && !day.isClosed,
            markedForReserve: false,
            existingAppointment,
        }
    }

    componentDidUpdate(prevProps) {
        const {
            appointments,
            day,
            appointmentTime,
        } = this.props;

        if (JSON.stringify(appointments) !== JSON.stringify(prevProps.appointments)) {
            const existingAppointment: IAppointment | any = findAppointment(appointments, {dateStr: day.date.toDateString(), time: appointmentTime.time})
            this.setState({
                existingAppointment
            });
        }
    }

    render() {
        const {
            appointmentTime,
            day,
        } = this.props;
        const {
            markedForReserve,
            existingAppointment,
        } = this.state;

        const {
            text,
            className,
        } = this.getAppointmentTextAndClassName(existingAppointment, appointmentTime.isBreak, day.isClosed, markedForReserve);

        return (
            <div className={classNames('appointment', className)} onClick={this.handleClick.bind(this)}>
                <div className='time'>{appointmentTime.time}</div>
                <div className='appointment-text'>{text}</div>
            </div>
        )
    }

    getAppointmentTextAndClassName = (existingAppointment, isBreak, isClosed, markedForReserve) =>
        existingAppointment && existingAppointment.type === AppointmentType.RESERVED ?
            {text: 'Reserved', className: 'appointment-reserved'}
            : isClosed ?
                {text: 'Closed', className: 'appointment-closed'}
                : isBreak ?
                    {text: 'Break', className: 'appointment-break'}
                    : markedForReserve ?
                        {text: 'To be reserved', className: 'appointment-reserve'}
                            : {text: 'Free', className: 'appointment-free'};

    handleClick() {
        const {
            selectAppointment,
            deselectAppointment,
            appointmentTime,
            appointments,
            setNotification,
            day,
        } = this.props;

        const {
            free,
            markedForReserve,
        } = this.state;

        const maxReservedForDay = checkIfAppointmentTakenForDay(appointments, day.date);
        const maxReservedForWeek = checkIfTwoAppointmentsTakenForWeek(appointments);

        if (maxReservedForWeek && free && !markedForReserve) {
            const reservedTime = appointments.map((a) => {
                if (a.type === AppointmentType.RESERVE) {
                    return `${DAYS[new Date(a.dateStr).getDay()]} ${a.time}`
                }
                return null;
            }).filter((a) => a != null).join(' or at ');
            setNotification({
                message: `You can only have two appointments per week! If you want to change appointments for this week, please deselect appointment at ${reservedTime}!`,
                isError: true,
                appointments: []
            });
        } else if (maxReservedForDay && free && !markedForReserve) {
            const alreadySelectedAppointment = appointments.find((a) => a.dateStr === day.date.toDateString() && a.type === AppointmentType.RESERVE);
            setNotification({
                message: `You already have selected appointment for ${day.name}! If you want to change an appointment for this day, please deselect appointment at ${alreadySelectedAppointment.time}!`,
                isError: true,
                appointments: []
            });
        } else if (free && !markedForReserve) {
            selectAppointment({dateStr: day.date.toDateString(), time: appointmentTime.time, type: AppointmentType.RESERVE} as IAppointment);
            setNotification(null);
            this.setState({markedForReserve: !markedForReserve});
        } else if (free && markedForReserve) {
            deselectAppointment({dateStr: day.date.toDateString(), time: appointmentTime.time, type: AppointmentType.FREE} as IAppointment);
            setNotification(null);
            this.setState({markedForReserve: !markedForReserve});
        }
    }
};

