import React from 'react'
import { render, screen } from '@testing-library/react'
import { Render } from './Render'

// タイトル
describe('Rendering', () => {
  // テストケースの内容
  it('Should render all the elements correctly', () => {
    // Renderコンポーネントを取得(HTML構造)
    render(<Render />)
    // 取得したコンポーネントにアクセス
    // screen.debug();
    // https://github.com/A11yance/aria-query#elements-to-role
    // screen.debug(screen.getByRole('heading'))

    // 存在の判定
    // jestjs.io/docs/en/expect
    expect(screen.getByRole('heading')).toBeTruthy()
    expect(screen.getByRole('textbox')).toBeTruthy()
    // 複数ボタンのテスト 配列で帰ってくる
    expect(screen.getAllByRole('button')[0]).toBeTruthy()
    expect(screen.getAllByRole('button')[1]).toBeTruthy()

    // screen.debug(screen.getByText('Udemy'))
    expect(screen.getByText('Udemy')).toBeTruthy()

    //ないことを証明
    expect(screen.queryByText('Udeeeeeeemy')).toBeNull()

    // idで選択
    expect(screen.getByTestId('copyright')).toBeTruthy()
  })
})
