import { Field } from "react-final-form";

const mapToField = (componentObject, mapper) => {
    return (
        <Field
            key={componentObject.name}
            {...componentObject}
            component={mapper[componentObject.componentType]}
        />
    );
};

export default mapToField;
