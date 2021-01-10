const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    issue_title: String,
    issue_text: String,
    created_on: {
        type: Date, 
        default: Date.now()
    },
    updated_on: {
        type: Date,
        default: Date.now()
    },
    created_by: String,
    assigned_to: String,
    open: {
        type: Boolean,
        default: true
    },
    status_text: String
});

module.exports = mongoose.model("Issue", IssueSchema);