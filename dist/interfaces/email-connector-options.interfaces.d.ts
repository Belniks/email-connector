export declare const GRAPH_MS_OPTIONS = "GRAPH_MS_OPTIONS";
export declare const GMAIL_OPTIONS = "GMAIL_OPTIONS";
export interface GraphMSOptions {
    clientId: string;
    clientSecret: string;
    tenantId: string;
}
export interface GmailOptions {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}
export interface EmailConnectorOptions {
    graphMS?: GraphMSOptions;
    gmail?: GmailOptions;
}