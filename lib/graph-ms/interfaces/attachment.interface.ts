export interface Attachment {
  id: string;
  name: string;
  contentType: string;
  contentBytes?: Buffer;
  size: number;
  isInline: boolean;
  lastModifiedDateTime: Date;
}
