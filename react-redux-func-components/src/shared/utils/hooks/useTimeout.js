import { useEffect, useRef } from "react";

const useTimeout = (callback, timeout) => {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const functionId = setTimeout(() => savedCallback.current(), timeout);
        savedCallback.current = callback;

        return () => clearTimeout(functionId);
    }, []);
};

export default useTimeout;
