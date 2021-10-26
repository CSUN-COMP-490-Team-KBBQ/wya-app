export interface EventData {
    eventId: EventId;
    hostId: UserId;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    guests: string[];
    availability: EventDataAvailability;
    participants: Participants;
    times: string[];
    days: string[];
}

export type UserId = string;
export type EventId = string;
export type CellId = string;

export interface Participants {
    [uuid: CellId]: UserId[];
}

export type EventDataAvailability = Array<Array<CellId>>;
