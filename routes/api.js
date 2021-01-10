'use strict';

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      res.send(project);
      
    })
    
    .post(function (req, res){
      let project = req.params.project;
      
    })
    // put is use to overwrite
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};

// {"assigned_to":"","status_text":"","open":true,"_id":"5ffaf0391e4e61664fae937c","issue_title":"king","issue_text":"kings issue","created_by":"kingg","created_on":"2021-01-10T12:16:57.386Z","updated_on":"2021-01-10T12:16:57.386Z"}
