import { Client } from '@microsoft/microsoft-graph-client';
import { GraphMSOptions } from '../interfaces/email-connector-options.interfaces';
export declare class EmailConnectorGraphMsService {
    private readonly options;
    private readonly client;
    constructor(options: GraphMSOptions, client: Client);
    getEmailsByEmail(email: string): Promise<void>;
}
