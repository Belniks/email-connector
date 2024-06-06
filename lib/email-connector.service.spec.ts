import { Test, TestingModule } from '@nestjs/testing';
import { EmailConnectorService } from './email-connector.service';

describe('EmailConnectorService', () => {
  let service: EmailConnectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailConnectorService],
    }).compile();

    service = module.get<EmailConnectorService>(EmailConnectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
