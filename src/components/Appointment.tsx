import React from 'react';
import {IAppointmentComponentProps, IAppointmentComponentState } from '../interfaces';
import classNames from 'classnames';
import { IAppointment, AppointmentType } from '../interfaces';
import {
    findAppointment,
    checkIfAppointmentTakenForDay,
    checkIfTwoAppointmentsTakenForWeek,
    getDayFromString
} from '../helpers';

export class Appointment extends React.PureComponent<IAppointmentComponentProps, IAppointmentComponentState> {

    constructor(props: IAppointmentComponentProps) {
        super(props);
        const {
            appointments,
            day,
            appointmentTime,
        } = props;

        const existingAppointment = findAppointment(appointments, {time: appointmentTime.time, dateStr: day.date.toDateString()});

        this.state = {
            free: !Boolean(existingAppointment) && !appointmentTime.isBreak && !day.isClosed,
            markedForReserve: false,
            existingAppointment,
        }
    }

    componentDidUpdate(prevProps: IAppointmentComponentProps) {
        const {
            appointments,
            day,
            appointmentTime,
        } = this.props;

        if (JSON.stringify(appointments) !== JSON.stringify(prevProps.appointments)) {
            const existingAppointment = findAppointment(appointments, {dateStr: day.date.toDateString(), time: appointmentTime.time})
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

        const isReserved = existingAppointment && existingAppointment.type === AppointmentType.RESERVED;

        const {
            text,
            className,
        } = this.getAppointmentTextAndClassName(isReserved, appointmentTime.isBreak, day.isClosed, markedForReserve);


        return (
            <div className={classNames('appointment', className)} onClick={!isReserved ? this.handleClickOnAppointment.bind(this) : undefined}>
                <div className='time'>{appointmentTime.time}</div>
                <div className='appointment-text'>{text}</div>
            </div>
        )
    }

    getAppointmentTextAndClassName = (isReserved: boolean, isBreak: boolean, isClosed: boolean, markedForReserve: boolean) =>
        isReserved ?
            {text: 'Reserved', className: 'appointment-reserved'}
            : isClosed ?
                {text: 'Closed', className: 'appointment-closed'}
                : isBreak ?
                    {text: 'Break', className: 'appointment-break'}
                    : markedForReserve ?
                        {text: 'To be reserved', className: 'appointment-reserve'}
                            : {text: 'Free', className: 'appointment-free'};

    handleClickOnAppointment() {
        const {
            selectAppointment,
            deselectAppointment,
            appointmentTime,
            appointments,
            setNotificationData,
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
                    return `${getDayFromString(a.dateStr)} at ${a.time}`
                }
                return null;
            }).filter((a) => a != null).join(' or on ');
            setNotificationData({
                message: `You can only select two appointments per week! If you want to change selected appointments for this week, please deselect an appointment on ${reservedTime}!`,
                isError: true,
                appointments: []
            });
        } else if (maxReservedForDay && free && !markedForReserve) {
            const alreadySelectedAppointment = appointments.find((a) => a.dateStr === day.date.toDateString() && a.type === AppointmentType.RESERVE);
            setNotificationData({
                message: `You already selected an appointment for ${day.name}! If you want to change an appointment for this day, please deselect appointment at ${alreadySelectedAppointment.time}!`,
                isError: true,
                appointments: []
            });
        } else if (free && !markedForReserve) {
            selectAppointment({dateStr: day.date.toDateString(), time: appointmentTime.time, type: AppointmentType.RESERVE} as IAppointment);
            setNotificationData(null);
            this.setState({markedForReserve: !markedForReserve});
        } else if (free && markedForReserve) {
            deselectAppointment({dateStr: day.date.toDateString(), time: appointmentTime.time, type: AppointmentType.FREE} as IAppointment);
            setNotificationData(null);
            this.setState({markedForReserve: !markedForReserve});
        }
    }
};

