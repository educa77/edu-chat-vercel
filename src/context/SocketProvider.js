import React, { useContext, useEffect, useState } from 'react';
const io = require("socket.io-client");
require("dotenv").config();

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {

    const [socket, setSocket] = useState()

    const HOST2 = process.env.HOST2 || "http://localhost:5000";

    useEffect(() => {
        const newSocket = io(
             HOST2,
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
    }, [id, HOST2])
    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
