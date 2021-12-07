import * as issuesController from '@/features/issues/issues.controller'

export default async function handler(req, res) {
  const { method } = req

  switch(method?.toLowerCase()) {
    case 'post':
      await issuesController.createIssue(req, res);
      break;
    case 'get':
      await issuesController.listIssues(req, res);
      break;
    default: 
      res.status(405).end();
  }
}