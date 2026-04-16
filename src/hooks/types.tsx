export interface IUser {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    phone: string;
    referalCode: string | null;
    parent_code: string | null;
    ref_by_id: number | null;
    userId: string;
    created_at: string;
    updated_at: string;
}

export interface INetworkNodeProps {
    user: IUser;
    treeMap: Map<string, IUser[]>;
    level: number;
}

export interface IGetAllUsersResponse {
    data: {
        users: IUser[];
    };
}