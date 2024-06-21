const validateBody =  (schema) => async (req, res, next) => {
    const { body } = req;

    console.log("body: ", body)

    if (typeof schema === "function") {
        schema = schema();
    }
    try {
        await schema.validate(body, { abortEarly: false });
        next();
    } catch (err) {
        return res.badRequest(err.errors.join(" "));
    }
};

export { validateBody };
