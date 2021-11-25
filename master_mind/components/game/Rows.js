/* eslint-disable no-param-reassign */
/* eslint-disable no-ternary */
import { useCallback } from 'react'

import ColorPicker from './ColorPicker'
import Row from './Row'
import Solution from './Solution'
import { useGameContext } from '@/contexts/game-context'
import axios from 'axios'

const Rows = () => {
  const { state, dispatch } = useGameContext()

  const isCurrentRow = useCallback(
    (rowNumber) => {
      return rowNumber === state?.currentRow
    },
    [state.currentRow]
  )

  const handleRowSubmit = async (event) => {
    event.preventDefault()

    try {
      const hintsData = await axios.get('../api/hint', {
        params: {
          state: state
        }
      })
      const hints = hintsData.data.data;
      dispatch({ type: 'set_hints', payload: { hints } })
      if (hints?.positions === 4) {
        finishGame(true)

        dispatch({ type: 'set_complete' })
      } else {
        if(state.currentRow === 9) {
          finishGame(false)
        }
        dispatch({ type: 'increase_row' })
      }
    } catch(error) {
      alert(error)
      console.log(error);
    }
  }

  const finishGame = async (finished) => {
    const game = await axios.post('../api/game', {
      combination: state.selectedColors,
      numberOfTries: state.currentRow,
      foundCombination: finished
    })
    if(!game.data.success)
      alert(game.data.error)
  }

  const handleCellClick = (event) => {
    const { cell } = event.currentTarget.dataset

    if (state.currentColor) {
      dispatch({ type: 'set_row_colors', payload: { cell } })
    }
  }

  const handleSelectedColor = async (color) => {
    if (state?.currentColor === color) {
      dispatch({ type: 'reset_picked_color' })
    } else {
      dispatch({ type: 'picked_color', payload: { color } })
    }
  }

  return (
    <div className="rows">
      {state?.isComplete ? (
        <Solution
          row={state.rows[state.currentRow]}
          foundCombination={state?.foundCombination}
        />
      ) : null}
      {!state?.isComplete &&
        state?.rows?.map((row) => (
          <div className="row-wrapper" key={row?.name}>
            <form onSubmit={handleRowSubmit}>
              <div
                style={{
                  opacity: isCurrentRow(row?.number) ? 1 : 0.2,
                  pointerEvents: !isCurrentRow(row?.number) ? 'none' : 'auto',
                }}
              >
                <Row
                  name={row?.name}
                  number={row?.number}
                  hints={row?.hints}
                  pegs={row?.pegs}
                  cells={row?.cells}
                  handleCellClick={handleCellClick}
                />
                <button
                  disabled={state.selectedColors.length !== 4}
                  className=""
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
            {isCurrentRow(row?.number) ? (
              <ColorPicker
                colors={state?.remaningColors}
                selectedColor={state?.currentColor}
                handleSelectedColor={handleSelectedColor}
              />
            ) : null}
          </div>
        ))}
    </div>
  )
}

export default Rows
