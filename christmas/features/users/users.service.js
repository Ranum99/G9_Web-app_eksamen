import * as userRepo from '@/features/users/users.repository'
import { Result } from '@/lib/api/result'

export const getUsers = async () => {
  const users = await userRepo.getUsers()

  if (users?.success) {
    Result.failure(users.error)
  }

  return Result.success(users.data)
}
