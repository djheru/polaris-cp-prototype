import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

const {
  GITHUB_USER_NAME: owner = '',
  GITHUB_REPO_NAME: repo = '',
  GITHUB_TOKEN: auth = '',
} = process.env;

export const exampleParams = {
  VizVectar: {
    application_id: 'viz1',
    instance_type: 't2.micro',
    ami: 'ami-0abcdef1234567890',
  },
  Chyron: {
    application_id: 'chyron1',
    instance_type: 't2.micro',
    ami: 'ami-0abcdef1234567890',
  },
  TagVS: {
    application_id: 'tagvs1',
    instance_type: 't2.micro',
    ami: 'ami-0abcdef1234567890',
  },
  Telos: {
    application_id: 'telos1',
    instance_type: 't2.micro',
    ami: 'ami-0abcdef1234567890',
  },
};

@Injectable()
export class GithubActionsService {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({ auth });
  }

  async triggerApplyWorkflow(applications: { [key: string]: any }) {
    try {
      const workflow_id = 'terraform_apply.yml';
      const ref = 'main';
      console.log({ owner, repo, workflow_id, ref });
      const response = await this.octokit.actions.createWorkflowDispatch({
        owner,
        repo,
        workflow_id,
        ref,
        inputs: {
          applications: JSON.stringify(applications),
        },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
}
