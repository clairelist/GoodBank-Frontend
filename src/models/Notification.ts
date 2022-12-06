export enum NotificationType {
    WARNING  = "WARNING",
    ACTIVITY = "ACTIVITY",
    REQUEST  = "REQUEST",
}

export interface Notification {
    id: string;
    type: NotificationType;
    referencesId: number | undefined;
    body: string;
    dismissed: boolean;
    seen: boolean;
    time: string | undefined;
}

export interface NotificationCreationRequest {
    userId: number;
    type: NotificationType;
    referencesId: number | undefined;
    body: string;
}