import React from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';

class App extends React.Component {
    state = {
        movies: [],
        searchQuery: ""
    }

    async componentDidMount(){
        const baseURL = "http://localhost:3002/movies";
        const response = await fetch(baseURL);
        console.warn(response)
        const data = await response.json();
        console.warn(data)
        this.setState({movies : data});
    }

    deleteMovie = (movie) => {
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );
        this.setState(state => ({
            movies: newMovieList
        }))
    }

    searchMovie = (event) => {
        this.setState({ searchQuery: event.target.value })

    }

    render() {
        let filteredMovie = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        )
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SearchBar
                            searchMovieProp={this.searchMovie} />
                    </div>
                </div>
                <MovieList
                    movies={filteredMovie}
                    deleteMovieProp={this.deleteMovie} />
            </div>
        )
    }
}

export default App;