import * as commentsRepo from './comments.repository'

export const create = async ( comment, issue_id ) => {
  // Sender data videre til repo for sjekk
  const createdComment = await commentsRepo.create( comment, issue_id );

  // Dersom det oppsår en feil blir det sendt en error med feilmelding
  if(!createdComment.success) {
    return { success: false, error: createdComment.error}
  }

  return { success: true, data: createdComment.data }
}