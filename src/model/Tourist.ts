export interface Tourist {
    id?: string;
    tourist_email: string;
    tourist_location: string;
    tourist_profilepicture: string;
    tourist_name: string;
    createdat?: string;
}

export interface TouristFormValues {
    id: string
    tourist_email: string;
    tourist_location: string;
    tourist_profilepicture: string;
    tourist_name: string;

}
