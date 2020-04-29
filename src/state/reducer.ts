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
        default:
            return state;
    }
};