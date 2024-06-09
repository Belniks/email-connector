"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmailConnectorModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConnectorModule = void 0;
const common_1 = require("@nestjs/common");
const email_connector_options_interfaces_1 = require("./interfaces/email-connector-options.interfaces");
const email_connector_graph_ms_service_1 = require("./graph-ms/email-connector-graph-ms.service");
let EmailConnectorModule = EmailConnectorModule_1 = class EmailConnectorModule {
    static forRoot(options) {
        if (options.gmail === undefined && options.graphMS === undefined) {
            throw new Error('You must provide at least one email provider');
        }
        const optionProviders = {
            provide: email_connector_options_interfaces_1.EMAIL_CONNECTOR_OPTIONS,
            useValue: options,
        };
        return {
            module: EmailConnectorModule_1,
            providers: [optionProviders, email_connector_graph_ms_service_1.EmailConnectorGraphMsService],
            exports: [email_connector_graph_ms_service_1.EmailConnectorGraphMsService],
        };
    }
    static forRootAsync(options) {
        const providers = this.createAsyncProviders(options);
        return {
            module: EmailConnectorModule_1,
            imports: options.imports || [],
            providers: providers,
            exports: [email_connector_graph_ms_service_1.EmailConnectorGraphMsService],
        };
    }
    static createAsyncProviders(options) {
        const providers = [email_connector_graph_ms_service_1.EmailConnectorGraphMsService];
        if (options.useFactory) {
            return [...providers, this.createAsyncOptionsProvider(options)];
        }
        return providers;
    }
    static createAsyncOptionsProvider(options) {
        return {
            provide: email_connector_options_interfaces_1.EMAIL_CONNECTOR_OPTIONS,
            useFactory: options.useFactory,
            inject: options.inject || [],
        };
    }
};
exports.EmailConnectorModule = EmailConnectorModule;
exports.EmailConnectorModule = EmailConnectorModule = EmailConnectorModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], EmailConnectorModule);
