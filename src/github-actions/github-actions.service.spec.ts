import { Test, TestingModule } from '@nestjs/testing';
import { GithubActionsService } from './github-actions.service';

describe('GithubActionsService', () => {
  let service: GithubActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubActionsService],
    }).compile();

    service = module.get<GithubActionsService>(GithubActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
