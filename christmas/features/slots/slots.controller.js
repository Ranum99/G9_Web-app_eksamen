import prisma from "@/lib/clients/db"
import * as slotsRepository from "@/features/slots/slots.repository"
import * as slotService from "./slots.service"
import { rest } from "msw"

export const getSlots = async(id) => {
 
    if (!Number(id)) { return res.status(400).json({success: false,   error: `${id} er ikke et tall`,  })    }
    
    //if it doesnt  exsist 
    else if(!slotService.checkIfExsist(id)){ return rest.status(400).json({success: true, error: `${id} er does not exsist et tall`,})}
   
   
    const slots = await prisma.slot.findMany({
      where: {
        calender: {
          is: {
            id: Number(calenderId),
          },
        },
      },
    })

   res.status(200).json({ success: true, data: slots })
  
  return slots

}