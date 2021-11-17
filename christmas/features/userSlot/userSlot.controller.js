import * as userSlotService from '@/features/userSlot/userSlot.service'

export const getUserSlot = async (req, res) => {
  const { slotId, userId } = req.query

  console.log(slotId)
  console.log(userId)

  if (!slotId || !userId) {
    return res.status(400).json({
      success: false,
      error: 'Mangler slotId og/eller userId',
    })
  }

  const userSlot = await userSlotService.getUserSlot({
    slotId,
    userId,
  })

  if (!userSlot.success) {
    switch (userSlot?.type) {
      case 'User.NotExsist':
        return res.status(404).json({
          success: false,
          error: userSlot.error,
        })
      case 'Slot.NotExsist':
        return res.status(404).json({
          success: false,
          error: userSlot.error,
        })
      case 'UserSlot.Exist':
        return res.status(409).json({
          success: false,
          error: userSlot.error,
        })
      default:
        return res.status(500).json({
          success: false,
          error: userSlot.error,
        })
    }
  }
}
