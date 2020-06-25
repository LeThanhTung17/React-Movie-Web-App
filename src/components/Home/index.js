import React, { Component } from "react";
import "./Home.css";
import HeroImage from "../elements/HeroImage";
import SearchBar from "../elements/SearchBar";
import MovieThumb from "../elements/MovieThumb";
import FourColGrid from "../elements/FourColGrid";
import LoadMoreBtn from "../elements/LoadMoreBtn";

class Home extends Component {
  state = {};

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
