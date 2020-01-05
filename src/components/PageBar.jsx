import React, { Component } from "react";
import { Link } from "react-router-dom";

const env = process.env;
const upperPageBound = env.REACT_APP_UPPER_PAGE_BOUND;

class PageBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageRange: [1, 2, 3, 4, 5]
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { page } = this.props;
    if (!prevState.pageRange.includes(page)) {
      let { pageRange } = prevState;
      let firstPage = pageRange[0];
      if (page < firstPage) {
        firstPage = Math.max(1, page - 4);
        pageRange = range(firstPage, firstPage + 5);
      } else {
        const lastPage = Math.min(page + 4, upperPageBound);
        pageRange = range(lastPage - 4, lastPage + 1);
      }
      this.setState({ pageRange });
    }
  }

  render() {
    const { pageRange } = this.state;
    const { page } = this.props;

    return (
      <nav aria-label="..." className="navbar">
        <ul className="pagination mx-auto">
          <li className={"page-item" + (page <= 1 && " disabled")}>
            <Link className="page-link" to={`/${page - 1}`}>
              Previous
            </Link>
          </li>
          {pageRange.map(number => (
            <li
              key={number}
              className={"page-item" + (page === number && " active")}
            >
              <Link className="page-link active" to={`/${number}`}>
                {number}
              </Link>
            </li>
          ))}
          <li className={"page-item" + (page >= upperPageBound && " disabled")}>
            <Link className="page-link" to={`/${page + 1}`}>
              Next
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

function range(start, end) {
  return [...Array(end).keys()].slice(start);
}

export default PageBar;
