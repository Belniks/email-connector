import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  EmailConnectorAsyncOptions,
  EmailConnectorOptions,
  EMAIL_CONNECTOR_OPTIONS,
} from './interfaces/email-connector-options.interfaces';
import { EmailConnectorGraphMsService } from './graph-ms/email-connector-graph-ms.service';

@Module({})
export class EmailConnectorModule {
  static forRoot(options: EmailConnectorOptions): DynamicModule {
    if (options.gmail === undefined && options.graphMS === undefined) {
      throw new Error('You must provide at least one email provider');
    }

    const optionProviders: Provider = {
      provide: EMAIL_CONNECTOR_OPTIONS,
      useValue: options,
    };

    return {
      module: EmailConnectorModule,
      providers: [optionProviders, EmailConnectorGraphMsService],
      exports: [EmailConnectorGraphMsService],
    };
  }

  static forRootAsync(options: EmailConnectorAsyncOptions): DynamicModule {
    const providers = this.createAsyncProviders(options);

    return {
      module: EmailConnectorModule,
      imports: options.imports || [],
      providers: providers,
      exports: [EmailConnectorGraphMsService],
    };
  }

  private static createAsyncProviders(
    options: EmailConnectorAsyncOptions,
  ): Provider[] {
    const providers = [EmailConnectorGraphMsService];

    if (options.useFactory) {
      return [...providers, this.createAsyncOptionsProvider(options)];
    }

    return providers;
  }

  private static createAsyncOptionsProvider(
    options: EmailConnectorAsyncOptions,
  ): Provider {
    return {
      provide: EMAIL_CONNECTOR_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
