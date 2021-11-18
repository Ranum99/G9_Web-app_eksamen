import * as usersService from './users.service'
import { ApiResponse } from '@/lib/api/apiResponse'


export const getUsers = async (req, res) => {
  const users = await usersService.getUsers()

  // TODO: Kan bare returnere, vell
  if (!users?.success) {

    return ApiResponse(res).serverError(users.error)
  }

  return ApiResponse(res).ok(users)
}
    //old
    /*return users
  } else {
    return users
  }
}*/
