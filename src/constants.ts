export interface IAppointmentTimes {
    even: boolean;
    time: string;
    isBreak: boolean;
}

export const APPOINTMENT_TIMES: IAppointmentTimes[] = [
    {
        even: true,
        time: '08:00',
        isBreak: false,
    },
    {
        even: true,
        time: '08:30',
        isBreak: false,
    },
    {
        even: true,
        time: '09:00',
        isBreak: false,
    },
    {
        even: true,
        time: '09:30',
        isBreak: false,
    },
    {
        even: true,
        time: '10:00',
        isBreak: false,
    },
    {
        even: true,
        time: '10:30',
        isBreak: false,
    },
    {
        even: true,
        time: '11:00',
        isBreak: true,
    },
    {
        even: true,
        time: '11:30',
        isBreak: false,
    },
    {
        even: true,
        time: '12:00',
        isBreak: false,
    },
    {
        even: true,
        time: '12:30',
        isBreak: false,
    },
    {
        even: true,
        time: '13:00',
        isBreak: false,
    },
    {
        even: true,
        time: '13:30',
        isBreak: false,
    },
    {
        even: false,
        time: '14:00',
        isBreak: false,
    },
    {
        even: false,
        time: '14:30',
        isBreak: false,
    },
    {
        even: false,
        time: '15:00',
        isBreak: false,
    },
    {
        even: false,
        time: '15:30',
        isBreak: false,
    },
    {
        even: false,
        time: '16:00',
        isBreak: true,
    },
    {
        even: false,
        time: '16:30',
        isBreak: false,
    },
    {
        even: false,
        time: '17:00',
        isBreak: false,
    },
    {
        even: false,
        time: '17:30',
        isBreak: false,
    },
    {
        even: false,
        time: '18:00',
        isBreak: false,
    },
    {
        even: false,
        time: '18:30',
        isBreak: false,
    },
]

export const DAYS = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
}