import * as commentsController from '@/features/comments/comments.controller'

export default async function handler(req, res) {
  const { method } = req

  switch(method?.toLowerCase()) {
    case 'post':
      await commentsController.createComment(req, res);
      break;
    default: 
      res.status(405).end();
  }
}