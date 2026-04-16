"use client"
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    // useRef use karo taaki socket ek hi baar bane - useMemo React StrictMode mein double run karta hai
    const socketRef = useRef<Socket | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Agar pehle se socket connected hai toh dobara mat banao
        if (socketRef.current?.connected) return;

        const newSocket = io("http://172.30.2.140:5001", {
            transports: ["websocket"],
            withCredentials: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        newSocket.on("connect", () => {
            console.log("✅ Socket Connected:", newSocket.id);
        });

        newSocket.on("disconnect", (reason) => {
            console.log("❌ Socket Disconnected:", reason);
        });

        newSocket.on("connect_error", (err) => {
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