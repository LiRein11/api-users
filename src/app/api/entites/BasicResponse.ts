export interface BasicResponse<T> {
    success: boolean;
    error: string;
    result?: T;
}
