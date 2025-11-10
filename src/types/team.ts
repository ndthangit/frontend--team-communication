export interface Team {
    id: string;
    name: string;
    avatarUrl?: string;
    createdAt?: string;
    createdBy?: string;
}

export interface CreateTeamRequest {
    name: string;
    avatarUrl?: string;
    createdBy: string;
}

