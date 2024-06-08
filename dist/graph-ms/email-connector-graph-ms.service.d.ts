import { Logger } from '@nestjs/common';
import { GraphMSOptions } from '../interfaces/email-connector-options.interfaces';
import { Message } from './interfaces';
import { GetOptions } from './interfaces/options/get-options.inteface';
import { Attachment } from './interfaces/attachment.interface';
export declare class EmailConnectorGraphMsService {
    private readonly options;
    private readonly logger;
    private readonly client;
    constructor(options: GraphMSOptions, logger: Logger);
    getMessagesByEmail({ email, options, }: {
        email: string;
        options: GetOptions;
    }): Promise<Message[]>;
    getMessageByEmailWithId({ email, id, }: {
        email: string;
        id: string;
    }): Promise<Message>;
    getListAttachmentsByEmailWithId({ email, id, }: {
        email: string;
        id: string;
    }): Promise<Attachment[]>;
    getAttachmentByEmailWithId({ email, messageId, attachmentId, }: {
        email: string;
        messageId: string;
        attachmentId: string;
    }): Promise<Attachment>;
}
