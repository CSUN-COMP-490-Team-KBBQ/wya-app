export default interface EventData {
    eventId: string;
    hostId: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    guests: string[];
    availability: EventDataAvailability;
}

export interface EventDataAvailability {
    [time: string]: {
        [date: string]: string[];
    };
}
