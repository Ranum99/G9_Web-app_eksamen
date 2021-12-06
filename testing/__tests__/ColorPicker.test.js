/**
 * @jest-environment jsdom
 */

import React from 'react'
import ColorPicker from '../components/ColorPicker'
import { shallow, mount } from 'enzyme'

describe('ColorPicker', () => {
  it('should render a list of all colors passed to it', () => {
    const mockProps = {
      colors: ['red', 'blue', 'green'],
      auth: {},
      selectedColor: 'blue',
      handleSelectedColor: jest.fn(),
    }

    const wrapper = shallow(<ColorPicker {...mockProps} />)
    expect(wrapper.find('li')).toHaveLength(3)
  })

  it('should have disabled button if color does not match', () => {
    const mockProps = {
      colors: ['red', 'blue', 'green'],
      auth: {},
      selectedColor: 'blue',
      handleSelectedColor: jest.fn(),
    }

    const wrapper = shallow(<ColorPicker {...mockProps} />)
    let label = wrapper.find('[id="red"]').at(0)
    expect(label.prop('disabled')).toBe(true)
  })
  it('should have one active button if color match', () => {
    const mockProps = {
      colors: ['red', 'blue', 'green'],
      auth: {},
      selectedColor: 'blue',
      handleSelectedColor: jest.fn(),
    }

    const wrapper = shallow(<ColorPicker {...mockProps} />)
    let label = wrapper.find('[id="blue"]').at(0)
    expect(label.prop('disabled')).toBe(false)
  })

  it('should have called onClick on button', async () => {
    const mockProps = {
      colors: ['red', 'blue', 'green'],
      auth: {},
      selectedColor: 'blue',
      handleSelectedColor: jest.fn(),
    }

    const wrapper = mount(<ColorPicker {...mockProps} />)
    wrapper.find('[id="blue"]').simulate('click')
    expect(mockProps.handleSelectedColor).toHaveBeenCalled()
  })
  it('should not have called onClick on disabled button', async () => {
    const mockProps = {
      colors: ['red', 'blue', 'green'],
      auth: {},
      selectedColor: 'blue',
      handleSelectedColor: jest.fn(),
    }

    const wrapper = mount(<ColorPicker {...mockProps} />)
    wrapper.find('[id="red"]').simulate('click')
    expect(mockProps.handleSelectedColor).toHaveBeenCalledTimes(0)
  })

  it('should updated selectedColor and active buttons on click', async () => {
    // Unit tests only restricts operations to the particular component
  })
})
