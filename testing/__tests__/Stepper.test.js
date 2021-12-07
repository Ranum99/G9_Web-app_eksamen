/**
 * @jest-environment jsdom
 */
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Stepper from '../components/Stepper'

describe('Stepper component', () => {
  beforeEach(() => {
    render(<Stepper />)
  })

  it('should render button', () => {
    const button = document.querySelector('button')
    expect(button).toBeTruthy()
  })

  it('should have correct text content on button', () => {
    const button = document.querySelector('button')
    expect(button).toHaveTextContent('Game')
  })

  it('should update step-count and button content on click', () => {
    const button = document.querySelector('button')
    expect(button).toHaveTextContent('Game')
    fireEvent.click(button)
    expect(button).toHaveTextContent('End')
  })

  it('should remove button when step count is higher than amount of steps', async () => {
    const button = document.querySelector('button')
    expect(button).toHaveTextContent('Game')
    fireEvent.click(button)
    expect(button).toHaveTextContent('End')
    fireEvent.click(button)
    expect(document.querySelector('button')).toBe(null)
  })
})
