import React from 'react';
import { connect } from 'react-redux';

import { IState } from '../state/reducer';
import { saveAppointmentAction, removeAppointmentAction, editAppointmentAction } from '../state/actions';
import { IAppointment } from '../state/interface';
import { DAYS } from '../constants';
import { PortalNotification } from './PortalNotification';
import { AppointmentForm } from './AppointmentForm';
import { WeeklySchedule } from './WeeklySchedule';

export interface IComponentProps {
    appointments: IAppointment[],
    saveAppointment: (appointment: IAppointment) => void,
    editAppointment: (appointment: IAppointment) => void,
    removeAppointment: (appointment: IAppointment) => void,
}

const mapStateToProps = (state: IState) => {
    return {
        appointments: state.appointments
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveAppointment: (data) => dispatch(saveAppointmentAction(data)),
        removeAppointment: (data) => dispatch(removeAppointmentAction(data)),
        editAppointment: (data) => dispatch(editAppointmentAction(data)),
    }
};

class Component extends React.Component<IComponentProps, {message: any, appointment: IAppointment}> {
    render () {
        const {
            appointment,
            message,
        } = this.state || {};
        const daysArray = Object.values(DAYS);

        const {
            appointments,
            saveAppointment,
            editAppointment,
        } = this.props;
        return (
            <div className='container'>
                <PortalNotification><h1>BLA</h1></PortalNotification>

                <AppointmentForm handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} appointment={appointment} />
                <div>{this.props && this.props.appointments ? JSON.stringify(this.props.appointments) : ''}</div>
                <div>{ message ? message : ''}</div>
                <WeeklySchedule saveAppointment={saveAppointment} editAppointment={editAppointment} daysArray={daysArray} appointments={appointments}/>
            </div>
        );
    }

    private handleInputChange = (e) => {
        const stateAppointment = this.state && this.state.appointment ? this.state.appointment : {};
        const obj = {} as IAppointment
        const input = e.currentTarget;
        obj[input.name] = input.value;
        this.setState({
            appointment: {
                ...stateAppointment,
                ...obj
            }
        });
    }

    private handleSubmit = (e) => {
        e.preventDefault();
        const {
            time,
            date,
        } = this.state.appointment;
        const {
            appointments,
            saveAppointment,
        } = this.props;

        const beginningOfDate = new Date(date).setHours(0, 0, 0, 0);
        const existingAppointment: IAppointment | any = appointments.find((a) => a.time === time && beginningOfDate === new Date(a.date).setHours(0, 0, 0, 0)) || null;
        const ids = appointments.map((a) => a.id);
        if (existingAppointment) {
            this.setState({message: 'Appointment is already occupied!'});
        } else {
            saveAppointment({...this.state.appointment, id: ids && ids.length ? Math.max(...ids) + 1 : 1});
            this.setState({message: 'Appointment is saved!'});
        }
    }

};

export const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);

