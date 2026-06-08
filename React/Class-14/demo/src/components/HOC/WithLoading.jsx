// HOF/C

import React, { Component, useState, useEffect } from "react";

const WithLoading = (Comp) => {
  //   return class extends Component {
  //     constructor(props) {
  //       super(props);
  //       this.state = {
  //         isLoading: true,
  //       };
  //     }

  //     componentDidMount() {
  //       setTimeout(() => {
  //         this.setState({
  //           isLoading: false,
  //         });
  //       }, 4000);
  //     }

  //     render() {
  //       if (this.state.isLoading) {
  //         return <h1>Loading...</h1>;
  //       } else {
  //         return <Comp {...this.props} />;
  //       }
  //     }
  //   };

  // using functional component and hooks

  return (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 4000);

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return <h1>Loading...</h1>;
    } else {
      return <Comp {...props} />;
    }
  };
};

export default WithLoading;
