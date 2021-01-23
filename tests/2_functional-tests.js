const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

    //suite("POST Tests", function () {
    // Create an issue with every field: POST request to /api/issues/{project}
    // test('Create an Issue With Every Field Filled In', function (done) {
    //     let testData = {
    //         issue_title: "Test Title",
    //         issue_text: "Test Text",
    //         created_by: "Text- Create an Issue With Every Field Filled In",
    //         assigned_to: "Chai & Mocha",
    //         status_text: "Testing"
    //     };
    //     chai.request(server)
    //         .post('/api/issues/test')
    //         .send(testData)
    //         .end(function (err, res) {
    //             assert.equal(res.status, 200);
    //             assert.isObject(res.body);
    //             assert.nestedInclude(res.body, testData);
    //             assert.property(res.body, 'created_on');
    //             assert.isNumber(Date.parse(res.body.created_on));
    //             assert.property(res.body, 'updated_on');
    //             assert.isNumber(Date.parse(res.body.updated_on));
    //             assert.property(res.body, 'open');
    //             assert.isBoolean(res.body.open);
    //             assert.isTrue(res.body.open);
    //             assert.property(res.body, '_id');
    //             assert.isNotEmpty(res.body._id);
    //             assert.property(res.body, "issue_title");
    //             assert.equal(res.body.issue_title, "Test Title");
    //             assert.property(res.body, "issue_text");
    //             assert.equal(res.body.issue_text, "Test Text");
    //             assert.property(res.body, "issue_text");
    //             assert.equal(res.body.issue_text, "Test Text");
    //             assert.property(res.body, "created_by");
    //             assert.equal(res.body.created_by, "Text- Create an Issue With Every Field Filled In");
    //             assert.property(res.body, 'assigned_to');
    //             assert.equal(res.body.assigned_to, "Chai & Mocha");
    //             assert.property(res.body, 'status_text');
    //             assert.equal(res.body.status_text, "Testing");
    //             done();
    //         })
    // })

    // Create an issue with only required fields: POST request to /api/issues/{project}

    // test('Create an Issue With Only Required Fields', function (done) {
    //     let testData = {
    //         issue_title: "Test Title",
    //         issue_text: "Test Text",
    //         created_by: "Text- Create an Issue With Every Field Filled In",
    //     };
    //     chai.request(server)
    //         .post('/api/issues/test')
    //         .send(testData)
    //         .end(function (err, res) {
    //             assert.equal(res.status, 200);
    //             assert.isObject(res.body);
    //             assert.nestedInclude(res.body, testData);
    //             assert.property(res.body, 'created_on');
    //             assert.isNumber(Date.parse(res.body.created_on));
    //             assert.property(res.body, 'updated_on');
    //             assert.isNumber(Date.parse(res.body.updated_on));
    //             assert.property(res.body, 'open');
    //             assert.isBoolean(res.body.open);
    //             assert.isTrue(res.body.open);
    //             assert.property(res.body, '_id');
    //             assert.isNotEmpty(res.body._id);
    //             assert.property(res.body, "issue_title");
    //             assert.equal(res.body.issue_title, "Test Title");
    //             assert.property(res.body, "issue_text");
    //             assert.equal(res.body.issue_text, "Test Text");
    //             assert.property(res.body, "issue_text");
    //             assert.equal(res.body.issue_text, "Test Text");
    //             assert.property(res.body, "created_by");
    //             assert.equal(res.body.created_by, "Text- Create an Issue With Every Field Filled In");
    //             done();
    //         })
    // })

    // Create an issue with missing required fields: POST request to /api/issues/{project}

    // test('Create an Issue With Missing Required Fields', function (done) {
    //     let testData = {
    //         issue_title: "Test Title",
    //         issue_text: "Test Text",
    //     };
    //     chai.request(server)
    //         .post('/api/issues/test')
    //         .send(testData)
    //         .end(function (err, res) {
    //             console.log(res);
    //             assert.equal(res.status, 200);
    //             assert.equal(res.body.error, 'required field(s) missing');
    //             done();
    //         })
    // })


    //})


    // suite("GET Tests", function () {
    //     // View issues on a project: GET request to /api/issues/{project}
    //     test('Get All Issue in an Array', function (done) {
    //         let testData = {
    //             issue_title: "Get Issue Test Without Filter",
    //             issue_text: "Some Text",
    //             created_by: "Get Issue Tester"
    //         }
    //         let url = '/api/issues/test' + Date.now().toString().substring(7);
    //         chai.request(server)
    //             .post(url)
    //             .send(testData)
    //             .end(function (err, res) {

    //                 chai.request(server)
    //                     .get(url)
    //                     .end(function (err, res) {
    //                         assert.isArray(res.body);
    //                         assert.lengthOf(res.body, 1);
    //                         (res.body).forEach(element => {
    //                             assert.property(element, 'issue_title');
    //                             assert.property(element, 'issue_title');
    //                             assert.property(element, 'created_by')
    //                         });
    //                         done();
    //                     })
    //             })
    //     })

    //     // View issues on a project with one filter: GET request to /api/issues/{project}

    //     test('Get All Issue in an Array', function (done) {
    //         let testData = {
    //             issue_title: "Get Issue Test Without Filter",
    //             issue_text: "Some Text",
    //             created_by: "Get Issue Tester"
    //         }
    //         let url = '/api/issues/test' + Date.now().toString().substring(7) + '?open=true';
    //         chai.request(server)
    //             .post(url)
    //             .send(testData)
    //             .end(function (err, res) {

    //                 chai.request(server)
    //                     .get(url)
    //                     .end(function (err, res) {
    //                         assert.isArray(res.body);
    //                         assert.lengthOf(res.body, 1);
    //                         (res.body).forEach(element => {
    //                             assert.property(element, 'issue_title');
    //                             assert.property(element, 'issue_title');
    //                             assert.property(element, 'created_by')
    //                         });
    //                         done();
    //                     })
    //             })
    //     })

    //     // View issues on a project with multiple filters: GET request to /api/issues/{project}

    //     test('Get All Issue in an Array', function (done) {
    //         let testData = {
    //             issue_title: "Get Issue Test Without Filter",
    //             issue_text: "Some Text",
    //             created_by: "Get Issue Tester"
    //         }
    //         let url = '/api/issues/test' + Date.now().toString().substring(7) + '?open=true?created_by=Get%20Issue%20Tester';
    //         chai.request(server)
    //             .post(url)
    //             .send(testData)
    //             .end(function (err, res) {

    //                 chai.request(server)
    //                     .get(url)
    //                     .end(function (err, res) {
    //                         assert.isArray(res.body);
    //                         assert.lengthOf(res.body, 1);
    //                         (res.body).forEach(element => {
    //                             assert.property(element, 'issue_title');
    //                             assert.property(element, 'issue_title');
    //                             assert.property(element, 'created_by')
    //                         });
    //                         done();
    //                     })
    //             })
    //     });
    // })


    suite('PUT /api/issues/{project} => text', function () {

        // Update one field on an issue: PUT request to /api/issues/{project}

        // test('One Field to Update', function (done) {

        //     let testData = {
        //         issue_title: "Get Issue Test Without Filter",
        //         issue_text: "Some Text",
        //         created_by: "Get Issue Tester"
        //     }
        //     chai.request(server)
        //         .post('/api/issues/test')
        //         .send(testData)
        //         .end(function (err, res) {
        //             chai.request(server)
        //                 .put('/api/issues/test')
        //                 .send({
        //                     _id: res.body._id,
        //                     issue_text: 'TEST TEST TEST'
        //                 })
        //                 .end(function (err, response) {
        //                     assert.equal(response.status, 200);
        //                     assert.deepEqual(response.body, {
        //                         "result": "successfully updated",
        //                         "_id": res.body._id
        //                     })
        //                     done();
        //                 })
        //         })
        // });

        // // Update multiple fields on an issue: PUT request to /api/issues/{project}

        // test('Multiple Field to Update', function (done) {

        //     let testData = {
        //         issue_title: "Get Issue Test Without Filter",
        //         issue_text: "Some Text",
        //         created_by: "Get Issue Tester"
        //     }
        //     chai.request(server)
        //         .post('/api/issues/test')
        //         .send(testData)
        //         .end(function (err, res) {
        //             chai.request(server)
        //                 .put('/api/issues/test')
        //                 .send({
        //                     _id: res.body._id,
        //                     issue_text: 'MULTIPLE FIELD TEST 1',
        //                     issue_title: "MULTIPLE FIELD TEST 2"
        //                 })
        //                 .end(function (err, response) {
        //                     assert.equal(response.status, 200);
        //                     assert.deepEqual(response.body, {
        //                         "result": "successfully updated",
        //                         "_id": res.body._id
        //                     })
        //                     done();
        //                 })
        //         })
        // });

        // // Update an issue with missing _id: PUT request to /api/issues/{project}

        // test('Update Issue With Missing _id', function (done) {
        //     chai.request(server)
        //         .put('/api/issues/test')
        //         .send({
        //             _id: "",
        //             issue_text: 'MISSING ID TEST 1',
        //             issue_title: 'MISSING ID TEST 2'
        //         })
        //         .end(function (err, response) {
        //             assert.equal(response.status, 200);
        //             assert.deepEqual(response.body, { error: 'missing _id' })
        //             done();
        //         })
        // });


        // Update an issue with no fields to update: PUT request to /api/issues/{project}

        // test('Update Issue Without Any Field', function (done) {

        //     let testData = {
        //         issue_title: "Get Issue Test Without Filter",
        //         issue_text: "Some Text",
        //         created_by: "Get Issue Tester"
        //     }
        //     chai.request(server)
        //         .post('/api/issues/test')
        //         .send(testData)
        //         .end(function (err, res) {
        //             chai.request(server)
        //                 .put('/api/issues/test')
        //                 .send({
        //                     '_id': res.body._id
        //                 })
        //                 .end(function (err, response) {
        //                     assert.equal(response.status, 200);
        //                     assert.deepEqual(response.body, {
        //                         error: 'no update field(s) sent',
        //                         '_id': res.body._id
        //                     })
        //                     done();
        //                 })
        //         })
        // });

        // // Update an issue with an invalid _id: PUT request to /api/issues/{project}

        // test('No body', function (done) {
        //     chai.request(server)
        //         .put('/api/issues/test')
        //         .send({
        //             _id: _id
        //         })
        //         .end(function (err, res) {
        //             assert.equal(res.status, 200);
        //             assert.equal(res.text, "no updated field sent");
        //             done();
        //         });
        // });









    });




});















// Delete an issue: DELETE request to /api/issues/{project}
// Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
// Delete an issue with missing _id: DELETE request to /api/issues/{project}