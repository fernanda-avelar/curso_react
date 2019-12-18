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
      renderView: 0,
      searchTerm: "",
      key: 0,
      moviesList: [],
      likedList: [],
      current: []
    };

    this.pular = this.pular.bind(this);
    this.liked = this.liked.bind(this);
  }
  liked() {
    debugger;
    let array = this.state.likedList;

    let find = array.find(x => x.id === this.state.current.id);

    if (array.length === 0) array.push(this.state.current);
    else if (find === undefined && array.length > 0) array.push(this.state.current);

    this.setState({
      likedList: array
    });
    console.log(this.state.likedList);

    this.pular();
  }

  pular() {
    var index = this.state.key + 1;

    if (index > 19) index = 0;
    var mov = this.state.moviesList;
    console.log("BOTAO");
    this.setState({
      key: index,
      current: mov[index]
    });
  }

  componentDidMount() {
    // event.preventDefault();
    // debugger;
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
    // console.log(this.state.current);
    // debugger;
    switch (this.state.renderView) {
      case 0:
        const movies = this.state.current;
        return (
          <div className="App">
            <div>
              <button onClick={() => this.setState({ renderView: 1 })}>
                Liked Movies
              </button>
              <button><b>List</b></button>
            </div>
            {/* {this.state.current.map(movies => ( */}
            <div key={String(movies.id)} style={{ margin: "110px" }}>
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
                  <img src={curti} onClick={this.liked}></img>
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
      case 1:
        // const liked = this.state.likedList;
        return (
          <div className="App">
            <div>
              <button><b>Liked Movies</b></button>
              <button onClick={() => this.setState({ renderView: 0 })}>
                List
              </button>
            </div>
            {this.state.likedList.map(liked => (
              <div key={String(liked.id)} style={{ margin: "80px" }}>
                <div className="movie-card-container">
                  <div className="image-container">
                    <div
                      className="bg-image"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${liked.poster_path})`,
                        width: "400px"
                      }}
                    />
                  </div>

                  <div className="movie-info">
                    <h2>Movie Details</h2>
                    <div>
                      <h1>{liked.title}</h1>
                      <small>Released Date: {liked.release_date}</small>
                    </div>
                    <h4>Rating: {liked.vote_average} / 10</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
    }
  }
}

export default App;
