import React, { Component } from "react";
import {
  API_KEY,
  API_URL,
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
  POSTER_SIZE,
} from "../../config";
import FourColGrid from "../elements/FourColGrid";
import HeroImage from "../elements/HeroImage";
import LoadMoreBtn from "../elements/LoadMoreBtn";
import MovieThumb from "../elements/MovieThumb";
import SearchBar from "../elements/SearchBar";
import Spinner from "../elements/Spinner";
import "./Home.css";

class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    searchTerm: "",
    currentPage: 0,
    totalPages: 0,
  };

  componentDidMount() {
    this.setState({ loading: true });
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchItems(endpoint);
  }

  searchItems = (searchTerm) => {
    console.log(searchTerm);
    let endpoint = "";
    this.setState({
      loading: true,
      movies: [],
      searchTerm,
    });

    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}`;
    }
    this.fetchItems(endpoint);
  };

  LoadMoreItems = () => {
    let endpoint = "";
    this.setState({ loading: true });

    if (this.state.searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
        this.state.currentPage + 1
      }`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${
        this.state.searchTerm
      }&page=${this.state.currentPage + 1}`;
    }

    this.fetchItems(endpoint);
  };

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((data) => {
        this.setState({
          movies: [...this.state.movies, ...data.results],
          heroImage: this.state.heroImage || data.results[0],
          loading: false,
          currentPage: data.page,
          totalPages: data.total_pages,
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    console.log(this.state.movies);
    const { movies, searchTerm, loading, currentPage, totalPages } = this.state;
    return (
      <div className="rmdb-home">
        <div>
          {this.state.heroImage ? (
            <div>
              <HeroImage
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}/${this.state.heroImage.backdrop_path}`}
                title={this.state.heroImage.original_title}
                text={this.state.heroImage.overview}
              />
              <SearchBar callback={this.searchItems} />
            </div>
          ) : null}
        </div>
        <div className="rmdb-home-grid">
          <FourColGrid
            header={searchTerm ? "Search result" : "Popular movies"}
            loading={loading}
          >
            {movies.map((el, i) => {
              return (
                <MovieThumb
                  key={i}
                  clickable={true}
                  image={
                    el.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${el.poster_path}`
                      : "./images/no_image.jpg"
                  }
                  movieId={el.id}
                  movieName={el.original_title}
                />
              );
            })}
          </FourColGrid>
          {loading ? <Spinner /> : null}
          {currentPage <= totalPages ? (
            <LoadMoreBtn text="Load More" onClick={this.LoadMoreItems} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
