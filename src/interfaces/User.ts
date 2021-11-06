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
    role: string;
}

export interface UserDataAvailability {
    [time: string]: {
        // should be type boolean, not string[]
        [date: string]: string[];
    };
}
