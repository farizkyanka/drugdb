const baseJoi = require('joi');
const sanitizeHTML = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHTML(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', {value})
                return clean;
            }
        }
    }
});

const joi = baseJoi.extend(extension);

module.exports.drugValidation = joi.object({
    name: baseJoi.string().required(),
    img: baseJoi.string().required(),
    composition: baseJoi.string().required(),
    form: baseJoi.string().required(),
    category: baseJoi.string().required(),
    indication: baseJoi.string().required(),
    dose: baseJoi.string().required(),
    contraindication: baseJoi.string().required(),
    manufacturer: baseJoi.array().items(baseJoi.string()),
    pregnancyCategory: baseJoi.string().required(),
    lactationSafety: baseJoi.string().required()
})