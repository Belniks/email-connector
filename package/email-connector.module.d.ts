import { DynamicModule } from '@nestjs/common';
import { EmailConnectorOptions } from './interfaces/email-connector-options.interfaces';
export declare class EmailConnectorModule {
    static forRoot(options: EmailConnectorOptions): DynamicModule;
}
