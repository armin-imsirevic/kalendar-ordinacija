export interface IAppointmentTimes {
    even: boolean;
    time: string;
    break: boolean;
}

export const APPOINTMENT_TIMES: IAppointmentTimes[] = [
    {
        even: true,
        time: '08:00',
        break: false,
    },
    {
        even: true,
        time: '08:30',
        break: false,
    },
    {
        even: true,
        time: '09:00',
        break: false,
    },
    {
        even: true,
        time: '09:30',
        break: false,
    },
    {
        even: true,
        time: '10:00',
        break: false,
    },
    {
        even: true,
        time: '10:30',
        break: false,
    },
    {
        even: true,
        time: '11:00',
        break: true,
    },
    {
        even: true,
        time: '11:30',
        break: false,
    },
    {
        even: true,
        time: '12:00',
        break: false,
    },
    {
        even: true,
        time: '12:30',
        break: false,
    },
    {
        even: true,
        time: '13:00',
        break: false,
    },
    {
        even: true,
        time: '13:30',
        break: false,
    },
    {
        even: false,
        time: '14:00',
        break: false,
    },
    {
        even: false,
        time: '14:30',
        break: false,
    },
    {
        even: false,
        time: '15:00',
        break: false,
    },
    {
        even: false,
        time: '15:30',
        break: false,
    },
    {
        even: false,
        time: '16:00',
        break: true,
    },
    {
        even: false,
        time: '16:30',
        break: false,
    },
    {
        even: false,
        time: '17:00',
        break: false,
    },
    {
        even: false,
        time: '17:30',
        break: false,
    },
    {
        even: false,
        time: '18:00',
        break: false,
    },
    {
        even: false,
        time: '18:30',
        break: false,
    },
]

export const DAYS = {
    0: 'Nedjelja',
    1: 'Pondeljak',
    2: 'Utorak',
    3: 'Srijeda',
    4: 'Četvrtak',
    5: 'Petak',
    6: 'Subota',
}

export const CLOSED_DAYS = [{
    even: false,
    day: DAYS[6],
},
{
    even: true,
    day: DAYS[0],
},
{
    even: false,
    day: DAYS[0],
}];
