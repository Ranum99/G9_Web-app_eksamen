import * as commentsService from '@/features/comments/comments.service'

export const createComment = async (req, res) => {
  const { id } = req.query // id på issue som kommentaren skal kobles opp mot
  const { comment } = req.body

  // Sender data videre til service for sjekk
  const createdComment = await commentsService.create(
    comment, id 
  )

  // Dersom noe skulle skje serverside
  if(!createdComment.success) {
    return res.status(500).json({success: false, error: createdComment.error})
  }

  return res.status(201).json({success: true, data: createdComment.data})
}