"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAddressMapper = void 0;
exports.EmailAddressMapper = {
    fromGraph: (emailAddress) => {
        return {
            address: emailAddress.address,
            name: emailAddress.name,
        };
    },
};
