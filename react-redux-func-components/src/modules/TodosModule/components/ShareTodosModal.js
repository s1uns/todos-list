import React, { useEffect, useState } from "react";
import { getAvailableUsers, shareTodos } from "../../../api";
import { useDispatch } from "react-redux";
import {
    Pagination,
    Modal,
    Box,
    Typography,
    Container,
    List,
    ListItem,
} from "@mui/material";
import { actionSuccessType } from "../../../store/actions/actionTypes";
import styled from "@emotion/styled";

const ShareTodosModal = (props) => {
    const { open, onClose } = props;
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();

    const handleClose = () => {
        setCurrentPage(0);
        onClose();
    };

    const setAvailableUsers = async (page, limit) => {
        const response = await getAvailableUsers(page, limit);

        if (response.success) {
            const { users, totalPages } = response.data;

            setUsers((prevUsers) => users);
            setTotalPages((prevTotalPages) => totalPages);
        } else {
            dispatch({
                type: actionSuccessType.ADD_NOTIFICATION_SUCCESS,
                payload: {
                    id: new Date(Date.now()),
                    message: response.message,
                },
            });
        }
    };

    const shareTodosWithUser = async (userId) => {
        const response = await shareTodos(userId);

        if (response.success) {
            dispatch({
                type: actionSuccessType.ADD_NOTIFICATION_SUCCESS,
                payload: {
                    id: new Date(Date.now()),
                    message: response.data,
                },
            });

            onClose();
        } else {
            if (response.success) {
                dispatch({
                    type: actionSuccessType.ADD_NOTIFICATION_SUCCESS,
                    payload: {
                        id: new Date(Date.now()),
                        message: response.data,
                    },
                });
            }
        }
    };

    useEffect(() => {
        if (open) {
            setAvailableUsers(currentPage, 3);
        }
    }, [open, currentPage]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ShareWithUserModal>
                <Typography id="modal-modal-title" variant="h3" component="h2">
                    Share your todos
                </Typography>
                <Typography
                    id="modal-modal-description"
                    variant="h5"
                    sx={{ mt: 2 }}
                >
                    Select the user to share your todos with from the list below
                </Typography>
                <UsersList>
                    {users.map((user) => (
                        <UserInfo
                            key={user.id}
                            onClick={() => shareTodosWithUser(user.id)}
                        >
                            {user.username} ({user.fullName})
                        </UserInfo>
                    ))}
                </UsersList>
            </ShareWithUserModal>
            {/* <Pagination count={totalPages} variant="outlined" shape="rounded" /> */}
        </Modal>
    );
};

export default ShareTodosModal;

const ShareWithUserModal = styled(Box)({
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40rem",
    height: "30rem",
    backgroundColor: "white",
    border: "2px solid #000",
    borderRadius: "2rem",
    boxShadow: 24,
    padding: "2rem",
});

const UsersList = styled(List)({
    width: "100%",
    fontSize: "2rem",
});

const UserInfo = styled(ListItem)({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    border: ".03rem solid black",
    borderRadius: "1rem",
    marginBottom: ".3rem",

    "&:hover": {
        backgroundColor: "#F5F5F5",
        cursor: "pointer",
        transform: "translateY(-.1rem)",
    },
});
