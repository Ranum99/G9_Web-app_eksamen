import { useCallback, useState } from 'react'

export const useCounter = (initialValue = 0) => {
  const [counter, setCounter] = useState(initialValue)

  const add = useCallback((delta = 1) => setCounter(counter => counter + delta), [setCounter])
  const subtract = useCallback((delta = 1) => setCounter(counter => counter - delta), [setCounter])


  return { add, subtract, counter }

  /* return (
    <>
      Count: {counter}
      {add, substract}
    </>
  ) */
}


