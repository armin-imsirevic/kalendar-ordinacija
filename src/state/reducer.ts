import { IAppointment } from './interface';
import { Actions, ActionTypes } from './actions';

export interface IState {
    appointments: IAppointment[];
}

const initialState: IState = {
    appointments: [],
}

export const reducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case ActionTypes.SAVE_APPOINTMENT:
            return {
                ...state,
                appointments: [...state.appointments, action.data],
            };
        case ActionTypes.REMOVE_APPOINTMENT:
            return {
                ...state,
                appointments: state.appointments.filter((a) => a.id !== action.data.id),
            };
        case ActionTypes.EDIT_APPOINTMENT:
            const updatedAppointment = action.data;
            const filteredAppointments = state.appointments.filter((a) => a.id !== updatedAppointment.id);

            return {
                appointments: [...filteredAppointments, updatedAppointment],
            };
        default:
            return state;
    }
};