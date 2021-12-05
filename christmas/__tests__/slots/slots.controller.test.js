import * as slotsCont from '@/features/slots/slots.controller'

it('get all usersr test'),
  async () => {
    console.log('test')
    const result = await slotsCont.checkifExsist(request, response)

    console.log('Vikrer')

    expect(result.statusCode).toBe(200)
  }
