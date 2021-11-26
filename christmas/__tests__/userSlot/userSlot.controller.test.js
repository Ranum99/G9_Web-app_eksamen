import { createdUserSlot  } from '@/features/userSlot/userSlot.service'

import axios from 'axios'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import prisma from '@/lib/clients/db'
const url = 'http://localhost:3000/api/userSlot'

describe("create  Slot", () =>{
  describe("when given missing info", () =>{
    it("should respond with false sucsess", async()=>{
      const data = createdUserSlot({})
    })


  })

  



})