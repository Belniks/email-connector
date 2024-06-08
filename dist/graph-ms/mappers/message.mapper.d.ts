import { Message } from '../interfaces';
export declare const MessageMapper: {
    fromGraph: (message: any) => Message;
    fromGraphArray: (messages: any[]) => Message[];
};
