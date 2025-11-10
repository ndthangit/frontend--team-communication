import {type ErrorHandlers, request} from "../api.tsx";
import type {Team, User} from '../types';
import type {CreateTeamRequest} from "../types/team.ts";
import type {AxiosResponse} from "axios";

export const teamService = {
    getTeamsByUserEmail: (email: string): Promise<Team[]> => { // Sửa từ Promise<never> thành Promise<Team[]>
        return new Promise((resolve, reject) => {
            request(
                "GET",
                `/v1/get-all-unit-by-organization/${email}`,
                (res) => {
                    resolve(res.data);
                },
                {
                    rest: (error) => {
                        reject(error);
                    },
                    noResponse: (error) => {
                        reject(error);
                    }
                }
            );
        });
    },
    createTeam: (teamData: CreateTeamRequest): Promise<any> => {
        return new Promise((resolve, reject) => {
            request(
                "POST",
                "/v1/create-unit",
                (res) => {
                    return resolve(res.data);
                },
                {
                    rest: (error) => {
                        reject(error);
                    },
                    noResponse: (error) => {
                        reject(error);
                    }
                },
                teamData
            );
        });
    },
}

export async function createPerson(
    personData: User,
    successHandler?: (response: AxiosResponse<User>) => void,
    errorHandlers?: ErrorHandlers
): Promise<AxiosResponse<User> | void> {
    return request(
        'POST',
        '/v1/create-person',
        successHandler,
        errorHandlers,
        personData
    );
}

export async function getPersonInfoByEmail(
    email: string,
    successHandler?: (response: AxiosResponse<User>) => void,
    errorHandlers?: ErrorHandlers
): Promise<AxiosResponse<User> | void> {
    return request(
        'GET',
        `/v1/get-person-by-email/?email=${email}`,
        successHandler,
        errorHandlers
    );
}


