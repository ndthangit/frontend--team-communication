import type {AxiosResponse} from "axios";
import {type ErrorHandlers, request} from "../api.tsx";
import type {Team} from "../types/team.ts";

export async function createTeam(
    teamName: string,
    successHandler?: (response: AxiosResponse<string>) => void,
    errorHandlers?: ErrorHandlers
): Promise<AxiosResponse<string> | void> {
    return request(
        'POST',
        `/media-service/group-events/create/${encodeURIComponent(teamName)}`,
        successHandler,
        errorHandlers
    );
}
export async function getTeam(
    successHandler?: (response: AxiosResponse<Team[]>) => void,
    errorHandlers?: ErrorHandlers
): Promise<AxiosResponse<Team[]> | void> {
    return request(
        'GET',
        `/media-service/group/my-groups`,
        successHandler,
        errorHandlers
    );
}