import { useCallback, useState } from 'react'

export const useCounter = (initialValue = 0) => {
  const [counter, setCounter] = useState(initialValue)

  const add = useCallback((delta = 1) => setCounter(counter => counter + delta), [setCounter])
  const substract = useCallback((delta = 1) => setCounter(counter => counter - delta), [setCounter])

  return (
    <>
      Count: {counter}
      {add, substract}
    </>
  )
}


