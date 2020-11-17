import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import userEnent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { MockServer } from './MockServer'

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
    // 200 OK
    return res(ctx.status(200), ctx.json({ username: 'Bred dummy' }))
  })
)

// beforeAll 最初に一回実行
// server.listen サーバ起動
beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
// 最後に一回
afterAll(() => server.close())

describe('Mocking API', () => {
  it('Fetch success Should display fetched data correctly and button disable', async () => {
      render(<MockServer />)
      userEnent.click(screen.getByRole('button'))
      expect(await screen.findByRole('heading')).toHaveTextContent('Bred dummy')
      expect(screen.getByRole('button')).toHaveAttribute('disabled')
    })


  it('Fetch failure Should display error msg. no render heading and button abled', async()=> {
      server.use(rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
                return res(ctx.status(404))
            }))    
        render(<MockServer />)
        userEnent.click(screen.getByRole('button'))
        expect(await screen.findByTestId('error')).toHaveTextContent('Fetching Failed !')
        expect(screen.queryByRole('hading')).toBeNull()
        expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
    })


})