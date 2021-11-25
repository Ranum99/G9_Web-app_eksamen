import * as hintsService from '@/features/hints/hints.service'

export const getHints = async (req, res) => {
  const { state } = req.query;

  const hints = await hintsService.getHints(state)

  /* if(!hints.success)
    return res.status(500).json({success: false, data: hints.error}) */


  return res.status(200).json({success: true, data: hints.data})
}