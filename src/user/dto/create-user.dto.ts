import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUrl, Length, minLength, } from "class-validator";


export class CreateUserDto {
    
    @IsString()
    @Length(1, 225)
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 0,  
        minSymbols: 0
    },{
        message: 'password must be contain a minimun 8 character and at list 1 lower case and 1 number'
    })
       
    password : string;

   
}
