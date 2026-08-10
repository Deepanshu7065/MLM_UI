"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL || "https://server.dm-advancetech.com";

let socketInstance: Socket | null = null;

const getSocketInstance = (): Socket => {
    if (!socketInstance) {
        socketInstance = io(SOCKET_URL, {
            transports: ["websocket", "polling"],
            withCredentials: true,
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 1000,
            autoConnect: true,
        });

        socketInstance.on("connect", () => {
            console.log("✅ Socket Connected:", socketInstance?.id);
        });

        socketInstance.on("disconnect", (reason: string) => {
            console.log("❌ Socket Disconnected:", reason);
        });

        socketInstance.on("connect_error", (err: Error) => {
            console.error("⚠️ Socket Connection Error:", err.message);
        });
    } else if (socketInstance.disconnected) {
        socketInstance.connect();
    }
    return socketInstance;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const s = getSocketInstance();
        setSocket(s);
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);