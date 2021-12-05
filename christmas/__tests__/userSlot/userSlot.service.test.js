import { createdUserSlot } from '@/features/userSlot/userSlot.service'

import axios from 'axios'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import prisma from '@/lib/clients/db'
import { fetch } from 'msw/lib/types/context'

const url = 'http://localhost:3000/api/userSlot'

describe('create  Slot', () => {
  const server = setupServer()

  beforeEach(async () => {
    prisma.userSlot.deleteMany({})
  })

  beforeAll(() => {
    server.listen()
  })

  afterEach(() => server.resetHandlers())
  afterAll(() => {
    server.close()
  })

  describe('creating slots', () => {
    describe('when given slotid  and  userid', () => {
      it('should respond with a true sucsess', async () => {
        server.use(
          rest.post(url, async (req, res, ctx) => {
            const { slotId, userId } = req.body

            const data = await createdUserSlot({ slotId, userId })

            return res(ctx.json(data))
          })
        )
        const response = await axios.post(url, { slotId: 2, userId: 3 })
        expect(response.data.success).toBe(true)
      })
    })
  })

  describe('when given missing info', () => {
    it('should respond with false sucsess', async () => {
      server.use(
        rest.post(url, async (req, res, ctx) => {
          const { slotId, userId } = req.body

          const data = await createdUserSlot({ slotId, userId })

          return res(ctx.json(data))
        })
      )

      const response = await axios.post(url)
      expect(response.data.success).toBe(false)
    })
  })

  describe('when given missing info', () => {
    it('should respond with false sucsess', async () => {
      server.use(
        rest.post(url, async (req, res, ctx) => {
          const { slotId, userId } = req.body

          const data = await createdUserSlot({ slotId, userId })

          return res(ctx.json(data))
        })
      )

      const response = await fetch(url)
      expect(response.data.success).toBe(false)
    })
  })
})
