import { ModuleMetadata } from '@nestjs/common';
export declare const EMAIL_CONNECTOR_OPTIONS = "EMAIL_CONNECTOR_OPTIONS";
export interface GraphMSOptions {
    clientId?: string;
    clientSecret?: string;
    tenantId?: string;
}
export interface GmailOptions {
    clientId?: string;
    clientSecret?: string;
    redirectUri?: string;
}
export interface EmailConnectorOptions {
    graphMS?: GraphMSOptions;
    gmail?: GmailOptions;
}
export interface EmailConnectorAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => Promise<EmailConnectorOptions> | EmailConnectorOptions;
    inject?: any[];
}
