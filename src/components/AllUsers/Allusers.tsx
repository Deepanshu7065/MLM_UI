"use client";

import React, { useState, useMemo } from "react";
import {
    Loader2,
    ChevronDown,
    ChevronRight,
    Mail,
    Phone,
    Calendar,
    ShieldCheck,
    Tag,
    Users,
    Search,
} from "lucide-react";
import { useGetAllUser } from "@/hooks/useUser";
import { useTheme } from "@/theme/ThemeProvider";
import { themeColors } from "@/theme/themeConfig";
import type { INetworkNodeProps, IUser } from "@/hooks/types";

/**
 * Sub-component for rendering user details in a grid
 */
const DetailItem: React.FC<{ icon: React.ReactNode; text: string; color?: string }> = ({
    icon,
    text,
    color,
}) => (
    <div
        style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.75rem",
            color: color || "inherit",
        }}
    >
        <span style={{ opacity: 0.5, display: "flex" }}>{icon}</span>
        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", opacity: 0.8 }}>
            {text}
        </span>
    </div>
);

/**
 * Recursive Tree Node Component
 */
const NetworkNode: React.FC<INetworkNodeProps> = ({ user, treeMap, level }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const c = themeColors;
    const [isExpanded, setIsExpanded] = useState<boolean>(level < 1);

    const children = treeMap.get(user.referalCode || "") || [];
    const isAdmin = user.role === "admin";

    const joinedDate = useMemo(() => {
        return user.created_at
            ? new Date(user.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })
            : "N/A";
    }, [user.created_at]);

    return (
        <div
            style={{
                marginTop: "1rem",
                marginLeft: level === 0 ? "0" : "2rem",
                borderLeft: level === 0 ? "none" : `2px solid ${isDark ? "#334155" : "#e2e8f0"}`,
                paddingLeft: "1.5rem",
                position: "relative",
            }}
        >
            {/* Visual Connector Line */}
            {level > 0 && (
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        top: "28px",
                        width: "20px",
                        height: "2px",
                        backgroundColor: isDark ? "#334155" : "#e2e8f0",
                    }}
                />
            )}

            {/* Main Card */}
            <div
                style={{
                    backgroundColor: isDark ? (isAdmin ? "#1e1b4b" : c.card.dark) : "#ffffff",
                    borderRadius: "1rem",
                    padding: "1.25rem",
                    border: `1px solid ${isAdmin ? "#4338ca" : isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"}`,
                    boxShadow: isDark ? "none" : "0 4px 12px rgba(0,0,0,0.03)",
                    maxWidth: "650px",
                    position: "relative",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {/* Avatar Icon */}
                    <div
                        style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "12px",
                            backgroundColor: isAdmin ? "#4338ca" : isDark ? "#0f172a" : "#f0f9ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isAdmin ? "#fff" : isDark ? c.primary.dark : "#3b82f6",
                            fontWeight: "bold",
                            flexShrink: 0,
                        }}
                    >
                        {isAdmin ? <ShieldCheck size={22} /> : user.name[0].toUpperCase()}
                    </div>

                    {/* User Basic Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: "700" }}>{user.name}</h4>
                            {isAdmin && (
                                <span
                                    style={{
                                        fontSize: "0.6rem",
                                        background: "#ef4444",
                                        color: "#fff",
                                        padding: "2px 8px",
                                        borderRadius: "4px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    ADMIN
                                </span>
                            )}
                        </div>
                        <p style={{ margin: 0, fontSize: "0.75rem", opacity: 0.5 }}>
                            ID: {user.userId} • Ref: {user.referalCode || "ROOT"}
                        </p>
                    </div>

                    {/* Toggle Button */}
                    {children.length > 0 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#94a3b8",
                                padding: "4px",
                            }}
                        >
                            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                        </button>
                    )}
                </div>

                {/* Detailed Info Grid */}
                <div
                    style={{
                        marginTop: "12px",
                        paddingTop: "12px",
                        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"}`,
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: "8px",
                    }}
                >
                    <DetailItem icon={<Mail size={14} />} text={user.email} />
                    <DetailItem icon={<Phone size={14} />} text={user.phone} />
                    <DetailItem icon={<Calendar size={14} />} text={`Joined: ${joinedDate}`} />
                    <DetailItem
                        icon={<Tag size={14} />}
                        text={`Level ${level}`}
                        color={isAdmin ? "#ef4444" : isDark ? c.primary.dark : "#3b82f6"}
                    />
                </div>

                {/* Floating Team Size Badge */}
                {children.length > 0 && (
                    <div
                        style={{
                            position: "absolute",
                            top: "-10px",
                            right: "15px",
                            backgroundColor: "#10b981",
                            color: "#fff",
                            fontSize: "0.65rem",
                            padding: "2px 10px",
                            borderRadius: "12px",
                            fontWeight: "bold",
                        }}
                    >
                        {children.length} MEMBERS
                    </div>
                )}
            </div>

            {/* Child Nodes Rendering */}
            {isExpanded && children.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {children.map((child) => (
                        <NetworkNode key={child.id} user={child} treeMap={treeMap} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

/**
 * Main Network Page Component
 */
const AllUsersNetwork: React.FC = () => {
    const { data, isLoading } = useGetAllUser();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const c = themeColors;

    const allUsers: IUser[] = data?.data?.users || [];

    // Logic to build the tree efficiently
    const { rootUsers, treeMap } = useMemo(() => {
        const map = new Map<string, IUser[]>();

        allUsers.forEach((user) => {
            if (user.parent_code) {
                const children = map.get(user.parent_code) || [];
                map.set(user.parent_code, [...children, user]);
            }
        });

        const roots = allUsers
            .filter((u) => !u.parent_code || !allUsers.some((p) => p.referalCode === u.parent_code))
            .sort((a, b) => (a.role === "admin" ? -1 : b.role === "admin" ? 1 : 0));

        return { rootUsers: roots, treeMap: map };
    }, [allUsers]);

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Loader2 className="animate-spin" size={32} style={{ color: isDark ? c.primary.dark : c.primary.light }} />
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: isDark ? c.background.dark : "#f9fafb",
                padding: "3rem 2rem",
            }}
        >
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                {/* Header Section */}
                <div style={{ marginBottom: "2.5rem" }}>
                    <h1 style={{ fontSize: "2rem", fontWeight: "900", color: isDark ? "#fff" : "#111827" }}>
                        Network Structure
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", opacity: 0.6 }}>
                        <Users size={18} />
                        <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                            Total Community: <b>{allUsers.length} Users</b>
                        </span>
                    </div>
                </div>

                {/* Tree Container */}
                <div
                    style={{
                        backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#fff",
                        borderRadius: "1.5rem",
                        padding: "2rem",
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#e5e7eb"}`,
                    }}
                >
                    {rootUsers.length > 0 ? (
                        rootUsers.map((user) => (
                            <NetworkNode key={user.id} user={user} treeMap={treeMap} level={0} />
                        ))
                    ) : (
                        <div style={{ textAlign: "center", padding: "3rem", opacity: 0.5 }}>
                            <Search size={40} style={{ marginBottom: "1rem" }} />
                            <p>No network data found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllUsersNetwork;