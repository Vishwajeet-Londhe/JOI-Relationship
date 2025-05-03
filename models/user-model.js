/*
const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect("mongodb://127.0.0.1:27017/joi");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        integer: true
    },
    contact: {
        type: Number,
        length: 10
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },
});

function validateModel(data) {
    const Schema = Joi.object({
        username: Joi.string()
            .pattern(/^[a-zA-Z0-9_]+$/)  // Allows alphanumeric and underscore
            .min(3)
            .max(30)
            .required()
            .messages({
                'string.pattern.base': 'Username must contain only letters, numbers, and underscores',
                'string.min': 'Username must be at least 3 characters long',
                'string.max': 'Username must be at most 30 characters long',
                'any.required': 'Username is required'
            }),

        name: Joi.string()
            .min(2)
            .max(50)
            .pattern(/^[a-zA-Z\s]*$/)  // Allows letters and spaces only
            .required()
            .messages({
                'string.min': 'Name must be at least 2 characters long',
                'string.max': 'Name must be at most 50 characters long',
                'string.pattern.base': 'Name must contain only letters and spaces',
                'any.required': 'Name is required'
            }),

        age: Joi.number()
            .integer()
            .min(0)
            .max(150)
            .required()
            .messages({
                'number.integer': 'Age must be a whole number',
                'number.min': 'Age cannot be negative',
                'number.max': 'Age must be less than 150 years',
                'any.required': 'Age is required'
            }),

        contact: Joi.number()
            .integer()
            .min(1000000000)
            .max(9999999999)
            .required()
            .messages({
                'number.integer': 'Contact number must be a valid phone number',
                'number.min': 'Invalid contact number',
                'number.max': 'Invalid contact number',
                'any.required': 'Contact number is required'
            }),

        email: Joi.string()
            .email()
            .required()
            .custom((value, helpers) => {
                const regex = /^[^\s@]+@[^\s@]+\.(com|net)$/;
                if (!regex.test(value)) {
                    return helpers.message("Please enter a valid email address with .com or .net domain");
                }
                return value;
            })
            .messages({
                "string.email": "make sure your email is right",
            })
    });  // ✅ Correctly closed Schema object!

    let { error } = Schema.validate(data);
    return error;
}

module.exports.userModel = mongoose.model("User", userSchema);
module.exports.validateModel = validateModel;
*/

// Relationship Introduction
/*m1
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/joi");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    posts: [
        {
            content: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

module.exports = mongoose.model("User", userSchema);
*/


// realtionship embedding
/*const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/joi");

const postSchema = mongoose.Schema({
    content: String,
    date: {
        type: Date,
        default: Date.now
    }
})

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    posts: [postSchema]
})

module.exports = mongoose.model("User", userSchema);
*/

//relationship referencing

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/joi");

const postSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
})

module.exports = mongoose.model("User", postSchema);