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

export interface FooterProps{
    backgroundcolor:string
}

export interface Genre{
    id:number,
    name:string
}

export interface BasicMovie{
    id:number,  
    title:string,
    overview:string,
    poster_path:string,
    popularity:number,
}

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
  
export interface MovieResponse {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: Movie[];
}