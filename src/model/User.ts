export interface User {
    Id: string;
    Name: string;
    Email: string;
    Token: string;
}

export interface UserLoginFormValues {
    email: string;
    password: string;
}