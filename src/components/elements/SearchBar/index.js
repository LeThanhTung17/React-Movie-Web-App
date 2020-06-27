import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import "./SearchBar.css";

class SearchBar extends Component {
  state = {
    value: "",
  };

  timeout = null;

  doSearch = (event) => {
    this.setState({ value: event.target.value });
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.props.callback(this.state.value);
    }, 500);
  };

  render() {
    return (
      <div className="rmdb-searchbar">
        <div className="rmdb-searchbar-content">
          <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
          <input
            className="rmdb-searchbar-input"
            type="text"
            value={this.state.value}
            onChange={this.doSearch}
            placeholder="Search"
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
