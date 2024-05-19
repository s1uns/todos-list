import React, { Component } from "react";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsCount: this.props.itemsCount,
            currentFilter: this.props.currentFilter,
        };
        this.setFilter = this.setFilter.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
    }

    setFilter = (filter) => {
        this.setState((prevState) => ({ ...prevState, currentFilter: filter }));
        this.props.setFilter(filter);
    };
    clearCompleted = () => {
        this.props.clearCompleted();
    };

    render() {
        const { itemsCount, currentFilter } = this.state;

        return (
            <div className="todos-footer">
                <span id="counter">{itemsCount} items left</span>
                <div className="todos-filters">
                    <button
                        id="all-btn"
                        className={currentFilter === "all" ? "active" : ""}
                        onClick={() => this.setFilter("all")}
                    >
                        All
                    </button>
                    <button
                        id="active-btn"
                        className={currentFilter === "active" ? "active" : ""}
                        onClick={() => this.setFilter("active")}
                    >
                        Active
                    </button>
                    <button
                        id="completed-btn"
                        className={
                            currentFilter === "completed" ? "active" : ""
                        }
                        onClick={() => this.setFilter("completed")}
                    >
                        Completed
                    </button>
                </div>
                <button id="clear-btn" onClick={this.clearCompleted}>
                    Clear completed
                </button>
            </div>
        );
    }
}

export default Footer;
