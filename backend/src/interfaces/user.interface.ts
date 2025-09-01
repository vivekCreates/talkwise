export interface IUser{
    id:string;
    username:string;
    email:string;
    password:string;
    token?:string | null;
    avatar?:string | null;
    createdAt:Date;
    updatedAt:Date; 
}
