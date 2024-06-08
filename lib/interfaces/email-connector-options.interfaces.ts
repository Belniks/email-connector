import { ModuleMetadata } from '@nestjs/common';

export const GRAPH_MS_OPTIONS = 'GRAPH_MS_OPTIONS';
export const GMAIL_OPTIONS = 'GMAIL_OPTIONS';

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

export interface EmailConnectorAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<EmailConnectorOptions> | EmailConnectorOptions;
  inject?: any[];
}
