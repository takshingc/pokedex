import React, { Component } from "react";

class PageBar extends Component {
  constructor(props) {
    super(props);
    this.state = { pageRange: [1, 2, 3, 4, 5] };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.page !== prevProps.page) {
      const page = this.props.page;
      const pageRange = this.getPageRange(page);
      this.setState({ pageRange });
    }
  }

  handleClick = event => {
    const page = parseInt(event.target.id, 10);
    this.props.clickHandler(page);
  };

  callClickHandler = (page, delta = 0) => {
    const currentPage = page + delta;
    const pageRange = this.getPageRange(currentPage);
    this.props.clickHandler(currentPage);
    this.setState({ pageRange });
  };

  render() {
    const { pageRange } = this.state;
    const { page, upperPageBound } = this.props;
    return (
      <nav aria-label="..." className="navbar">
        <ul className="pagination mx-auto">
          <li className={"page-item" + (page <= 1 && " disabled")}>
            <button
              className="page-link"
              tabIndex="-1"
              onClick={() => this.callClickHandler(page, -1)}
            >
              Previous
            </button>
          </li>
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
          <li className={"page-item" + (page >= upperPageBound && " disabled")}>
            <button
              className="page-link"
              onClick={() => this.callClickHandler(page, 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }

  getPageRange = page => {
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
    return pageRange;
  };
}

function range(start, end) {
  return [...Array(end).keys()].slice(start);
}

export default PageBar;
