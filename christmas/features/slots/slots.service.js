import * as slotsRepository from '@/features/slots/slots.repository'
import { Result } from '@/lib/api/result'

export const checkIfExsist = async (id) => {
  const calander = await slotsRepository.exsist(id)

  if (!calander?.success) {
    Result.failure(calander.error)
  }

  return Result.success(calander.data)
}
