import React from 'react';
import { IAppointment, IDay, AppointmentType, INotificationData} from './interface';
import { PortalNotification } from './PortalNotification';
import { WeeklySchedule } from './WeeklySchedule';
import { constructWeek, getReservableAppointments, generate15ReservedAppointments, filterAppointments } from '../helpers';

export class Component extends React.Component<{}, {appointments: IAppointment[], notificationData?: INotificationData, appointment?: IAppointment, days: IDay[]}> {

    constructor (props) {
        super(props);
        const days = constructWeek();
        const reservableAppointments = getReservableAppointments(days);
        const appointments = generate15ReservedAppointments(reservableAppointments);
        this.state = {days, appointments}
    }

    render () {
        const {
            notificationData,
            days,
            appointments,
        } = this.state || {};

        return (
            <div className='container'>
                <PortalNotification notificationData={notificationData}/>

                {/* <div>{this.state && this.state.appointments ? JSON.stringify(this.state.appointments) : ''}</div> */}
                {/* <div>{ message ? message : ''}</div> */}
                <WeeklySchedule
                    selectAppointment={this.selectAppointment}
                    deselectAppointment={this.deselectAppointment}
                    days={days}
                    appointments={appointments}
                    setNotification={this.setNotification}
                />

                <button className='reserve-button' onClick={this.reserveSelectedAppointments}>Reserve Appointments</button>
            </div>
        );
    }

    setNotification = (notificationData: INotificationData) => {
        this.setState({notificationData});
    }

    selectAppointment = (appointment: IAppointment) => {
        this.setState({appointments: [...this.state.appointments, appointment]})
    }

    deselectAppointment = (appointment: IAppointment) => {
        const appointments = filterAppointments(this.state.appointments, appointment);
        this.setState({appointments})
    }

    reserveSelectedAppointments = () => {
        const selectedAppointments = this.state.appointments.filter((a) => a.type === AppointmentType.RESERVE);
        if (selectedAppointments && selectedAppointments.length) {
            const reserveAppointments = selectedAppointments.map((sa) => ({dateStr: sa.dateStr, time: sa.time, type: AppointmentType.RESERVED} as IAppointment));
            const filteredAppointments = this.state.appointments.filter((a) => a.type !== AppointmentType.RESERVE);
            this.setState({appointments: [...filteredAppointments, ...reserveAppointments]})
        }
    }

};

