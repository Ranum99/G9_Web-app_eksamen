import httpMocks from 'node-mocks-http'

import { getUserSlot } from '@/features/userSlot/userSlot.controller'
import prisma from '@/lib/clients/db'

const url = 'http://localhost:3000/api/users'

describe('UserSlotController', () => {
  beforeEach(async () => {
    await prisma.userSlot.deleteMany({})
  })

  //For sjekke om å lage user
  describe('when succesfully creating userSlot', () => {
    it('success=true', async () => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url,
        query: {
          slotId: 75,
          userId: 34,
        },
      })

      const response = await httpMocks.createResponse()

      const result = await getUserSlot(request, response)

      const data = await result._getJSONData()

      expect(result.statusCode).toBe(200)
      expect(data.success).toBe(true)
    })

    it('should have correct coupon', async () => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url,
        query: {
          slotId: 75,
          userId: 34,
        },
      })

      const response = await httpMocks.createResponse()

      const result = await getUserSlot(request, response)

      const data = await result._getJSONData()
      const coupon = data.data.coupon

      // Tar bort alt som ikke er et siffer
      const numbers = coupon.replace(/[^0-9]/g, '')

      expect(coupon.length).toBe(8)
      expect(numbers.length).toBe(4)
    })
  })

  describe('when getting userslot ', () => {
    it('should be same coupon and date ', async () => {
      const userslot1 = httpMocks.createRequest({
        method: 'GET',
        url,
        query: {
          slotId: 75,
          userId: 35,
        },
      })

      const userSlot2 = httpMocks.createRequest({
        method: 'GET',
        url,
        query: {
          slotId: 75,
          userId: 35,
        },
      })

      const responseOne = httpMocks.createResponse()
      const responseTwo = httpMocks.createResponse()

      const resultOne = await getUserSlot(userslot1, responseOne)
      const resultAsJsonOne = resultOne._getJSONData()

      const resultTwo = await getUserSlot(userSlot2, responseTwo)
      const resultAsJsonTwo = resultTwo._getJSONData()

      // Sjekker om begge er vellykket
      expect(resultAsJsonOne.success).toBe(true)
      expect(resultAsJsonTwo.success).toBe(true)
      expect(resultOne.statusCode).toBe(200)
      expect(resultTwo.statusCode).toBe(200)

      // Sjekker om data er likt
      expect(resultAsJsonOne).toEqual(resultAsJsonTwo)
    })
  })
})
