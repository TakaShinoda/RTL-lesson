import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { UseEffectRender } from './UseEffectRender'

afterEach(() => cleanup())

describe('useEffect rendering', () => {
  // async 非同期テスト
  it('Should render only after async function resolved', async () => {
    render(<UseEffectRender />)
    expect(screen.queryByText(/I am /)).toBeNull()
    // findByText非同期待つ(4s)
    expect(await screen.findByText(/I am/)).toBeInTheDocument()
  })
})
