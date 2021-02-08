import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'

const blog = {
  title: 'title',
  author: 'author',
  url: 'www.url.com',
  likes: 2,
  user: {
    name: 'tester',
    username: 'tstr',
  },
}

const user = {
  name: 'tester',
  username: 'tstr',
}

test('initially renders title and author', () => {
  const component = render(<Blog blog={blog} />)

  const div = component.container.querySelector('.blog')

  expect(div).toHaveTextContent('title')
  expect(div).toHaveTextContent('author')
  expect(div).not.toHaveTextContent('www.url.com')
  expect(div).not.toHaveValue(2)
})

test('clicking show more renders url and likes', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} onClick={mockHandler} />
  )

  const button = component.getByText('Show more')
  fireEvent.click(button)
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('www.url.com')
  expect(div).toHaveTextContent('Likes: 2')
})
