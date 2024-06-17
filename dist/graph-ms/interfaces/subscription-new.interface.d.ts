export type ChangeType = 'created' | 'updated' | 'deleted' | 'created,updated' | 'created,deleted' | 'updated,deleted' | 'created,updated,deleted';
export type ResourceData = {
    '@odata.type': string;
    '@odata.id': string;
    '@odata.etag': string;
    id: string;
};
export interface SubscriptionNew {
    subscriptionId: string;
    subscriptionExpirationDateTime: Date;
    changeType: ChangeType;
    resource: string;
    resourceData: ResourceData;
    clientState: string;
    tenantId: string;
}
