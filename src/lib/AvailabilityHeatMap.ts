import { EventDataAvailability } from '../interfaces/EventData';

export const getYTimesSorted = (
    availability: EventDataAvailability
): string[] => {
    return Object.keys(availability).sort();
};

export const getXDaysSorted = (
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

export const createAvailabilityDataArray = (
    yTimes: string[],
    xDays: string[],
    availability: EventDataAvailability
): number[][] => {
    return new Array(yTimes.length).fill(0).map((_k, y) => {
        return new Array(xDays.length).fill(0).map((_j, x) => {
            return availability[yTimes[y]][xDays[x]].length;
        });
    });
};

export const createZeroStateArray = (
    yTimesLen: number,
    xDaysLen: number
): number[][] => {
    return new Array(yTimesLen).fill(0).map(() => new Array(xDaysLen).fill(0));
};
