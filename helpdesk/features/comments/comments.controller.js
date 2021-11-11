import * as commentsService from '@/features/comments/comments.service'

export const createComment = async (req, res) => {
  const { id } = req.query
  const { comment, created_at } = req.body

  const createdComment = await commentsService.create(
    comment, id, created_at 
  )

  if(!createdComment.success) {
    return res.status(500).json({success: false, error: createdComment.error})
  }

  return res.status(201).json({success: true, data: createdComment.data})
}