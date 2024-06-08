import { DynamicModule } from '@nestjs/common';
import { EmailConnectorAsyncOptions, EmailConnectorOptions } from './interfaces/email-connector-options.interfaces';
export declare class EmailConnectorModule {
    static forRoot(options: EmailConnectorOptions): DynamicModule;
    static forRootAsync(options: EmailConnectorAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
