import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'

const BlogForm = ({ setVisible, setNewBlog, handleSubmit, newBlog }) => {
    return (
        <>
            <h2>create new</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Col>
                        <Form.Control placeholder="title" type="text" id="title" name="Title" value={newBlog.title} onChange={({ target }) => setNewBlog(
                            {
                                ...newBlog,
                                title: target.value
                            }
                        )} />
                    </Col>
                    <Col>
                        <Form.Control placeholder="author" type="text" id="author" name="Author" value={newBlog.author} onChange={({ target }) => setNewBlog(
                            {
                                ...newBlog,
                                author: target.value
                            }
                        )} />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Control placeholder="url" type="text" id="url" name="URL" value={newBlog.url} onChange={({ target }) => setNewBlog(
                            {
                                ...newBlog,
                                url: target.value
                            }
                        )} />
                    </Col>
                </Form.Row>
                <Button variant="outline-secondary" type="submit" id="create" onClick={() => setVisible(false)}>create</Button>
                <Button variant="outline-secondary" type="Button" onClick={() => setVisible(false)}>cancel</Button>
            </Form>
        </>
    )
}

export default BlogForm