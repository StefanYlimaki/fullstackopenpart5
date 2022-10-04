import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SingleBlog from './SingleBlog'
import BlogForm from './BlogForm'

const testBlog = {
  title: 'Component testing is done with react-testing-library',
  author: 'author123',
  url: 'testausta',
  id: '633ac85th750a819230fc821',
  likes: 0,
  user: {
    id: '633ac85ar648a819230fc821',
    name: 'testaajapro',
    username: 'testaajapro'
  }
}

const testUser = {
  username: 'testaajapro'
}

test('5.13 renders title and author, but not url, likes or id', () => {
  render(<SingleBlog blog={testBlog} user={testUser}/>)
  screen.getByText('Component testing is done with react-testing-library')
  screen.getByText('author123')
  const urlElement = screen.queryByText('safa')
  const likesElement = screen.queryByText('0')
  const idElement = screen.queryByText('633ac85th750a819230fc821')
  expect(urlElement).toBe(null)
  expect(likesElement).toBe(null)
  expect(idElement).toBe(null)
})

test('5.14 the url, likes and id are shown, when clicked on view-button', async () => {
  render(<SingleBlog blog={testBlog} user={testUser}/>)
  const user1 = userEvent.setup()
  const button1 = screen.getByText('view')
  await user1.click(button1)
  screen.getByText('Component testing is done with react-testing-library')
  screen.getByText('author123')
  screen.getByText('testausta')
  screen.getByText('633ac85th750a819230fc821')
})

test('5.15 clicking the like button twice calls the event handler twice', async () => {
  const mockHandler = jest.fn()
  render(<SingleBlog blog={testBlog} user={testUser} handleLike={mockHandler}/>)

  const user = userEvent.setup()
  const button1 = screen.getByText('view')
  await user.click(button1)
  const button2 = screen.getByText('like')
  await user.click(button2)
  await user.click(button2)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('5.16 blogFrom calls submit-handler with correct information when blog is created', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog}/>)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const submitButton = screen.getByText('create')

  await user.type(titleInput, 'this is the title')
  await user.type(authorInput, 'this is the author')
  await user.type(urlInput, 'this is the url')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('this is the title')
  expect(createBlog.mock.calls[0][0].author).toBe('this is the author')
  expect(createBlog.mock.calls[0][0].url).toBe('this is the url')
})



/*
test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'stefan ylimäki',
    url: 'testausta',
    id: '633ac85th750a819230fc821',
    user: {
      id: '633ac85ar648a819230fc821',
      name: 'testaajapro',
      username: 'testaajapro'
    }
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} />
  )

  const user = userEvent.setup()
  await user.click(screen.getByText('view'))

  screen.debug()

  expect(mockHandler.mock.calls).toHaveLength(1)
})

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" >
          togglable content
        </div>
      </Togglable>
    ).container
  })

  test('renders its children', () => {
    screen.getByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

})*/