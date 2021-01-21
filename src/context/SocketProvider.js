import React, { useContext, useEffect, useState } from 'react';
const io = require("socket.io-client");
require("dotenv").config();

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {

    const [socket, setSocket] = useState()

    const HOST2 = "https://edu-chat-heroku.herokuapp.com/";

    useEffect(() => {
        const newSocket = io(
             HOST2,
            {
                query: { id },
                withCredentials: false,
                extraHeaders: {
                "my-custom-header": "abcd"
                }
            }
        )
        setSocket(newSocket)

        return () => newSocket.close()
    }, [id, HOST2])
    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
