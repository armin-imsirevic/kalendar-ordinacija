import React from 'react';
import { connect } from 'react-redux';

import { IState } from '../state/reducer';
import { saveAppointmentAction, removeAppointmentAction } from '../state/actions';
import { TimeSelect } from './TimeSelect';
import { IAppointment } from '../state/interface';
import { DAYS, APPOINTMENT_TIMES } from '../constants';

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

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(), diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

class Component extends React.Component<IComponentProps, {error: any, appointment: IAppointment}> {
    date = new Date();

    render () {
        const isEven = this.date.getDate() % 2 !== 0;
        // const currentDate = new Date();
        const daysArray = Object.values(DAYS);
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit}>
                    <input type='number' name='id' onChange={this.handleInputChange} required/>
                    <input type='text' name='name' onChange={this.handleInputChange} required/>
                    <input type='date' name='date' onChange={this.handleInputChange} required/>
                    <TimeSelect isEven={isEven} onChange={this.handleInputChange} required/>

                    <input type='submit'/>
                    <div>{this.state && this.state.error ? this.state.error : ''}</div>
                    <div>{this.props && this.props.appointments ? JSON.stringify(this.props.appointments) : ''}</div>
                </form>
                <div className='appointments'>
                    {
                        daysArray.map((d, i) => {
                            const monday = getMonday(new Date());
                            const date = new Date(monday.setDate(monday.getDate() + i));
                            const isEven = date.getDate() % 2 === 0;
                            const ids = this.props.appointments.filter((a) => a.id !== null ).map((a) => a.id);
                            return (
                                <div key={i} className='day'>
                                    <div>{d} - {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</div>
                                    {
                                        APPOINTMENT_TIMES.filter((at) => at.even === isEven).map((at, i) => {
                                            return (
                                                <div key={i} className='appointment'>
                                                    <div className='time'>{at.time}</div>
                                                    <div
                                                        className='save-icon'
                                                        onClick={() =>
                                                            this.props.saveAppointment({
                                                                date: date.toDateString(),
                                                                time: at.time,
                                                                id: ids.length ? Math.max(...ids) + 1 : 1,
                                                                name: 'Armin Imsirevic'
                                                            })
                                                        }
                                                    />
                                                    <input className='input-name' type='text' name='name'/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
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

