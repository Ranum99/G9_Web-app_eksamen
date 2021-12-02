import { Result } from '@/lib/api/result'
import * as adminUserSlotRepo from '@/features/admin/userSlot.repository'

export const drawSuperBonus = async (req, res, id) => {
  if (!Number(id)) {
    return Result.failure('ID må være et tall')
  }

  if (Number(id) < 0) {
    return Result.failure('ID må være større enn 0')
  }

  // TODO: Sjekke om en slot med rett ID finnes i kalenderen

  const response = await adminUserSlotRepo.getUserSlots(id)
  console.log(response)

  if (response.data.length == 0) {
    return Result.failure('Ingen har detlatt på denne luka')
  }

  const winnerIndex = Math.floor(Math.random() * response.data.length)
  const winner = response.data[winnerIndex]

  return Result.success(winner)
}
