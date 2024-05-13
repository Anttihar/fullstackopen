import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Blog from "/blog"
import userEvent from "@testing-library/user-event"

describe("<Blog />", () => {
  let blog = {
    title: "testi blogi",
    author: "testaaja",
    url: "testi.fi",
    likes: 10,
    user: {
      username: "pena",
      name: "Pentti Hirvonen",
    },
  } /*
  let container
  beforeEach(() => {
    container = render(<Blog blog={blog} />).container
  })
*/
  test("<Renderöi aluksi vain titlen ja authorin", async () => {
    const { container } = render(<Blog blog={blog} />)
    screen.getByText(blog.title, { exact: false })
    const div = container.querySelector("#expanded")
    expect(div).toHaveStyle("display: none")
  })

  test("Renderöi expand klikkauksen jälkeen tarkemmat tiedot", async () => {
    const user = userEvent.setup()
    const { container } = render(<Blog blog={blog} />)
    const expandButton = container.querySelector("#expand")
    await user.click(expandButton)

    const div = container.querySelector("#expanded")
    expect(div).not.toHaveStyle("display: none")
  })

  test("Liken painaminen kahdesti -> 2 saman tapahtumakäsittejän kutsua", async () => {
    const user = userEvent.setup()
    const handleLike = jest.fn()

    const { container } = render(<Blog blog={blog} addLike={handleLike} />)

    const likeButton = container.querySelector("#like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
