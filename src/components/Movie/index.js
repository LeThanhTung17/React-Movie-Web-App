import React, { Component } from "react";
import { API_KEY, API_URL } from "../../config";
import Navigation from "../elements/Navigation";
import MovieInfo from "../elements/MovieInfo";
import MovieInfoBar from "../elements/MovieInfoBar";
import FourColGrid from "../elements/FourColGrid";
import Spinner from "../elements/Spinner";
import Actor from "../elements/Actor";
import "./Movie.css";

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    // first fetch movie...
    let endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
    this.fetchItems(endpoint);
  }

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (data.status_code) {
          this.setState({ loading: false });
        } else {
          this.setState({ movie: data }, () => {
            // ... then fetch actors in the setState callback function

            let endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
            fetch(endpoint)
              .then((data) => data.json())
              .then((data) => {
                const directors = data.crew.filter(
                  (member) => member.job === "Director"
                );

                this.setState({
                  actors: data.cast,
                  directors,
                  loading: false,
                });
              });
          });
        }
      })
      .catch((error) => console.log("Error!", error));
  };

  render() {
    const { movie, directors, actors, loading } = this.state;
    return (
      <div className="rmdb-movie">
        {movie ? (
          <div>
            <Navigation movie={this.props.location.movieName} />
            <MovieInfo movie={movie} directors={directors} />
            <MovieInfoBar
              time={movie.runtime}
              budget={movie.budget}
              revenue={movie.revenue}
            />
          </div>
        ) : null}
        {actors ? (
          <div className="rmdb-movie-grid">
            <FourColGrid header={"Actor"}>
              {actors
                .map((el, i) => {
                  return <Actor key={i} actor={el} />;
                })
                .slice(0, 20)}
            </FourColGrid>
          </div>
        ) : null}
        {!actors ? <h1>No Movie Found!</h1> : null}
        {loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Movie;
