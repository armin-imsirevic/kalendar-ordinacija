export interface IAppointment {
    dateStr: string;
    time: string;
    type?: AppointmentType;
}

export enum AppointmentType {
    BREAK,
    RESERVE,
    RESERVED,
    FREE,
    CLOSED,
}

export interface IDay {
    date: Date;
    name: string;
    even: boolean;
    isClosed: boolean;
}

export interface INotificationData {
    isError: boolean,
    message: string,
    appointments: IAppointment[],
}

export interface IAppointmentTimes {
    even: boolean;
    time: string;
    isBreak: boolean;
}

export interface IAppointmentComponentProps {
    appointments: IAppointment[],
    appointmentTime: IAppointmentTimes,
    day: IDay,
    selectAppointment: (appointment: IAppointment) => void,
    deselectAppointment: (appointment: IAppointment) => void,
    setNotificationData: (notificationData: INotificationData) => void,
}

export interface IAppointmentComponentState {
    free: boolean,
    markedForReserve: boolean,
    existingAppointment: IAppointment,
}

export interface IContainerState {
    appointments: IAppointment[],
    notificationData?: INotificationData,
    appointment?: IAppointment,
    days: IDay[],
}