import httpMocks from 'node-mocks-http'

import { getUserSlot} from '@/features/userSlot/userSlot.controller'
import prisma from '@/lib/clients/db'

const url = 'http://localhost:3000/api/users'

describe("sometihing", () =>{
  beforeEach(async () => {
    await prisma.UserSlot.deleteMany({})
  })

  

  //For sjekke om å lage user
  describe("when creating user ", ()=>{

    it("return 201 created", ()=>{
      const request = httpMocks.createRequest({
        method: 'POST',
        url,
        body: {
          slotId: 1,
          userId: 2
        },
      })

      const response =  httpMocks.createRequest()

   
      const result = await getUserSlot(request, response)

      expect(result.statusCode).toBe(201)

    })
  })


  describe("when crating users", ()=> {
    it("return sucsess false  creating exsisting usersSlot ", () => {
      // todo create userSlot
      const userslot1 = httpMocks.createRequest({
        method: 'POST',
        url,
        body: {
          slotId: 1,
          userId: 2
        },
      })

      const userSlot2 = httpMocks.createRequest({
        method: 'POST',
        url,
        body: {
          slotId: 1,
          userId: 2
        },
      })


      const responseOne = httpMocks.createResponse()
      const responseTwo = httpMocks.createResponse()


      const resultOne = await getUserSlot(userslot1, responseOne)
      const resultAsJsonOne = resultOne._getJSONData()


      const resultOne = await getUserSlot(userSlot2, responseTwo)
      const resultAsJsonOne = resultOne._getJSONData()
      
    
      //TODO create userSlot  with same info
      expect(resultAsJsonOne.success).toBe(true)
      expect(resultAsJsonTwo.success).toBe(false)
      expect(resultOne.statusCode).toBe(201)
      expect(resultTwo.statusCode).toBe(409)
    })   
    
  })
})