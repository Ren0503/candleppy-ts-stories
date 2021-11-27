import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Search = () => {
    const { push } = useHistory();
    const [keyword, setKeyword] = useState('');

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (keyword.trim()) { 
            push(`/search/${keyword}`); 
        } else { 
            push('/'); 
        }
    };
    return (
        <Form className="search" onSubmit={submitHandler}>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search story...'
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' className='p-2 btn-primary'>
                <i className="fas fa-search"></i>
            </Button>
        </Form>
    )
}

export default Search;
