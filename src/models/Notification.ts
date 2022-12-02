export enum NotificationType {
    WARNING = "WARNING",
    REQUEST = "REQUEST"
}

export interface Notification {
    id: string;
    type: NotificationType;
    referenceId: number | undefined;
    body: string;
    dismissed: boolean;
    seen: boolean;
    time: string | undefined;
}

export interface NotificationRequest {
    id: string,
    type: NotificationType;
    referenceId: number | undefined;
    body: string;
    dismissed: boolean;
    seen: boolean;
}