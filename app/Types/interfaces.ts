export interface LogoProps{
    image:string,
    format:string
}

export interface HeaderProps{
    backgroundcolor:string,
    textcolor:string
}

export interface ButtonProps{
    backgroundcolor?:string,
    text:string,
    isrounded?:boolean
}

export interface TextInputProps{
    name:string,
    placeholder:string,
    value?:string,
    onChange?: () => void
}