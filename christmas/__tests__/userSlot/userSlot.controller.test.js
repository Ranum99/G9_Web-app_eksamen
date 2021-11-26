import httpMocks from 'node-mocks-http'

import { getUserSlot} from '@/features/userSlot/userSlot.controller'
import prisma from '@/lib/clients/db'

const url = 'http://localhost:3000/api/users'

describe("sometihing", () =>{
  beforeEach(async () => {
    await prisma.UserSlot.deleteMany({})
  })
})