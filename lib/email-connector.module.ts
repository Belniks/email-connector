import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  EmailConnectorOptions,
  GMAIL_OPTIONS,
  GRAPH_MS_OPTIONS,
} from './interfaces/email-connector-options.interfaces';
import { EmailConnectorGraphMsService } from './graph-ms/email-connector-graph-ms.service';

@Module({})
export class EmailConnectorModule {
  static forRoot(options: EmailConnectorOptions): DynamicModule {
    if (options.gmail === undefined && options.graphMS === undefined) {
      throw new Error('You must provide at least one email provider');
    }

    const graphProvider: Provider = {
      provide: GRAPH_MS_OPTIONS,
      useValue: options.graphMS,
    };

    const gmailProvider: Provider = {
      provide: GMAIL_OPTIONS,
      useValue: options.gmail,
    };

    return {
      module: EmailConnectorModule,
      providers: [graphProvider, gmailProvider, EmailConnectorGraphMsService],
      exports: [EmailConnectorGraphMsService],
    };
  }
}
