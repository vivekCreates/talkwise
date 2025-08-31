export class ApiError extends Error {
  statusCode: number;
  message: string;
  

  constructor(statusCode: number,message:string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message

    // restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype);
  }
}


