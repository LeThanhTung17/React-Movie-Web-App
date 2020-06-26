import React, { Component } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL, BACKDROP_SIZE } from "../../config";
import "./Home.css";
import HeroImage from "../elements/HeroImage";
import SearchBar from "../elements/SearchBar";
import MovieThumb from "../elements/MovieThumb";
import FourColGrid from "../elements/FourColGrid";
import LoadMoreBtn from "../elements/LoadMoreBtn";

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

  LoadMoreItems = () => {
    let endpoint = "";
    this.setState({ loading: true });

    if (this.state.searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
        this.state.currentPage + 1
      }`;
    } else {
      endpoint = `${API_URL}search/popular?api_key=${API_KEY}&language=en-US&query=${
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
          loading: true,
          currentPage: data.page,
          totalPages: data.total_pages,
        });
      });
  };

  render() {
    return (
      <div className="rmdb-hame">
        <HeroImage />
        <SearchBar />
        <FourColGrid />
        <MovieThumb />
        <SearchBar />
        <LoadMoreBtn />
      </div>
    );
  }
}

export default Home;
