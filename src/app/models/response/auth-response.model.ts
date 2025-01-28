export interface AuthResponse {
    token: string;
    name: string;
}

export interface ServiceResponse {
    message: string;
    code: number;
    response: {
        access_token:string;
    }
}