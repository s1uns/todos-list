import React, { Component } from "react";
import eventEmitter from "../store/EventEmitter";
import { actionRequestType } from "../store/constants";

class Footer extends Component {
    setFilter = (filter) => {
        eventEmitter.emit({
            type: actionRequestType.SET_FILTER_REQUEST,
            payload: filter,
        });
    };

    clearCompleted = () => {
        eventEmitter.emit({
            type: actionRequestType.CLEAR_COMPLETED_REQUEST,
        });
    };

    render() {
        const { itemsCount, currentFilter } = this.props;

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
