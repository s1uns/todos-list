import { ClickAwayListener } from "@mui/material";

const withClickOutside = (WrappedComponent, onClickOutside) => {
    return (props) => {
        return (
            <ClickAwayListener onClickAway={onClickOutside}>
                <WrappedComponent {...props} />;
            </ClickAwayListener>
        );
    };
};

export default withClickOutside;
