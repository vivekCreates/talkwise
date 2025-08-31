export class ApiResponse{
        statusCode:number;
        data:any;
        message:string;
        success?:boolean;

    constructor(
        statusCode:number,
        data:any,
        message:string,
        success?:boolean,
    ){
        this.statusCode = statusCode
        this.data = data
        this.message = message 
        this.success = this.statusCode < 400
    }
}