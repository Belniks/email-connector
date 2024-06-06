import { Inject, Injectable } from '@nestjs/common';

import { Client, GraphClientError } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

import {
  GRAPH_MS_OPTIONS,
  GraphMSOptions,
} from 'lib/interfaces/email-connector-options.interfaces';

@Injectable()
export class EmailConnectorGraphMsService {
  constructor(
    @Inject(GRAPH_MS_OPTIONS)
    private readonly options: GraphMSOptions,

    private readonly client: Client,
  ) {
    const credential = new ClientSecretCredential(
      this.options.tenantId,
      this.options.clientId,
      this.options.clientSecret,
    );

    this.client = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => {
          try {
            const tokenResponse = await credential.getToken([
              'https://graph.microsoft.com/.default',
            ]);
            return tokenResponse.token;
          } catch (error) {
            throw error;
          }
        },
      },
    });
  }

  async getEmailsByEmail(email: string): Promise<void> {
    try {
      const messages = await this.client
        .api(`/users/${email}/messages`)
        .select('subject,from,receivedDateTime')
        .top(10)
        .get();

      messages.value.forEach((message: any, index: any) => {
        console.log(`${index + 1}. Subject: ${message.subject}`);
        console.log(
          `   From: ${message.from.emailAddress.name} <${message.from.emailAddress.address}>`,
        );
        console.log(`   Received: ${message.receivedDateTime}`);
        console.log('-----------------------------------------');
      });
    } catch (error) {
      if (!(error instanceof GraphClientError)) {
        throw error;
      }

      console.error('Error fetching emails:', error);
    }
  }
}
