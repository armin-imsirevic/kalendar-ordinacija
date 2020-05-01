import { IAppointment, AppointmentType, IDay } from './components/interfaces';
import { DAYS, APPOINTMENT_TIMES } from './constants';

export const findAppointment = (appointments: IAppointment[], appointment:IAppointment) =>
    appointments.find((a) => a.time === appointment.time && convertStringToBeginningOfDay(appointment.dateStr) === convertStringToBeginningOfDay(a.dateStr));


export const filterAppointments = (appointments: IAppointment[], appointment:IAppointment) =>
    appointments.filter((a) => !(a.time === appointment.time && convertStringToBeginningOfDay(appointment.dateStr) === convertStringToBeginningOfDay(a.dateStr)));


const convertStringToBeginningOfDay = (d) => new Date(d).setHours(0, 0, 0, 0);

export const checkIfAppointmentTakenForDay = (appointments: IAppointment[], date: Date) =>
    Boolean(appointments.find((a) => a.type === AppointmentType.RESERVE && a.dateStr === date.toDateString()));

export const checkIfTwoAppointmentsTakenForWeek = (appointments: IAppointment[]) =>
    appointments.filter((a) => a.type === AppointmentType.RESERVE).length >= 2;


export const generate15ReservedAppointments = (appointments: IAppointment[] = []): IAppointment[] => {
    const reservedAppointments = appointments.filter((a) => a.type === AppointmentType.RESERVED);
    if (reservedAppointments && reservedAppointments.length < 15) {
        const randomApp = Math.round(Math.random() * appointments.length);
        if(appointments[randomApp] && appointments[randomApp].type) appointments[randomApp].type = AppointmentType.RESERVED;
        return generate15ReservedAppointments(appointments);
    }
    return reservedAppointments;
}

export const constructWeek = () => Object.values(DAYS).map((d, i) => {
    const date = new Date(new Date().setDate(new Date().getDate() + i + 1));
    const isEven = date.getDate() % 2 === 0;
    const isSunday = date.getDay() === 0;
    const isSaturday = date.getDay() === 6;
    return {name: DAYS[date.getDay()], even: isEven, isClosed: isSunday || (isSaturday && !isEven), date} as IDay
}) as IDay[];

export const getReservableAppointments = (days: IDay[]): IAppointment[] => days.flatMap((day) => {
    const filteredAppointmentTimes = APPOINTMENT_TIMES.filter((at) => at.even === day.even && !at.isBreak && !day.isClosed);
    const reservableAppointments = filteredAppointmentTimes.map((fat) =>
        ({dateStr: day.date.toDateString(), time: fat.time, type: AppointmentType.FREE} as IAppointment)
    );
    return reservableAppointments;
})

export const getDayFromString = (date: string) => DAYS[new Date(date).getDay()];