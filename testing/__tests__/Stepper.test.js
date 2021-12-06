/**
 * @jest-environment jsdom
 */
import React from 'react'
import Stepper from '../components/Stepper'
import { shallow } from 'enzyme'

let wrapper
beforeEach(() => {
  const stepsMock = [{ name: 'John' }, { name: 'Doe' }, { name: 'End' }]
  wrapper = shallow(<Stepper steps={stepsMock} />)
})

describe('Stepper component', () => {
  it('should render button', () => {
    expect(wrapper.find('button')).toHaveLength(1)
  })

  it('should have correct text content on button', () => {
    expect(wrapper.text()).toEqual('Doe')
  })

  it('should update step-count and button content on click', () => {
    wrapper.find('button').simulate('click')
    expect(wrapper.text()).toEqual('End')
  })

  it('should remove button when step count is higher than amount of steps', async () => {
    wrapper.find('button').simulate('click')
    wrapper.find('button').simulate('click')
    expect(wrapper.find('button')).toHaveLength(0)
  })
})

