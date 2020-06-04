import { Test, TestingModule } from '@nestjs/testing';
import { SessionsResolver } from './sessions.resolver';

describe('SessionsResolver', () => {
  let resolver: SessionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionsResolver],
    }).compile();

    resolver = module.get<SessionsResolver>(SessionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
