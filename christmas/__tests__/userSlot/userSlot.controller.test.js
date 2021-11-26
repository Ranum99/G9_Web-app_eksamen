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

      expect(result.statusCode).toBe(201 || 200)

    })
  })


  describe("when checking if users exsist", ()=> {
    it("return true when given info about exsisting user ", () => {

      releaseEvents
    })   
    
  })
})