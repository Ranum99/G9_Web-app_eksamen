/**
 * @jest-environment jsdom
 */

import React from 'react'
import ColorPicker from '../components/ColorPicker'
import { render } from '@testing-library/react'

describe('ColorPicker', () => {
  it('should render a list of all colors passed to it', () => {
    const mockProps = {
      colors: ['red', 'blue', 'green'],
      auth: {},
      selectedColor: 'blue',
      handleSelectedColor: jest.fn(),
    }

    render(<ColorPicker {...mockProps} />)

    expect(document.querySelector('ul').children.length).toBe(3)
  })
  it('should have disabled button if color does not match', () => {
    const mockProps = {
      colors: ['red', 'blue', 'green'],
      auth: {},
      selectedColor: 'blue',
      handleSelectedColor: jest.fn(),
    }

    render(<ColorPicker {...mockProps} />)

    const children = document.querySelector('ul').children

    expect(children[0].childNodes[0]).toBeDisabled()
    expect(children[2].childNodes[0]).toBeDisabled()
  })
  it('should have one active button if color match', () => {
    const mockProps = {
      colors: ['red', 'blue', 'green'],
      auth: {},
      selectedColor: 'blue',
      handleSelectedColor: jest.fn(),
    }

    render(<ColorPicker {...mockProps} />)

    const children = document.querySelector('ul').children

    expect(children[1].childNodes[0]).toBeEnabled()
  })

  it('should have called onClick on button', async () => {
    const mockProps = {
      colors: ['red', 'blue', 'green'],
      auth: {},
      selectedColor: 'blue',
      handleSelectedColor: jest.fn(),
    }
  })
  it('should not have called onClick on disabled button', async () => {
    const mockProps = {
      colors: ['red', 'blue', 'green'],
      auth: {},
      selectedColor: 'blue',
      handleSelectedColor: jest.fn(),
    }
  })

  it('should updated selectedColor and active buttons on click', async () => {
    const mockProps = {
      colors: ['red', 'blue', 'green'],
      auth: {},
      selectedColor: 'blue',
      handleSelectedColor: jest.fn(),
    }

    render(<ColorPicker {...mockProps} />)

    const children = document.querySelector('ul').children

    // Hvis det her feiler så er det et dårlig tegn
    // Sjekker om kanpper er disablet/enablet som de skal være
    expect(children[1].childNodes[0]).toBeEnabled()
    expect(children[0].childNodes[0]).toBeDisabled()
    expect(children[2].childNodes[0]).toBeDisabled()

    //fireEvent.click(children[0].childNodes[0])

    //children[0].childNodes[0].simulate('click')

    //expect(children[0].childNodes[0]).toBeEnabled()
  })
})
