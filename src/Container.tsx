import React from 'react';
import { IAppointment, AppointmentType, INotificationData, IContainerState} from './interfaces';
import { Notification } from './components/Notification';
import { WeeklySchedule } from './components/WeeklySchedule';
import { constructWeek, getReservableAppointments, generate15ReservedAppointments, filterAppointments } from './helpers';

export class Container extends React.Component<{}, IContainerState> {

    constructor (props: {}) {
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
                <h1 className='title'>Weekly calendar</h1>
                {notificationData && <Notification setNotificationData={this.setNotificationData} notificationData={notificationData}/>}

                <WeeklySchedule
                    selectAppointment={this.selectAppointment}
                    deselectAppointment={this.deselectAppointment}
                    days={days}
                    appointments={appointments}
                    setNotificationData={this.setNotificationData}
                />

                <button className='reserve-button' onClick={this.reserveSelectedAppointments}>Reserve Selected Appointments</button>
            </div>
        );
    }

    setNotificationData = (notificationData: INotificationData) => {
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
            this.setNotificationData({
                isError: false,
                message: 'Appointments reserved.',
                appointments: reserveAppointments,
            });
        } else {
            this.setNotificationData({
                message: `Unable to reserve an appointment, you need to select at least one free appointment on the weekly calendar to be able to reserve!`,
                isError: true,
                appointments: null,
            });
        }
    }

};

