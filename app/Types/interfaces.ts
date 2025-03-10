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
    textcolor?:string
}

export interface FooterProps{
    backgroundcolor:string,
    textcolor?:string
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
    profile_path: string | null;
    known_for_department: string;
    popularity: number;
    birth_date: string | null; // Fecha de nacimiento
    place_of_birth: string | null; // Lugar de nacimiento
  }
  
  
  export interface ActorCardProps {
    actor: Actor;
  }
  