import joi from "joi";

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const schema_validator = joi.object({
    adminName: joi.string().required(),
    adminEmail: joi.string().email().required(),
    adminPassword: joi.string().max(10).min(3).required(),
    adminRole: joi.string().required(),
    // adminBranch: joi.string().required(),
});

const validate = validator(schema_validator);

export default validate;
