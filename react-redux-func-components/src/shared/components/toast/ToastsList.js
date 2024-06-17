import "./index.css";
import React from "react";
import { useSelector } from "react-redux";
import Toast from "./Toast";

const ToastsList = () => {
    const toasts = useSelector((state) => state.toasts);

    return (
        <div className="toasts">
            {toasts.length
                ? toasts.map((toast) => (
                      <Toast
                          key={toast.id}
                          id={toast.id}
                          message={toast.message}
                      />
                  ))
                : ""}
        </div>
    );
};

export default ToastsList;
