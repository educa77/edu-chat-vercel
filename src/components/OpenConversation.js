import React, { useState, useCallback } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useConversations} from '../context/ConversationsProvider';


export default function OpenConversation() {

    const [text, setText] = useState('');
    const { sendMessage } = useConversations();
    const { selectedConversation } = useConversations();
    const setRef = useCallback(node => {
        if(node){
            node.scrollIntoView({ view: true });
            }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        sendMessage(selectedConversation.recipients.map(r => r.id),
        text
        );
        setText('');
    }

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3 ">
                    {selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index;
                        return (
                            <div
                                ref={lastMessage ? setRef : null}
                                key={index}
                                className={`my-1 d-flex flex-column w-50 ${message.fromMe ? `align-self-end align-items-end` : `align-items-start`}`}
                            >
                                <div className={`rounded card-block px-3 py-3 px-sm-4 py-sm-3 px-md-5 py-md-4 px-lg-6 py-lg-5 ${message.fromMe ? `bg-primary text-white` : `border`}`} >
                                    {message.text}
                                </div>
                                <div className={`text-muted small ${message.fromMe ? `text-right` : ``}`}>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit} >
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{ height: '75px', resize: 'none' }}
                            onKeyPress={event => {
                            if (event.key === "Enter") {
                                handleSubmit(event)
                            }
                            }}
                        />
                        <InputGroup.Append>
                        <Button type="submit">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
