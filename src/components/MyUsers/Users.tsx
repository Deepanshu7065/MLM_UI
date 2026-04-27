"use client"

import { useState, useMemo } from "react";
import {
  Users, User, ChevronDown, ChevronRight,
  Search, Grid3x3, GitBranch, Loader2,
  ArrowDownRight, UserPlus,
  Copy
} from "lucide-react";
import { useMyUsers } from "@/hooks/myUsers.query";
import { useTheme } from "@/theme/ThemeProvider";
import { themeColors } from "@/theme/themeConfig";
import { toast } from "sonner";

interface IUserNode {
  id: number; userId: string; name: string; email: string;
  referalCode: string; joinedAt?: string; level: number;
  childrenCount?: number; children?: IUserNode[];
}

const GroupedGridView = ({ rootUsers }: { rootUsers: IUserNode[] }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const c = themeColors;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTree = useMemo(() => {
    return rootUsers.map(parent => ({
      ...parent,
      children: parent.children?.filter(child =>
        child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        child.userId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(parent =>
      parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (parent.children && parent.children.length > 0)
    );
  }, [rootUsers, searchTerm]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Search Bar */}
      <div style={{ position: 'relative' }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
        <input
          placeholder="Search teammates by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%', padding: '0.8rem 2.5rem', borderRadius: '12px',
            border: `1px solid ${isDark ? c.border.dark : '#e2e8f0'}`,
            backgroundColor: isDark ? '#0f172a' : '#f8fafc',
            color: isDark ? c.text.dark : c.text.light, outline: 'none'
          }}
        />
      </div>

      {/* Hierarchy Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {filteredTree.map((parent) => (
          <div key={parent.id} style={{ position: 'relative' }}>
            {/* PARENT CARD (Level 1) */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '15px',
              padding: '1.25rem', borderRadius: '16px',
              backgroundColor: isDark ? '#1e293b' : '#fff',
              border: `1px solid ${isDark ? c.primary.dark : '#e2e8f0'}`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              zIndex: 2, position: 'relative'
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                backgroundColor: isDark ? c.primary.dark : "#3b82f6",
                color: '#fff', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem'
              }}>
                {parent.name[0]?.toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>{parent.name}</h3>
                  <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontWeight: 'bold' }}>DIRECT</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.7rem', gap: 4, display: 'flex', alignItems: 'center', opacity: 0.7 }}>
                  ID: {parent.userId} | {parent.referalCode}
                  {parent.referalCode &&
                    <Copy size={8} style={{
                      cursor: 'pointer',
                      marginBottom: '2px'
                    }}
                      onClick={() => {
                        navigator.clipboard.writeText(parent.referalCode);
                        toast.success("Copied to clipboard");
                      }}
                    />
                  }
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.7rem', opacity: 0.5, textTransform: 'uppercase' }}>Downline</div>
                <div style={{ fontWeight: 'bold', color: isDark ? c.primary.dark : c.primary.light }}>{parent.childrenCount} Users</div>
              </div>
            </div>

            {/* CHILDREN CONNECTOR & GRID (Level 2) */}
            {parent.children && parent.children.length > 0 && (
              <div style={{
                marginTop: '1rem', paddingLeft: '2.5rem',
                position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem'
              }}>
                {/* Visual Line Connector */}
                <div style={{
                  position: 'absolute', left: '22px', top: '-1rem', bottom: '20px',
                  width: '2px', backgroundColor: isDark ? '#334155' : '#e2e8f0', zIndex: 1
                }} />

                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1rem', width: '100%'
                }}>
                  {parent.children.map(child => (
                    <div key={child.id} style={{
                      padding: '1rem', borderRadius: '12px',
                      backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                      border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                      display: 'flex', alignItems: 'center', gap: '12px',
                      position: 'relative'
                    }}>
                      {/* Branch Icon */}
                      <ArrowDownRight size={14} style={{ color: '#94a3b8' }} />

                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        backgroundColor: isDark ? '#1e293b' : '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.8rem', fontWeight: '600', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`
                      }}>
                        {child.name[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{child.name}</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>ID: {child.userId}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredTree.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
            <UserPlus size={40} style={{ marginBottom: '1rem' }} />
            <p>No teammates found in this hierarchy.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function ReferralTreeView() {
  const { theme } = useTheme();
  const { data, isLoading } = useMyUsers();
  const [viewMode, setViewMode] = useState<"tree" | "grid">("tree");
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set([0]));

  const isDark = theme === 'dark';
  const c = themeColors;

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Loader2 size={40} className="animate-spin" style={{ color: isDark ? c.primary.dark : c.primary.light }} />
    </div>
  );

  const toggleNode = (id: number) => {
    const next = new Set(expandedNodes);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedNodes(next);
  };

  const rootNode: IUserNode = {
    id: data?.me.id || 0,
    userId: data?.me?.userId || "",
    name: data?.me?.name || "",
    email: data?.me?.email || "",
    referalCode: data?.me?.referalCode || "",
    level: 0,
    children: data?.downlineTree || [],
    childrenCount: data?.downlineTree?.length || 0,
  };

  const renderTree = (node: IUserNode) => {
    const isExpanded = expandedNodes.has(node.id);
    return (
      <div key={node.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <CompactUserCard user={node} isRoot={node.level === 0} isExpanded={isExpanded} onToggle={() => toggleNode(node.id)} />
        {isExpanded && node.children && node.children.length > 0 && (
          <div style={{ marginLeft: '1.5rem', borderLeft: `2px solid ${isDark ? '#334155' : '#e2e8f0'}`, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '4px' }}>
            {node.children.map(child => renderTree(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100%', backgroundColor: isDark ? c.backgroundSecondary.dark : '#f4f7fe', color: isDark ? c.text.dark : c.text.light, padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px', letterSpacing: '-0.5px' }}>
            <Users size={32} style={{ color: isDark ? c.primary.dark : c.primary.light }} /> My Network
          </h1>
          <p style={{ opacity: 0.6, fontSize: '1rem' }}>Manage and track your community hierarchy.</p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <StatBox label="Total Network" value={data?.stats?.totalDownline || 0} icon={<Users size={20} />} />
          <StatBox label="Direct Referrals" value={data?.stats?.level1Count || 0} icon={<User size={20} color="#10b981" />} />
          <StatBox label="Team Size" value={data?.stats?.level2Count || 0} icon={<GitBranch size={20} color="#a855f7" />} />
        </div>

        {/* Toggle Switch */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem', background: isDark ? '#1e293b' : '#fff', padding: '6px', borderRadius: '14px', width: 'fit-content', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <ToggleButton active={viewMode === 'tree'} onClick={() => setViewMode('tree')} label="Tree View" icon={<GitBranch size={16} />} />
          <ToggleButton active={viewMode === 'grid'} onClick={() => setViewMode('grid')} label="Grouped Grid" icon={<Grid3x3 size={16} />} />
        </div>

        {/* Content Area */}
        <div style={{ backgroundColor: isDark ? c.card.dark : '#fff', borderRadius: '24px', padding: '2rem', border: `1px solid ${isDark ? c.border.dark : '#e2e8f0'}`, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
          {viewMode === "tree" ? renderTree(rootNode) : <GroupedGridView rootUsers={data?.downlineTree || []} />}
        </div>
      </div>
    </div>
  );
}

const CompactUserCard = ({ user, isRoot, isExpanded, onToggle }: any) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1rem', borderRadius: '14px',
      backgroundColor: isDark ? '#0f172a' : '#f8fafc',
      border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
      borderLeft: `4px solid ${isRoot ? '#3b82f6' : (user.level === 1 ? '#10b981' : '#a855f7')}`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {(user.childrenCount ?? 0) > 0 && (
          <button onClick={onToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
        )}
        <div style={{
          width: '36px', height: '36px',
          borderRadius: '10px',
          background: isRoot ? '#3b82f6' : (isDark ? '#1e293b' : '#fff'),
          color: isRoot ? '#fff' : (isDark ? '#fff' : '#000'), display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem',
          fontWeight: 'bold',
          border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`
        }}>
          {user.name[0]}
        </div>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: '700' }}>{user.name} {isRoot && " (You)"}</div>
          <div style={{
            fontSize: '0.75rem',
            opacity: 0.6, display: "flex",
            alignItems: "center", gap: "4px"
          }}>
            {user.userId} • {user.referalCode}
            {user.referalCode &&
              <Copy size={8} style={{
                cursor: 'pointer',
                marginBottom: '2px'
              }}
                onClick={() => {
                  navigator.clipboard.writeText(user.referalCode);
                  toast.success("Copied to clipboard");
                }}
              />
            }</div>
        </div>
      </div>
      {user.childrenCount > 0 && <div style={{ fontSize: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '4px 12px', borderRadius: '20px', fontWeight: '800' }}>{user.childrenCount} Team</div>}
    </div>
  );
};

const StatBox = ({ label, value, icon }: any) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <div style={{ padding: '1.5rem', borderRadius: '24px', backgroundColor: isDark ? '#1e293b' : '#fff', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: isDark ? '#0f172a' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-1px' }}>{value}</div>
      <div style={{ fontSize: '0.75rem', fontWeight: '700', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
    </div>
  );
};

const ToggleButton = ({ active, onClick, label, icon }: any) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const c = themeColors;
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '10px',
      border: 'none', cursor: 'pointer',
      backgroundColor: active ? (isDark ? c.primary.dark : '#3b82f6') : 'transparent',
      color: active ? isDark ? '#000' : '#fff' : (isDark ? '#94a3b8' : '#64748b'),
      fontWeight: 'bold', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {icon} {label}
    </button>
  );
};