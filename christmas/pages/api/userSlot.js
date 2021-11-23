import * as userSlotController from '@/features/userSlot/userSlot.controller'

export default async function handler(req, res) {
  console.log('\n\n\n\n')

  switch (req.method.toLowerCase()) {
    case 'get':
      userSlotController.getUserSlot(req, res)
      break
    default:
      res.status(405)
      res.json({
        success: false,
        error: `${req.method} er ikke tillatt`,
      })
      res.end()
  }
}
