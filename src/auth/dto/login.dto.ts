import { IsString,
    IsNotEmpty,
    IsEmail,
    IsStrongPassword
 } from "class-validator";

export class LoginDto{

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({     minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 0,  
        minSymbols: 0
    },{
        message: 'password must be contain a minimun 8 character and at list 1 lower case and 1 number'
    })
       
    password : string;

}