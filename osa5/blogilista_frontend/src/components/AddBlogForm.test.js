import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AddBlogForm from "/addBlogForm.jsx"

test('oikea takaisinkutsufunktio uutta blogia luotaessa', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()
  render(<AddBlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('Otsikko')
  const authorInput = screen.getByPlaceholderText('Julkaisija')
  const urlInput= screen.getByPlaceholderText('URL')

  const sendButton = screen.getByText('Tallenna')
  await user.type(titleInput, 'Ramin tarinat')
  await user.type(authorInput, 'rami')
  await user.type(urlInput, 'rami.fi')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Ramin tarinat')
  expect(createBlog.mock.calls[0][0].author).toBe('rami')
  expect(createBlog.mock.calls[0][0].url).toBe('rami.fi')
})