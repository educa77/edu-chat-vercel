import React, { useContext, useEffect, useState } from 'react';
const io = require("socket.io-client");
require("dotenv").config();

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {

    const [socket, setSocket] = useState()

    const HOST = "https://edu-chat-heroku.herokuapp.com/socket.io/?transport=polling";

    useEffect(() => {
        const newSocket = io(
             HOST,
            {
                query: { id },
                withCredentials: true,
                extraHeaders: {
                "my-custom-header": "abcd"
                }
            }
        )
        setSocket(newSocket)

        return () => newSocket.close()
    }, [id, HOST])
    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
