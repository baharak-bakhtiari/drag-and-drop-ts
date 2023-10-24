namespace App {
    //validation function

    export interface validatable {
        value: string | number;
        required?: boolean;
        minLenght?: number;
        maxLenght?: number;
        min?: number;
        max?: number;
    }

    export function validate(validatableValue: validatable) {
        let isValid = true;
        if (validatableValue.required) {
            isValid = isValid && validatableValue.value.toString().trim().length !== 0;
        }
        if (validatableValue.minLenght && typeof validatableValue.value === "string") {
            isValid = isValid && validatableValue.value.toString().trim().length >= validatableValue.minLenght;
        }
        if (validatableValue.maxLenght && typeof validatableValue.value === "string") {
            isValid = isValid && validatableValue.value.toString().trim().length <= validatableValue.maxLenght;
        }
        if (validatableValue.min && typeof validatableValue.value === "number") {
            isValid = isValid && +validatableValue.value >= validatableValue.min;
        }
        if (validatableValue.max && typeof validatableValue.value === "number") {
            isValid = isValid && +validatableValue.value <= validatableValue.max;
        }
        return isValid;
    }

}