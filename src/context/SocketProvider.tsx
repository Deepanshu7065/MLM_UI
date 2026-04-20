"use client"
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const socketRef = useRef<Socket | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (socketRef.current?.connected) return;

        // Note: Production mein ye IP change karke backend URL dalna hoga
        const newSocket = io("https://mlm-server.onrender.com", {
            transports: ["websocket"],
            withCredentials: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        newSocket.on("connect", () => {
            console.log("✅ Socket Connected:", newSocket.id);
        });

        // ✅ 'reason' ko string type diya
        newSocket.on("disconnect", (reason: string) => {
            console.log("❌ Socket Disconnected:", reason);
        });

        // ✅ 'err' ko Error type diya
        newSocket.on("connect_error", (err: Error) => {
            console.error("⚠️ Socket Connection Error:", err.message);
        });

        socketRef.current = newSocket;
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
            socketRef.current = null;
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);