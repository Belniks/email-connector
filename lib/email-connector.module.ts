import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  EmailConnectorAsyncOptions,
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

  static forRootAsync(options: EmailConnectorAsyncOptions): DynamicModule {
    const providers = this.createAsyncProviders(options);

    return {
      module: EmailConnectorModule,
      imports: options.imports,
      providers: providers,
      exports: [EmailConnectorGraphMsService],
    };
  }

  private static createAsyncProviders(
    options: EmailConnectorAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [
        this.createGraphAsyncOptionsProvider(options),
        this.createGmailAsyncOptionsProvider(options),
      ];
    }

    return [];
  }

  private static createGraphAsyncOptionsProvider(
    options: EmailConnectorAsyncOptions,
  ): Provider {
    return {
      provide: GRAPH_MS_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }

  private static createGmailAsyncOptionsProvider(
    options: EmailConnectorAsyncOptions,
  ): Provider {
    return {
      provide: GMAIL_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
