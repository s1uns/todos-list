import React, { Component } from "react";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsCount: this.props.itemsCount,
            currentFilter: this.props.currentFilter,
        };
    }

    setFilter = (filter) => {
        this.props.setFilter(filter);
        this.setState({ currentFilter: filter });
    };

    clearCompleted = () => {
        this.props.clearCompleted();
    };

    componentDidUpdate(prevProps) {
        if (prevProps.itemsCount !== this.props.itemsCount) {
            this.setState({
                itemsCount: this.props.itemsCount,
            });
        }
    }

    render() {
        const { itemsCount, currentFilter } = this.state;
        const { setFilter, clearCompleted } = this;

        return (
            <div className="todos-footer">
                <span id="counter">{itemsCount} items left</span>
                <div className="todos-filters">
                    <button
                        id="all-btn"
                        className={currentFilter === "all" ? "active" : ""}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>
                    <button
                        id="active-btn"
                        className={currentFilter === "active" ? "active" : ""}
                        onClick={() => setFilter("active")}
                    >
                        Active
                    </button>
                    <button
                        id="completed-btn"
                        className={
                            currentFilter === "completed" ? "active" : ""
                        }
                        onClick={() => setFilter("completed")}
                    >
                        Completed
                    </button>
                </div>
                <button id="clear-btn" onClick={clearCompleted}>
                    Clear completed
                </button>
            </div>
        );
    }
}

export default Footer;
