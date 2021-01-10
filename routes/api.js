'use strict';

const Issue = require('../models/issue');
const Project = require('../models/project');

module.exports = function (app) {

  app.route('/api/issues/:project')

    // You can send a GET request to /api/issues/{projectname} for an array of all issues for that specific projectname, with all the fields present for each issue.

    // You can send a GET request to /api/issues/{projectname} and filter the request by also passing along any field and value as a URL query (ie. /api/issues/{project}?open=false). You can pass one or more field/value pairs at once.
  
    .get(function (req, res){
      let project = req.params.project;
      let issue_title;
      let issue_text;
      let created_on;
      let created_by;
      
    })
    
    // If you send a POST request to /api/issues/{projectname} without the required fields, returned will be the error { error: 'required field(s) missing' }

    .post(function (req, res){
      let project = req.params.project;
      let body = req.body;
      // look if project already exist
      Project.findOne({name: project}, (err, foundProject) => {
        if(err){
          console.log(err);
        // if project found
        }else if(foundProject){
          // create a new issue
          Issue.create({
            issue_title: body.issue_title,
            issue_text: body.issue_text,
            created_by: body.created_by,
            assigned_to: body.assigned_to,
            status_text: body.status_text
          }, (err, newIssue) => {
            err ? console.log(err) : (foundProject.issue.push(newIssue), res.json(newIssue));
            });
        }else if(!foundProject){
          Project.create({
            name: project
          }, (err, newUser) => {
            if(err){
              console.log(err);
            }else{
              Issue.create({
                issue_title: body.issue_title,
                issue_text: body.issue_text,
                created_by: body.created_by,
                assigned_to: body.assigned_to,
                status_text: body.status_text
              }, (err, newIssue) => {
                err ? console.log(err) : newUser.issue.push(newIssue);
                });
            }
            res.json(newIssue);
          })
        }
      }) 
    })

      // You can send a PUT request to /api/issues/{projectname} with an _id and one or more fields to update. On success, the updated_on field should be updated, and returned should be {  result: 'successfully updated', '_id': _id }.

      // When the PUT request sent to /api/issues/{projectname} does not include an _id, the return value is { error: 'missing _id' }.

      // When the PUT request sent to /api/issues/{projectname} does not include update fields, the return value is { error: 'no update field(s) sent', '_id': _id }. On any other error, the return value is { error: 'could not update', '_id': _id }.



    // put is use to overwrite
    .put(function (req, res){
      let project = req.params.project;
      
    })
    

    // You can send a DELETE request to /api/issues/{projectname} with an _id to delete an issue. If no _id is sent, the return value is { error: 'missing _id' }. On success, the return value is { result: 'successfully deleted', '_id': _id }. On failure, the return value is { error: 'could not delete', '_id': _id }.
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};

// {"assigned_to":"","status_text":"","open":true,"_id":"5ffaf0391e4e61664fae937c","issue_title":"king","issue_text":"kings issue","created_by":"kingg","created_on":"2021-01-10T12:16:57.386Z","updated_on":"2021-01-10T12:16:57.386Z"}
