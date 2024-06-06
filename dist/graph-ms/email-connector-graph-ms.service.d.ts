import { GraphMSOptions } from '../interfaces/email-connector-options.interfaces';
export declare class EmailConnectorGraphMsService {
    private readonly options;
    private readonly client;
    constructor(options: GraphMSOptions);
    getEmailsByEmail(email: string): Promise<void>;
}
