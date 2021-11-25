import * as userRepo from '@/features/users/users.repository'
import { Result } from '@/lib/api/result'

export const getUsers = async () => {
  const users = await userRepo.getUsers()

  if (users?.success) {
    Result.failure(users.error)
  }

  console.log(users)
  return Result.success(users.data)
}

/*
    if (users.data == 0) {
      return {
        success: false,
        error: 'Fant ingen brukere',
      }
    }
    return users
  } else {
    return users
  }
}
*/
