import React from 'react'
import { Form } from 'react-bootstrap'
/**
* @author
* @function Input
**/

export const Input = ({controlId,label,type,value,placeholder,onChange,errorMessage,...props}) => {
    return (
        <Form.Group className="mb-3" controlId={controlId}>
            {label &&<Form.Label>{label}</Form.Label>}
            <Form.Control
                type={type}
                value = {value}
                placeholder={placeholder}
                onChange={onChange} 
                {...props} />
                
            <Form.Text className="text-muted">
                {errorMessage}
            </Form.Text>
        </Form.Group>
    )

}