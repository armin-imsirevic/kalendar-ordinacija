import { IAppointment } from './interface';

export enum ActionTypes {
    SAVE_APPOINTMENT = 'SAVE_APPOINTMENT',
    REMOVE_APPOINTMENT = 'REMOVE_APPOINTMENT',
}

export const saveAppointmentAction = (data: IAppointment) => ({ data, type: ActionTypes.SAVE_APPOINTMENT });
export const removeAppointmentAction = (data: IAppointment) => ({ data, type: ActionTypes.REMOVE_APPOINTMENT });

export type Actions =
  | ReturnType<typeof saveAppointmentAction>
  | ReturnType<typeof removeAppointmentAction>
  ;
