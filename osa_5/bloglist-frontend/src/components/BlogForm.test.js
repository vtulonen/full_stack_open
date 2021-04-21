import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Blog form uses correct input values on createBlog callback when submitting', async () => {
  const mockCreateBlog = jest.fn()
  const mockDisplayNotification = jest.fn()
  const component = render(
    <BlogForm
      createBlog={mockCreateBlog}
      displayNotification={mockDisplayNotification}
    />
  )

  const titleInput = component.container.querySelector('.blog-form__title')
  const authorInput = component.container.querySelector('.blog-form__author')
  const urlInput = component.container.querySelector('.blog-form__url')

  fireEvent.change(titleInput, {
    target: { value: 'Test Title' },
  })
  fireEvent.change(authorInput, {
    target: { value: 'Test Author' },
  })
  fireEvent.change(urlInput, {
    target: { value: 'www.testurl.com' },
  })

  const submit = component.getByText('save')
  fireEvent.click(submit)

  expect(mockCreateBlog.mock.calls.length).toBe(1)
  expect(mockCreateBlog.mock.calls[0][0]).toEqual({
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.testurl.com',
  })
})