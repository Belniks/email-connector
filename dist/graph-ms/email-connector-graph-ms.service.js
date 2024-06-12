"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EmailConnectorGraphMsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConnectorGraphMsService = void 0;
const common_1 = require("@nestjs/common");
const microsoft_graph_client_1 = require("@microsoft/microsoft-graph-client");
const identity_1 = require("@azure/identity");
const email_connector_options_interfaces_1 = require("../interfaces/email-connector-options.interfaces");
const message_mapper_1 = require("./mappers/message.mapper");
const attachment_mapper_1 = require("./mappers/attachment.mapper");
let EmailConnectorGraphMsService = EmailConnectorGraphMsService_1 = class EmailConnectorGraphMsService {
    constructor(options) {
        this.options = options;
        this.logger = new common_1.Logger(EmailConnectorGraphMsService_1.name);
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
        const credential = new identity_1.ClientSecretCredential(graphMSOptions.tenantId, graphMSOptions.clientId, graphMSOptions.clientSecret);
        this.client = microsoft_graph_client_1.Client.initWithMiddleware({
            authProvider: {
                getAccessToken: async () => {
                    try {
                        const tokenResponse = await credential.getToken([
                            'https://graph.microsoft.com/.default',
                        ]);
                        return tokenResponse.token;
                    }
                    catch (error) {
                        this.logger.error('Error getting access token:', error);
                    }
                },
            },
        });
    }
    async listenForNewEmails({ email, notificationUrl, }) {
        try {
            const subscription = (await this.client.api('/subscriptions').post({
                changeType: 'created',
                notificationUrl: notificationUrl,
                resource: `/users/${email}/messages`,
                expirationDateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
                latestSupportedTlsVersion: 'v1_2',
                clientState: this.options.graphMS.clientState,
            }));
            this.logger.log(`Subscription created: ${subscription.id}`);
            return subscription;
        }
        catch (error) {
            this.logger.error(`Error creating subscription: ${error}`);
        }
    }
    async getMessagesByEmail({ email, options, }) {
        const { filter, orderBy, select, skip = 1, top = 10 } = options;
        try {
            const messages = await this.client
                .api(`/users/${email}/messages`)
                .top(top)
                .skip(skip)
                .get();
            return message_mapper_1.MessageMapper.fromGraphArray(messages.value);
        }
        catch (error) {
            if (!(error instanceof microsoft_graph_client_1.GraphClientError)) {
                throw error;
            }
            this.logger.error('Error fetching emails:', error);
        }
    }
    async getMessageByEmailWithId({ email, id, }) {
        try {
            const message = await this.client
                .api(`/users/${email}/messages/${id}`)
                .get();
            return message_mapper_1.MessageMapper.fromGraph(message);
        }
        catch (error) {
            if (!(error instanceof microsoft_graph_client_1.GraphClientError)) {
                throw error;
            }
            this.logger.error('Error fetching email:', error);
        }
    }
    async getListAttachmentsByEmailWithId({ email, id, }) {
        try {
            const attachments = await this.client
                .api(`/users/${email}/messages/${id}/attachments`)
                .get();
            return attachment_mapper_1.AttachmentMapper.fromGraphArray(attachments.value);
        }
        catch (error) {
            if (!(error instanceof microsoft_graph_client_1.GraphClientError)) {
                throw error;
            }
            this.logger.error('Error fetching attachments:', error);
        }
    }
    async getAttachmentByEmailWithId({ email, messageId, attachmentId, }) {
        try {
            const attachment = await this.client
                .api(`/users/${email}/messages/${messageId}/attachments/${attachmentId}`)
                .get();
            return attachment_mapper_1.AttachmentMapper.fromGraph(attachment);
        }
        catch (error) {
            if (!(error instanceof microsoft_graph_client_1.GraphClientError)) {
                throw error;
            }
            this.logger.error('Error fetching attachment:', error);
        }
    }
};
exports.EmailConnectorGraphMsService = EmailConnectorGraphMsService;
exports.EmailConnectorGraphMsService = EmailConnectorGraphMsService = EmailConnectorGraphMsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(email_connector_options_interfaces_1.EMAIL_CONNECTOR_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], EmailConnectorGraphMsService);
