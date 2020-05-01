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
