export interface Subscription {
    id: string;
    resource: string;
    applicationId: string;
    changeType: string;
    clientState: string;
    notificationUrl: string;
    notificationQueryOptions: null;
    lifecycleNotificationUrl: null;
    expirationDateTime: Date;
    creatorId: string;
    includeResourceData: null;
    latestSupportedTlsVersion: string;
    encryptionCertificate: null;
    encryptionCertificateId: null;
    notificationUrlAppId: null;
    notificationContentType?: string;
}
