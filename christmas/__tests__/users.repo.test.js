import * as userRepo from '@/features/users/users.repository'
import * as userControl from '@/features/users/users.controller'
import httpMocks from 'node-mocks-http'

import { prismaMock } from '../../__mocks__/prismaMock'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

describe('get all usersr test'),
  async () => {
    const result = await userControl.getUsers(request, response)

    expect(result.statusCode).toBe(200)
  }
