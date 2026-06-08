import React, { Component } from "react";


class HelloWorld extends Component {
    constructor(props) {
        super(props);
        this.name = props.name;
    }

    render() {
        return <h1>Hello World {this.name}</h1>
    }

}


export default HelloWorld;