import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders default content properly', () => {
    const blog = {
        title: 'useState in React',
        author: 'Dominic Freeman',
        url: 'www.dominic.free/state',
        likes: 0,
        user: {
            username: 'matilda'
        }
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.getByText(blog.title)).toHaveTextContent(
        'useState in React', 'Dominic Freeman'
    )

    expect(component.container.querySelector('.test')).not.toBeVisible()
})

test('clicking the button shows url', () => {
    const blog = {
        title: 'useState in React',
        author: 'Dominic Freeman',
        url: 'www.dominic.free/state',
        likes: 0,
        user: {
            username: 'matilda'
        }
    }

    const component = render(
        <Blog blog={blog} />
    )


    const button = component.getByText('view')
    fireEvent.click(button)

    // https://github.com/testing-library/jest-dom#tobevisible
    expect(component.getByText(blog.url)).toBeVisible()

    expect(component.getByText(blog.likes.toString())).toBeVisible()

})

// due to the current structure of the Blog.js file, further tests can't be done