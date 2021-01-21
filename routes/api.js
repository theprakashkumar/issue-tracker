'use strict';

const { update } = require('../models/issue');
const Issue = require('../models/issue');
const Project = require('../models/project');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

mongoose.model("Issue");

module.exports = function (app) {

  app.route('/api/issues/:project')

    // You can send a GET request to /api/issues/{projectname} for an array of all issues for that specific projectname, with all the fields present for each issue.

    // You can send a GET request to /api/issues/{projectname} and filter the request by also passing along any field and value as a URL query (ie. /api/issues/{project}?open=false). You can pass one or more field/value pairs at once.
    // .get(function(req, res){
    //   Issue.findById(req.query._id, (err, found) => {
    //     if(err) console.log(err);
    //     res.send(found);
    //   })
    // })
    .get(function (req, res){
      let project = req.params.project;

      let searchQuery = req.query;
      
      if(searchQuery.open){
        searchQuery.open = String(searchQuery.open) === "true";
      }

      // if(searchQuery._id){
      //   searchQuery._id = ObjectId(searchQuery._id);
      //   console.log(searchQuery._id);

      // }

      //console.log(searchQuery._id);

      Project.find({name: project}).populate('issue').exec((err, populatedProject) => {
      if(err) console.log(err);
      let filteredIssue = populatedProject[0].issue;
      if(searchQuery){
        for(var parameter in searchQuery){
          filteredIssue = filteredIssue.filter(issue => {
            return issue[parameter] == searchQuery[parameter];
          });
        }
      } 
      res.send(filteredIssue);
      })
    })
    
    // If you send a POST request to /api/issues/{projectname} without the required fields, returned will be the error { error: 'required field(s) missing' }

    .post(function (req, res){
      let project = req.params.project;
      let body = req.body;

      if(!body.issue_title || !body.issue_text || !body.created_by){
        res.json({error: 'required field(s) missing'});
      }else{
        // look if project already exist
        Project.findOne({name: project}, (err, foundProject) => {
          if(err){
            console.log(err);   
          // if there is no project
          }else if(foundProject===null){
            Project.create({
              name: project
            }, (err, newProject) => {
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
                  if(err){
                    console.log(err);
                  }
                  // made new project and new issue now push new issue to newly made project
                  newProject.issue.push(newIssue);
                  newProject.save((err, savedProject) => {
                    err ? console.log(err) : res.json(newIssue);
                  });
                  });
              }
            })
          // if we get matched project
          }else if(foundProject){
            // create a new issue
            Issue.create({
              issue_title: body.issue_title,
              issue_text: body.issue_text,
              created_by: body.created_by,
              assigned_to: body.assigned_to,
              status_text: body.status_text
            }, (err, newIssue) => {
              if(err){
                console.log(err);
              }
              foundProject.issue.push(newIssue);
              foundProject.save((err, savedProject) => {
                err ? console.log(err) : res.json(newIssue);
              });
               });
          }
        }) 
      }
    })

      // You can send a PUT request to /api/issues/{projectname} with an _id and one or more fields to update. On success, the updated_on field should be updated, and returned should be {  result: 'successfully updated', '_id': _id }.

      // When the PUT request sent to /api/issues/{projectname} does not include an _id, the return value is { error: 'missing _id' }.

      // When the PUT request sent to /api/issues/{projectname} does not include update fields, the return value is { error: 'no update field(s) sent', '_id': _id }. On any other error, the return value is { error: 'could not update', '_id': _id }.

      // TODO: have to add check to close the issue

    // put is use to overwrite
    .put(function (req, res){
      let project = req.params.project;
      let body = req.body;
      // Store `id` and delete it.
      let id = body._id;
      delete body._id;

      let updates = req.body;
      // Delete all field which is empty.
      for(let data in updates){
        if(!updates[data]) delete updates[data];
      }
      // Extract boolean from string.
      if(updates.open) updates.open = String(!updates.open) === "true";
      // if no id sent
      if(!id){
        return res.json({ error: 'missing _id' });
      }else if(Object.keys(updates).length === 0){
          return res.json({error: 'no update field(s) sent', '_id': id });
      }else{
        updates.updated_on = new Date();
        Issue.findByIdAndUpdate(id, updates, (err, updatedIssue) => {
          // handle err and when there is not matched id
          if(err || updatedIssue===null){
            console.log("put", err);
            return res.json({ 
              error: 'could not update', 
              _id: id 
            });
          }else{
            return res.json({
              result: 'successfully updated',
              _id: id
            })
          }
        })
      }
    })
    

    // You can send a DELETE request to /api/issues/{projectname} with an _id to delete an issue. If no _id is sent, the return value is { error: 'missing _id' }. On success, the return value is { result: 'successfully deleted', '_id': _id }. On failure, the return value is { error: 'could not delete', '_id': _id }.
    
    .delete(function (req, res){
      let project = req.params.project;

      if(!req.body._id){
        // console.log("Missing");
        return res.send({
          error: 'missing _id'
        });
      }

      Issue.findByIdAndDelete(req.body._id, (err, issue) => {
        if (err || issue===null) {
          // console.log("could not delete");
          return res.json({
            error: 'could not delete',
            '_id': req.body._id 
          })
        }
        //console.log("success");
        res.json({
          result: 'successfully deleted',
          '_id': req.body._id 
        });
      });
    });
};

// {"assigned_to":"","status_text":"","open":true,"_id":"5ffaf0391e4e61664fae937c","issue_title":"king","issue_text":"kings issue","created_by":"kingg","created_on":"2021-01-10T12:16:57.386Z","updated_on":"2021-01-10T12:16:57.386Z"}

// 5ffc573d1e4e61664fae939e
