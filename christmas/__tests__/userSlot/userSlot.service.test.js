import { getUserSlot } from '@/features/userSlot/userSlot.service'

import axios from 'axios'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import prisma from '@/lib/clients/db'

const url = 'http://localhost:3000/api/userSlot'

describe('create UserSlot', () => {
  const server = setupServer()

  beforeEach(async () => {
    await prisma.userSlot.deleteMany({})
  })

  beforeAll(() => {
    server.listen()
  })

  afterEach(() => server.resetHandlers())
  afterAll(() => {
    server.close()
  })

  describe('when given slotid and userid', () => {
    it('should respond with a true success', async () => {
      server.use(
        rest.post(url, async (req, res, ctx) => {
          const { slotId, userId } = req.body

          const data = await getUserSlot(slotId, userId)

          return res(ctx.json(data))
        })
      )
      const response = await axios.post(url, { slotId: 73, userId: 33 })

      console.error('response')
      console.error(response)
      expect(response.data.success).toBe(true)
    })
  })

  describe('when given missing info', () => {
    it('should respond with false success', async () => {
      server.use(
        rest.get(url, async (req, res, ctx) => {
          const data = await getUserSlot()

          return res(ctx.json(data))
        })
      )

      const response = await axios.get(url)

      expect(response.data.success).toBe(false)
    })
  })
})
