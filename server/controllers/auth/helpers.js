export const validateEmail = async (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};
export const validatePassword = async (password) => {
    return String(password).match(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/,
    );
};

export const validateFields = async (...args) => {
    for (const field of args) {
        const type = typeof field;
        switch (type) {
            case "string":
                if (field.trim().length === 0) {
                    return false;
                }
                break;
            case "number":
                if (!Number.isInteger(field)) {
                    return false;
                }
                break;
            case "object":
                break;
            default:
                console.warn(`Unexpected field type: ${type}`);
                break;
        }
    }

    return true;
};
