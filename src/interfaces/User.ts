export default interface UserData {
    uid: string;
    email: string;
    events: EventInfo[];
    firstName: string;
    lastName: string;
    availability: UserDataAvailability;
}

export interface EventInfo {
    eventId: string;
    name: string;
    description: string;
    startDate: string;
    startTime: string;
    role: string;
}

export interface UserDataAvailability {
    [day: string]: number[];
}
