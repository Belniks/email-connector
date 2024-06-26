import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  Client,
  GraphClientError,
  GraphError,
} from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

import {
  EMAIL_CONNECTOR_OPTIONS,
  EmailConnectorOptions,
  GraphMSOptions,
} from '../interfaces/email-connector-options.interfaces';
import { Message } from './interfaces';
import { GetOptions } from './interfaces/options/get-options.inteface';
import { MessageMapper } from './mappers/message.mapper';
import { AttachmentMapper } from './mappers/attachment.mapper';
import { Attachment } from './interfaces/attachment.interface';
import { Subscription } from './interfaces/subscription.interface';

@Injectable()
export class EmailConnectorGraphMsService {
  private readonly client: Client;
  private readonly logger: Logger = new Logger(
    EmailConnectorGraphMsService.name,
  );

  constructor(
    @Inject(EMAIL_CONNECTOR_OPTIONS)
    private readonly options: EmailConnectorOptions,
  ) {
    const graphMSOptions = this.options.graphMS;

    if (!graphMSOptions.clientId) {
      this.logger.error('Missing required clientId');
      throw new Error('Missing required clientId');
    }

    if (!graphMSOptions.clientSecret) {
      this.logger.error('Missing required clientSecret');
      throw new Error('Missing required clientSecret');
    }

    if (!graphMSOptions.tenantId) {
      this.logger.error('Missing required tenantId');
      throw new Error('Missing required tenantId');
    }

    if (!graphMSOptions.clientState) {
      this.logger.error('Missing required clientState');
      throw new Error('Missing required clientState');
    }

    const credential = new ClientSecretCredential(
      graphMSOptions.tenantId,
      graphMSOptions.clientId,
      graphMSOptions.clientSecret,
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
            this.logger.error('Error getting access token:', error);
          }
        },
      },
    });
  }

  async listenForNewEmails({
    email,
    notificationUrl,
    expirationDateTime,
  }: {
    email: string;
    notificationUrl: string;
    expirationDateTime?: Date;
  }): Promise<Subscription> {
    try {
      const subscription = (await this.client.api('/subscriptions').post({
        changeType: 'created',
        notificationUrl: notificationUrl,
        resource: `/users/${email}/messages`,
        expirationDateTime:
          expirationDateTime.toISOString() ??
          new Date(
            new Date().getTime() + 60 * 60 * 1000, // 1 hour
          ).toISOString(),
        latestSupportedTlsVersion: 'v1_2',
        clientState: this.options.graphMS.clientState,
      })) as Subscription;

      // TODO: Add a mapper for the subscription

      this.logger.log(`Subscription created: ${subscription.id}`);

      return subscription;
    } catch (error) {
      this.logger.error(`Error creating subscription: ${error}`);
    }
  }

  async updateSubscription({
    subscriptionId,
    expirationDateTime,
  }: {
    subscriptionId: string;
    expirationDateTime: Date;
  }): Promise<Subscription> {
    try {
      const subscription = (await this.client
        .api(`/subscriptions/${subscriptionId}`)
        .patch({
          expirationDateTime: expirationDateTime.toISOString(),
        })) as Subscription;

      // TODO: Add a mapper for the subscription

      this.logger.log(`Subscription updated: ${subscription.id}`);

      return subscription;
    } catch (error) {
      this.logger.error(`Error updating subscription: ${error}`);
    }
  }

  async deleteSubscription({
    subscriptionId,
  }: {
    subscriptionId: string;
  }): Promise<boolean> {
    try {
      await this.client.api(`/subscriptions/${subscriptionId}`).delete();

      this.logger.log(`Subscription deleted: ${subscriptionId}`);
      return true;
    } catch (error) {
      this.logger.error(`Error deleting subscription: ${error}`);
      return false;
    }
  }

  async getAllSubscriptions(): Promise<Subscription[]> {
    try {
      const response = await this.client.api('/subscriptions').get();

      return response.value as Subscription[];
    } catch (error) {
      this.logger.error(`Error fetching subscriptions: ${error}`);
      return [];
    }
  }

  async getMessagesByEmail({
    email,
    options,
  }: {
    email: string;
    options?: GetOptions;
  }): Promise<Message[]> {
    const { filter, orderBy, select, skip = 1, top = 10 } = options;

    try {
      const messages = await this.client
        .api(`/users/${email}/messages`)
        // .filter(filter)
        // .orderby(orderBy)
        // .select(select)
        .top(top)
        .skip(skip)
        .get();

      return MessageMapper.fromGraphArray(messages.value);
    } catch (error) {
      if (!(error instanceof GraphClientError)) {
        throw error;
      }

      this.logger.error('Error fetching emails:', error);
    }
  }

  async getMessageByEmailWithId({
    email,
    id,
  }: {
    email: string;
    id: string;
  }): Promise<Message> {
    try {
      const message = await this.client
        .api(`/users/${email}/messages/${id}`)
        .get();

      return MessageMapper.fromGraph(message);
    } catch (error) {
      if (!(error instanceof GraphClientError)) {
        throw error;
      }

      this.logger.error('Error fetching email:', error);
    }
  }

  async getListAttachmentsByEmailWithId({
    email,
    id,
  }: {
    email: string;
    id: string;
  }): Promise<Attachment[]> {
    try {
      const attachments = await this.client
        .api(`/users/${email}/messages/${id}/attachments`)
        .get();

      return AttachmentMapper.fromGraphArray(attachments.value);
    } catch (error) {
      if (!(error instanceof GraphClientError)) {
        throw error;
      }

      this.logger.error('Error fetching attachments:', error);
    }
  }

  async getAttachmentByEmailWithId({
    email,
    messageId,
    attachmentId,
  }: {
    email: string;
    messageId: string;
    attachmentId: string;
  }): Promise<Attachment> {
    try {
      const attachment = await this.client
        .api(
          `/users/${email}/messages/${messageId}/attachments/${attachmentId}`,
        )
        .get();

      return AttachmentMapper.fromGraph(attachment);
    } catch (error) {
      if (!(error instanceof GraphClientError)) {
        throw error;
      }

      this.logger.error('Error fetching attachment:', error);
    }
  }
}
