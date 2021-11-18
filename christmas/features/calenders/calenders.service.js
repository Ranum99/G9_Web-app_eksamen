import * as calenderRepo from '@/features/calenders/calenders.repository'
import { Result } from '@/lib/api/result'


export const checkIfExsist = async (req, res, name = '') => {

  if (name == '') {
    return Result.failure(name.error)
   
  }

  const calander = await calenderRepo.doeNotExsist(name)

  // TODO: Returnere direkte ??
  if (calander?.success) {
    Result.failure(calander.error)
  }

  return Result.success(calander.data)
}



/*
export const checkIfExsist = async (req, res, name = '') => {
  if (name == '') {
    return {
      success: false,
      error: 'Name is missing',
    }
  }

  const calander = await calenderRepo.doeNotexsist(name)

  // TODO: Returnere direkte
  if (calander.success) {
    return calander
  } else {
    return calander
  }
}

*/