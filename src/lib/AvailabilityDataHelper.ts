import { EventDataAvailability } from '../interfaces/Event';

export const prepareGroupAvailabilityData = (
    yTimes: string[],
    xDays: string[],
    availability: EventDataAvailability
): number[][] => {
    return new Array(yTimes.length).fill(0).map((_j, y) => {
        return new Array(xDays.length).fill(0).map((_k, x) => {
            return availability[yTimes[y]][xDays[x]].length;
        });
    });
};

export const prepareModalAvailabilityData = (
    yTimesLen: number,
    xDaysLen: number
): number[][] => {
    return new Array(yTimesLen).fill(0).map(() => new Array(xDaysLen).fill(0));
};

export const getYTimes = (availability: EventDataAvailability): string[] => {
    return Object.keys(availability).sort();
};

export const getXDays = (
    yTimes: string[],
    availability: EventDataAvailability
): string[] => {
    return Object.keys(availability[yTimes[0]]).sort();
};

export const formatXDays = (xDays: string[]): string[] => {
    return xDays.map((timeStamp) =>
        new Date(Number(timeStamp)).toDateString().slice(0, 15)
    );
};
