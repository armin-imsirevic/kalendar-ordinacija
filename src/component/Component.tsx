import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../state/reducer';
import { saveAppointmentAction, removeAppointmentAction } from '../state/actions';
import { TimeSelect } from './TimeSelect';
import { IAppointment } from '../state/interface';

export interface IComponentProps {
    appointments: IAppointment[],
    saveAppointment: (appointment: IAppointment) => void,
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
    }
};

class Component extends React.Component<IComponentProps, {error: any, appointment: IAppointment}> {
    date = new Date();

    render () {
        const isEven = this.date.getDate() % 2 !== 0;
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='number' name='id' onChange={this.handleInputChange} required/>
                <input type='text' name='name' onChange={this.handleInputChange} required/>
                <input type='date' name='date' onChange={this.handleInputChange} required/>
                <TimeSelect isEven={isEven} onChange={this.handleInputChange} required/>

                <input type='submit'/>
                <div>{this.state && this.state.error ? this.state.error : ''}</div>
                <div>{this.props && this.props.appointments ? JSON.stringify(this.props.appointments) : ''}</div>
            </form>
        );
    }

    private handleSubmit = (e) => {
        e.preventDefault();
        this.props.saveAppointment(this.state.appointment);
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
};

export const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);
