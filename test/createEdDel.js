let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let expect = require('chai').expect

chai.should();

chai.use(chaiHttp);

describe('objects testing', (done) => {

    describe('Create object', (done) => {
        it('It should create object', (done) => {
            const obj = {
                obj: {
                    "name": "testObject",
                    "key": "test",
                    "value": "test",
                    "tags": ["test1", "test2"]
                }
            }
            chai.request(server)                
            .post("/objects/createObject")
            .send(obj)
            .end((err, response) => {
                expect(response.body).to.have.property("obj").eq(obj.obj);
                done();
            })
        })
    })

    describe('Edit object', (done) => {
        it("It should edit object", (done) => {
            const editedObj = {
                obj: {
                    "name": "editedObject",
                    "key": "editedTest",
                    "value": "editedTest",
                    "tags": ["test1", "test2"]
                }
            }
            chai.request(server)
            .post("/objects/editObject/:objectId")
            .send(editedObj)
            .end((err, response) => {
                expect(response.body).to.have.property('obj').eq(editedObj.obj)
                done()
            })
        })
    })
})









