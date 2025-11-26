import {type ErrorHandlers, request} from "../api.tsx";
import type {User} from "../types";
import type {AxiosResponse} from "axios";

export async function createUser(
    personData: User,
    successHandler?: (response: AxiosResponse<User>) => void,
    errorHandlers?: ErrorHandlers
): Promise<AxiosResponse<User> | void> {
    return request(
        'POST',
        '/media-service/user-events/create',
        successHandler,
        errorHandlers,
        personData
    );
}

export async function updateUser(
    personData: User,
    successHandler?: (response: AxiosResponse<User>) => void,
    errorHandlers?: ErrorHandlers
): Promise<AxiosResponse<User> | void> {
    return request(
        'POST',
        '/media-service/user-events/update',
        successHandler,
        errorHandlers,
        personData
    );
}

export async function getUserInfoByEmail(
    successHandler?: (response: AxiosResponse<User>) => void,
    errorHandlers?: ErrorHandlers
): Promise<AxiosResponse<User> | void> {
    return request(
        'GET',
        `/media-service/users/get`,
        successHandler,
        errorHandlers
    );
}
