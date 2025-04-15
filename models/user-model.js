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

function validateModel(data){
    const Schema = Joi.object({
        username: Joi.string()
          .pattern(/^[a-zA-Z0-9_]+$/)  // Allows alphanumeric and underscore
          .min(3)
          .max(30)
          .required()
          .messages({
            'string.pattern': 'Username must contain only letters, numbers, and underscores',
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
            'string.pattern': 'Name must contain only letters and spaces',
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
          .email({ tlds: { allow: false } })
          .required()
          .messages({
            'string.email': 'Please enter a valid email address',
            'any.required': 'Email is required'
          })
      });    
}

module.exports = mongoose.model("User",userSchema); 