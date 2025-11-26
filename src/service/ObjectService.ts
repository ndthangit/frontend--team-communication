import {type ErrorHandlers, request} from "../api.tsx";
import type {AxiosResponse} from "axios";
import type {Team} from "../types/team.ts";


export async function getTeamsByUserEmail(
    email: string,
    successHandler?: (response: AxiosResponse<Team[]>) => void,
    errorHandlers?: ErrorHandlers
): Promise<AxiosResponse<Team[]> | void> {
    return request(
        'GET',
        `/?email=${email}`,
        successHandler,
        errorHandlers
    );
}

export async function createTeams(
    team :Team,
    successHandler?: (response: AxiosResponse<Team>) => void,
    errorHandlers?: ErrorHandlers
): Promise<AxiosResponse<Team> | void> {
    return request(
        'POST',
        `/media-service/groups/create`,
        successHandler,
        errorHandlers,
        team
    );
}

export async function getVisibleTeamsByUserEmail(
    email: string,
    successHandler?: (response: AxiosResponse<Team[]>) => void,
    errorHandlers?: ErrorHandlers
): Promise<AxiosResponse<Team[]> | void> {
    return request(
        'GET',
        `/v1/get-visible-team-by-email/?email=${email}`,
        successHandler,
        errorHandlers
    );
}


