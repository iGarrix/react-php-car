export interface IAutoModel {
    name: string,
    details: string, 
}
export type ServerAddAutoError = {
    name: Array<string>, 
    details: Array<string>, 
    error: string 
};
