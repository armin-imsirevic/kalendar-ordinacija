import React from 'react';
import { TimeSelect } from './TimeSelect';
import { IAppointment } from '../state/interface';

export class AppointmentForm extends React.Component<{appointment: IAppointment, handleInputChange, handleSubmit}> {
    render() {
        const {
            appointment,
            handleInputChange,
            handleSubmit,
        } = this.props;

        const date = appointment && appointment.date ? new Date(appointment.date) : null;
        const isEven = date && date.getDate() % 2 === 0;
        return (
            <form onSubmit={handleSubmit}>
                <input type='text' name='name' onChange={handleInputChange} required/>
                <input type='date' name='date' onChange={handleInputChange} required/>
                <TimeSelect isEven={Boolean(isEven)} disabled={!Boolean(date)} onChange={handleInputChange} required/>
                <input type='submit'/>
            </form>
        );
    }


}