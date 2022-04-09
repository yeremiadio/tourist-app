export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
}

export interface UserLoginFormValues {
    email: string;
    password: string;
}