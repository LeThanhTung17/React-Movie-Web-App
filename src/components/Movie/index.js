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
    return (
      <div className="rmdb-movie">
        <Navigation />
        <MovieInfo />
        <MovieInfoBar />
        <FourColGrid />
        <Spinner />
      </div>
    );
  }
}

export default Movie;
