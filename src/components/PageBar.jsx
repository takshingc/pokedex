import React, { Component } from "react";

class PageBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageRange: [1, 2, 3, 4, 5],
      upperPageBound: this.props.upperPageBound
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { page } = this.props;
    if (!prevState.pageRange.includes(page)) {
      this.setPageRange(page);
    }
  }

  handleClick = event => {
    const page = parseInt(event.target.id, 10);
    this.props.clickHandler(page);
  };

  handleDelta = (page, delta = 0) => {
    const currentPage = page + delta;
    this.setPageRange(currentPage);
    this.props.clickHandler(currentPage);
  };

  render() {
    const { pageRange, upperPageBound } = this.state;
    const { page } = this.props;

    const previousButton = page => (
      <li className={"page-item" + (page <= 1 && " disabled")}>
        <button
          className="page-link"
          tabIndex="-1"
          onClick={() => this.handleDelta(page, -1)}
        >
          Previous
        </button>
      </li>
    );

    const nextButton = page => (
      <li className={"page-item" + (page >= upperPageBound && " disabled")}>
        <button className="page-link" onClick={() => this.handleDelta(page, 1)}>
          Next
        </button>
      </li>
    );

    return (
      <nav aria-label="..." className="navbar">
        <ul className="pagination mx-auto">
          {previousButton(page)}
          {pageRange.map(number => (
            <li
              key={number}
              className={"page-item" + (page === number && " active")}
            >
              <button
                id={number}
                className="page-link active"
                onClick={this.handleClick}
              >
                {number}
              </button>
            </li>
          ))}
          {nextButton(page)}
        </ul>
      </nav>
    );
  }

  setPageRange = page => {
    let { pageRange } = this.state;
    const { upperPageBound } = this.props;

    let firstPage = pageRange[0];
    let lastPage = pageRange[pageRange.length - 1];

    if (page > lastPage) {
      lastPage = Math.min(page + 4, upperPageBound);
      pageRange = range(lastPage - 4, lastPage + 1);
    } else if (page < firstPage) {
      firstPage = Math.max(1, page - 4);
      pageRange = range(firstPage, firstPage + 5);
    }
    this.setState({ pageRange });
  };
}

function range(start, end) {
  return [...Array(end).keys()].slice(start);
}

export default PageBar;
