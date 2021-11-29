import { Result } from '@/lib/api/result'
import * as adminUserSlotRepo from '@/features/admin/userSlot.repository'

export const getUserSlots = async (req, res, id) => {
  // Trigges dersom ID er 0
  if (!Number(id)) {
    return Result.failure('ID må være et tall')
  }

  if (Number(id) < 0) {
    return Result.failure('ID må være større enn 0')
  }

  // TODO: Sjekke om en slot med rett ID finnes i kalenderen

  const response = await adminUserSlotRepo.getUserSlots(id)

  return response
}
