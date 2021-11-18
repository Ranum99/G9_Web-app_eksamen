import * as slotsRepository from '@/features/slots/slots.repository'

import { UserErrors } from './user.errors'
import * as usersRepo from './users.repository'
import { Result } from '@/lib/api/result'

export const checkIfExsist = async (id) => {
  const calander = await slotsRepository.exsist(id)

  // TODO: Bare returnere direkte
  //hvis feil ved henting
  if (!calander?.success) {
    Result.failure(calander.error)
  }

    return Result.success(calander.data)

}




//old
/*
export const checkIfExsist = async (id) => {
  const calander = await slotsRepository.exsist(id)

  // TODO: Bare returnere direkte?
  if (calander.success) {
    return calander
  } else {
    return calander
  }
}
*/