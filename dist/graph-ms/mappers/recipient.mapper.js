"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipientMapper = void 0;
const email_address_mapper_1 = require("./email-address.mapper");
exports.RecipientMapper = {
    fromGraph: (recipient) => {
        return {
            emailAddress: email_address_mapper_1.EmailAddressMapper.fromGraph(recipient.emailAddress),
        };
    },
    fromGraphArray: (recipients) => {
        return recipients.map((recipient) => exports.RecipientMapper.fromGraph(recipient));
    },
};
