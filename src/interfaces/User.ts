export default interface UserData {
    userId: string;
    email: string;
    events: EventInfo[];
    firstName: string;
    lastName: string;
}

export interface EventInfo {
    eventId: string;
    name: string;
    description: string;
    startDate: string;
    role: string;
}
