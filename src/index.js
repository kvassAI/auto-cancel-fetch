import React from "react";
import { smartFetch, abortFetches } from "./smartFetch";
import { abortPromises, smartPromise } from "./smartPromise";

export default WrappedComponent => {
  class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.name = WrappedComponent.name;
      this.fetch = (...args) => smartFetch(this.name, ...args);
      this.promiseWrapper = promise => smartPromise(this.name, promise);
    }
    componentWillUnmount() {
      abortFetches(this.name);
      abortPromises(this.name);
    }
    render() {
      return <WrappedComponent {...this.props} fetch={this.fetch} promiseWrapper={this.promiseWrapper}/>;
    }
  }

  return HOC;
};
