import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import userEnent from '@testing-library/user-event'
import { RenderInput } from './RenderInput'
// 毎回itの後に実行
afterEach(() => cleanup())

describe('Rendering', () => {
  it('Should render all the elements correctly', () => {
    render(<RenderInput />)
    expect(screen.getByRole('button')).toBeTruthy()
    // placeholderでinput特定
    expect(screen.getByPlaceholderText('Enter')).toBeTruthy()
  })
})

describe('Input form onChange event', () => {
  it('Should update input value correctly', () => {
    render(<RenderInput />)
    const inputValue = screen.getByPlaceholderText('Enter')
    // testという文字列入力をシュミレート
    userEnent.type(inputValue, 'test')
    expect(inputValue.value).toBe('test')
  })
})

describe('Console button conditionally triggered', () => {
  it('Should not trigger output function', () => {
    // jestでモック関数を定義
    const outputConsole = jest.fn()
    render(<RenderInput outputConsole={outputConsole} />)
    userEnent.click(screen.getByRole('button'))
    expect(outputConsole).not.toHaveBeenCalled()
  })
  it('Should trigger output function', () => {
    const outputConsole = jest.fn()
    render(<RenderInput outputConsole={outputConsole} />)
    const inputValue = screen.getByPlaceholderText('Enter')
    userEnent.type(inputValue, 'test')
    userEnent.click(screen.getByRole('button'))
    expect(outputConsole).toHaveBeenCalledTimes(1)
  })
})
