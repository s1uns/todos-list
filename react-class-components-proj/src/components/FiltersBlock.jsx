import React, { Component } from "react";

export default class FiltersBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFilter: "string",
            filters: [],
        };
    }
    
    render() {
        return <div>FiltersBlock</div>;
    }
}
