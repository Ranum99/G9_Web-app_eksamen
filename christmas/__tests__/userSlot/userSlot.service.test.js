// I testene brukes post istedenfor get, selv om APIet bruker get forespørlser. Grunnen til det er at det dermed blir mer oversiktlig å legge legge til data i forespørslene

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

      expect(response.data.success).toBe(true)
    })
  })

  describe('when slotID is wrong', () => {
    it(' success = false', async () => {
      server.use(
        rest.post(url, async (req, res, ctx) => {
          const { slotId, userId } = req.body

          const data = await getUserSlot(slotId, userId)

          return res(ctx.json(data))
        })
      )

      const response = await axios.post(url, { slotId: 0, userId: 33 })

      expect(response.data.success).toBe(false)
    })

    it('type=Slot.NotFound and error:"Slot ikke funnet', async () => {
      server.use(
        rest.post(url, async (req, res, ctx) => {
          const { slotId, userId } = req.body

          const data = await getUserSlot(slotId, userId)

          return res(ctx.json(data))
        })
      )

      const response = await axios.post(url, { slotId: 0, userId: 33 })

      expect(response.data.type).toBe('Slot.NotFound')
      expect(response.data.error).toBe('Slot ikke funnet')
    })

    it('wrong userId should give success = false', async () => {
      server.use(
        rest.post(url, async (req, res, ctx) => {
          const { slotId, userId } = req.body

          const data = await getUserSlot(slotId, userId)

          return res(ctx.json(data))
        })
      )

      const response = await axios.post(url, { slotId: 73, userId: 3 })

      expect(response.data.success).toBe(false)
    })
  })

  describe('when userId is wrong', () => {
    it('success = false', async () => {
      server.use(
        rest.post(url, async (req, res, ctx) => {
          const { slotId, userId } = req.body

          const data = await getUserSlot(slotId, userId)

          return res(ctx.json(data))
        })
      )

      const response = await axios.post(url, { slotId: 75, userId: 3 })

      expect(response.data.success).toBe(false)
    })

    it('type=User.NotFound and error:"User ikke funnet', async () => {
      server.use(
        rest.post(url, async (req, res, ctx) => {
          const { slotId, userId } = req.body

          const data = await getUserSlot(slotId, userId)

          return res(ctx.json(data))
        })
      )

      const response = await axios.post(url, { slotId: 75, userId: 3 })

      expect(response.data.type).toBe('User.NotFound')
      expect(response.data.error).toBe('Bruker ikke funnet')
    })

    it('wrong userId should give success = false', async () => {
      server.use(
        rest.post(url, async (req, res, ctx) => {
          const { slotId, userId } = req.body

          const data = await getUserSlot(slotId, userId)

          return res(ctx.json(data))
        })
      )

      const response = await axios.post(url, { slotId: 73, userId: 3 })

      expect(response.data.success).toBe(false)
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
