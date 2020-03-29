import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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

    expect(component.container).toHaveTextContent(
        'useState in React', 'Dominic Freeman'
    )

    expect(component.container.querySelector('.test')).toHaveStyle({ display: 'none' })
})