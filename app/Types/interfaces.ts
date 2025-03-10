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
    isrounded?:boolean,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export interface TextInputProps{
    name?:string,
    placeholder:string,
    value?:string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface FooterProps{
    backgroundcolor:string
}

export interface Genre{
    id:number,
    name:string
}

export interface Movie {
    id: number,
    title: string,
    overview: string,
    release_date: string,
    poster_path: string | null,
    backdrop_path: string | null,
    vote_average: number,
    genre_ids: number[],
    genres?: Genre[]
}



export interface Actor {
    id: number;
    name: string;
    profile_path: string | null; // La URL de la imagen de perfil del actor
    known_for_department: string; // Departamento por el cual es conocido (e.g., Actor, Director)
    popularity: number; // Popularidad del actor según la API
}

export interface ActorCardProps{
    actor: Actor
}