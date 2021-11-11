import * as commentsRepo from './comments.repository'

export const create = async ( comment, issue_id ) => {
  const createdComment = await commentsRepo.create( comment, issue_id );

  if(!createdComment.success) {
    return { success: false, error: createdComment.error}
  }

  return { success: true, data: createdComment.data }
}