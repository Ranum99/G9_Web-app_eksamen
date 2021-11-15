import prisma from '@/lib/clients/db'
import * as calenderController from "@/features/calenders/calenders.controller"

export default async function handler(req, res) {
  const { name } = req.query

  if (req.method.toLowerCase() === 'get') {
    calenderController.getCalenders(name)
  }


  else
  //could also just use 404 i guess
    res.status(400).json({message: "Calander not found"})
}
