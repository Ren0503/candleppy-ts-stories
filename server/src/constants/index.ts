export const EmailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export enum ErrorCodes {
    Bad_Request = 400,
    Un_Authorized = 401,
    Not_Found = 404,
    Internal = 500,
}

export enum ErrorMessages {
    Generic = 'Oops! Something went wrong. Please send an error report to help us improve your experience.',
}
  