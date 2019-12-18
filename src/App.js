import React from "react";
import curti from "./Images/curti.png";
import ncurti from "./Images/n-curti.png";

// import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      key: 0,
      moviesList: [],
      current: []
    };

    this.pular = this.pular.bind(this);
  }

  pular() {
    var index = this.state.key +1;

    if(index > 19) index = 0;
    var mov = this.state.moviesList;
    console.log("BOTAO");
    this.setState({
      key: index,
      current:  mov[index]
    })
  }

  componentDidMount() {
    // event.preventDefault();
    debugger;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=82754e9c453f88592d1e41ce23a829d1&language=en-US&page=1`
      )
      .then(res => res.data)
      .then(movies => {
        // console.log(res)

        // const moviesList = res.results.map(movie => [movie.id, movie.original_title]);
        console.log("BOTAO");
        this.setState({
          moviesList: movies.results,
          current: movies.results[0]
        });
      });
  }

  render() {
    const movies = this.state.current;
    // console.log(this.state.current);
    debugger;
    return (
      <div className="App">
        {/* {this.state.current.map(movies => ( */}
        <div key={String(movies.id)} style={{ margin: "150px" }}>
          <div className="movie-card-container">
            <div className="image-container">
              <div
                className="bg-image"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${movies.poster_path})`,
                  width: "400px"
                }}
              />
            </div>

            <div className="movie-info">
              <h2>Movie Details</h2>
              <div>
                <h1>{movies.title}</h1>
                <small>Released Date: {movies.release_date}</small>
              </div>
              <h4>Rating: {movies.vote_average} / 10</h4>
            </div>
          </div>
          <div>
            <button className="button_like">
              <img src={curti}></img>
            </button>
            <button className="button_like" onClick={this.pular}>
              Pular
            </button>
            <button className="button_like">
              <img src={ncurti}></img>
            </button>
          </div>
        </div>
        {/* ))} */}
      </div>
    );
  }
}

export default App;
