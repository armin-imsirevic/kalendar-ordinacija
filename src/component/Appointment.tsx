import React from 'react';
import { IAppointmentTimes } from '../constants';
import classNames from 'classnames';
import { IAppointment } from '../state/interface';

export class Appointment extends React.PureComponent<{ appointments: IAppointment[], appointmentTime: IAppointmentTimes, date: Date, saveAppointment: any, editAppointment: any, isEven: boolean, closed: boolean, required: boolean }> {
    state = {
        editable: false,
        value: '',
        existingAppointment: null,
    }

    constructor(props) {
        super(props);
        const {
            appointments,
            date,
            appointmentTime,
        } = props;

        const beginningOfDate = date.setHours(0, 0, 0, 0);
        const existingAppointment: IAppointment | any = appointments.find((a) => a.time === appointmentTime.time && beginningOfDate === new Date(a.date).setHours(0, 0, 0, 0)) || null;

        this.state = {
            editable: false,
            value: existingAppointment && existingAppointment.name ? existingAppointment.name : '',
            existingAppointment,
        }
    }

    componentDidUpdate(prevProps) {
        const {
            appointments,
            date,
            appointmentTime,
        } = this.props;

        if (JSON.stringify(appointments) !== JSON.stringify(prevProps.appointments)) {
            const beginningOfDate = date.setHours(0, 0, 0, 0);
            const existingAppointment: IAppointment | any = appointments.find((a) => a.time === appointmentTime.time && beginningOfDate === new Date(a.date).setHours(0, 0, 0, 0)) || null;
            this.setState({
                value: existingAppointment && existingAppointment.name ? existingAppointment.name : '',
                existingAppointment
            });
        }
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({value: event.target.value});
    }

    handleAppointment() {
        const {
            existingAppointment,
            value,
        } = this.state;
        const {
            date,
            appointmentTime,
            appointments,
        } = this.props;
        if (existingAppointment) {
            this.props.editAppointment({
                ...existingAppointment as any,
                name: value,
            })
        } else {
            const ids = appointments.map((a) => a.id);

            this.props.saveAppointment({
                date: date.toDateString(),
                time: appointmentTime.time,
                id: ids.length ? Math.max(...ids) + 1 : 1,
                name: value,
            })
        }
        this.setState({editable: !this.state.editable});
    }

    render() {
        const {
            appointmentTime,
            closed,
        } = this.props;
        const {
            editable,
            value,
        } = this.state;
        const isReserved = !editable && value && value.length;
        const classClosed = closed ?
            'appointment-closed'
            : appointmentTime.break ?
                'appointment-break'
                : isReserved ?
                    'appointment-reserved'
                        : 'appointment';
        return (
            <div className={classNames(classClosed, editable && 'appointment-editable')}>
                <div className='time'>{appointmentTime.time}</div>
                { appointmentTime.break || closed ? (
                    <div className='break-closed-text'>{ closed ? 'Zatvoreno' : 'Pauza'}</div>
                ) : (
                    <>
                        <div>
                            {
                                !editable ? (<div onClick={() => this.setState({editable: !this.state.editable})} className='fas fa-edit my-icon'/>)
                                : (<>
                                    <i className="fas fa-save my-icon" onClick={this.handleAppointment.bind(this)}/>
                                    <i className="fas fa-ban my-icon" onClick={() => this.setState({editable: !this.state.editable})}/>
                                </>)
                            }
                        </div>
                        <input
                            disabled={!this.state.editable}
                            className={classNames('input-name', !this.state.editable ? 'input-disabled' : 'input-enabled')}
                            type='text'
                            name='name'
                            value={value}
                            onChange={this.handleChange.bind(this)}
                        />
                    </>
                    )
                }
            </div>
        )
    }
};

