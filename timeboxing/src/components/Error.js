import React from "react";

class Error extends React.Component {
  state = {
    hasError: false
  };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log("Wystąpił błąd: ", error, info);
  }
  render() {
    const { message, children } = this.props;
    return this.state.hasError ? message : children;
  }
}

export default Error;
