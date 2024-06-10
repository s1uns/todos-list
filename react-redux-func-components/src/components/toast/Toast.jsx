import "./Toast.css";
import { ToastContext } from "./toast-context";
import React, { useMemo, useState } from "react";
import { useTimeout } from "../../utils/hooks";

export default function Toast({ message, close }) {
    useTimeout(() => close(), 3000);
    return (
        <div className="toast">
            <p>{message}</p>
            <button className="close-btn" onClick={close}>
                {"\u274c"}
            </button>
        </div>
    );
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const openToast = (message) => {
        const newToast = {
            id: Date.now(),
            message: message,
        };

        setToasts((previousToasts) => [...previousToasts, newToast]);
    };

    const closeToast = (toastId) => {
        setToasts((previousToasts) =>
            previousToasts.filter((toast) => toast.id !== toastId),
        );
    };

    const contextValue = useMemo(
        () => ({
            open: openToast,
            close: closeToast,
        }),
        [],
    );

    return (
        <>
            <ToastContext.Provider value={contextValue}>
                {children}
            </ToastContext.Provider>
            <div className="toasts">
                {toasts.length
                    ? toasts.map((toast) => (
                          <Toast
                              key={toast.id}
                              message={toast.message}
                              close={() => closeToast(toast.id)}
                          />
                      ))
                    : ""}
            </div>
        </>
    );
}
