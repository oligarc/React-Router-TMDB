
# TMDB PROJECT BUT NOW IN REACT ROUTER

## Description

This project uses the **TMDB (The Movie Database)** API to display the newest movies and allow custom searches filtered by title  and genre. 
Users also can explore a variety of movies, view details, and browse through specific categories.

Please note that in order to use this project you need to make a free account in TMDB to obtain a key and then make queries, this will be all explained below so don't worry.

## Preview

As you won't be capable of using this unless you first make your account, we think it's a good idea to show you how the app is built.

This is the first thing you'll see when you run the app, the newest films.
![recentMovies.png](public/README_img/recentMovies.png)

If you click on them, you're being redirected to see more details of the film as you can see
![movieDetails1.png](public/README_img/movieDetails1.png)
![movieDetails2.png](public/README_img/movieDetails2.png)

Also, as you can see, you can add it to your favourites or to your watchlist

![addedToFavorites.png](public/README_img/addedToFavorites.png)

If it is already added in your watchlist or in your favourites...

You can also check the most trending actors of the moment

![trendingActors.png](public/README_img/trendingActors.png)

Click on them to see each actor's best movies!

![moviesActor.png](public/README_img/moviesActor.png)

This is only a sneak peek of what you can do with the app, if you want to see more you'll have to try it for yourself!

## Features

- View the most recent movies.
- View the trending actors right now and its movies.
- Filter movies by title and genre.
- Add movies to your watchlist or to your personal favourites.

## Technologies Used

- **React Router**
- **TypeScript**
- **Vite**: For fast development and packaging.

## Installation

### Prerequesites

- Node.js installed on your PC.
- A TMDB account to get an API key.

### Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/oligarc/React-Router-TMDB.git
2. Navigate to the project directory
   cd React-Router-TMDB
3. Install dependencies:
   npm install
4. Set up your TMDB API Key
   - Sign up on [TMDB](https://www.themoviedb.org/)
   - Go to your account settings and get your API key.
   - Add your API key to the appropriate file (in our case we made an .env file to store there the key, so...)
5. **(Optional)** Store the API Key in a .env file  
   
   Make sure you have the dotenv dependency installed!. Then, make a .env file at the root directory. 

   Follow this structure --> VITE_API_KEY=your_key  

   Then, in the .gitignore include this line --> .env  

   There you go!
6. **(Optional)** How to use the key if stored in .env  
7. 
   In the js, follow this again --> const API_KEY = import.meta.env.VITE_API_KEY  
   
   Then in the functions you won't have any problems
8. FAV AND WATCHLIST

9. That's all! Now use the **npm run serve** (instead of the traditional **npm run dev**) command and the app will be up and running!


## Work distribution
- Oliver: 
   

- Juan: 
   

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

- <a href="https://www.linkedin.com/in/%C3%B3liver-garc%C3%ADa-rodr%C3%ADguez/" target="_blank" rel="noopener noreferrer">Oliver LinkedIn</a>
  
- <a href="https://github.com/oligarc" target="_blank" rel="noopener noreferrer">Oliver GitHub</a>
  
- <a href="https://www.linkedin.com/in/juan-villoslada-jimenez/" target="_blank" rel="noopener noreferrer">Juan LinkedIn</a>
  
- <a href="https://github.com/jvillos" target="_blank" rel="noopener noreferrer">Juan GitHub</a>
