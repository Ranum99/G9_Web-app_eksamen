import * as slotscont from '@/features/slots/slots.controller'


describe ("get all usersr test"), () => {
  const result = await slotsCont.checkifExsist(request, response);


  expect(result.statusCode).toBe(200)
}

