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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConnectorGraphMsService = void 0;
const common_1 = require("@nestjs/common");
const microsoft_graph_client_1 = require("@microsoft/microsoft-graph-client");
const identity_1 = require("@azure/identity");
const email_connector_options_interfaces_1 = require("../interfaces/email-connector-options.interfaces");
let EmailConnectorGraphMsService = class EmailConnectorGraphMsService {
    constructor(options, client) {
        this.options = options;
        this.client = client;
        const credential = new identity_1.ClientSecretCredential(this.options.tenantId, this.options.clientId, this.options.clientSecret);
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
                        throw error;
                    }
                },
            },
        });
    }
    async getEmailsByEmail(email) {
        try {
            const messages = await this.client
                .api(`/users/${email}/messages`)
                .select('subject,from,receivedDateTime')
                .top(10)
                .get();
            messages.value.forEach((message, index) => {
                console.log(`${index + 1}. Subject: ${message.subject}`);
                console.log(`   From: ${message.from.emailAddress.name} <${message.from.emailAddress.address}>`);
                console.log(`   Received: ${message.receivedDateTime}`);
                console.log('-----------------------------------------');
            });
        }
        catch (error) {
            if (!(error instanceof microsoft_graph_client_1.GraphClientError)) {
                throw error;
            }
            console.error('Error fetching emails:', error);
        }
    }
};
exports.EmailConnectorGraphMsService = EmailConnectorGraphMsService;
exports.EmailConnectorGraphMsService = EmailConnectorGraphMsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(email_connector_options_interfaces_1.GRAPH_MS_OPTIONS)),
    __metadata("design:paramtypes", [Object, microsoft_graph_client_1.Client])
], EmailConnectorGraphMsService);
