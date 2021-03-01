let chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require("../app");
let server = require("../app");
let expect = require('chai').expect
const { deleteOne } = require("../models/objects");

chai.should();

chai.use(chaiHttp);

describe('API testing', () => {
    // Test the register rout
    describe('Register testing', (done) => {
      it('It should Not register user', (done) => {
          const registeredUser = {
              username: "Mihran",
              email: "khachatryan200104@gmail.com",
              password: "123456"
          }
          chai.request(server)                
                .post("/users/register")
                .send(registeredUser)
                .end((err, response) => {
                    expect(response.body).to.have.property('message').eq("This email already exsist");
                    done();
                })
      })
      it('It should register user', (done) => {
         const unRegisteredUser = {
             username: "someThingElse",
             email: "someThingElse@gmail.com",
             password: "321321"
         }
         chai.request(server)  
         .post("/users/register")
         .send(unRegisteredUser)
         .end((err, response) => {
            expect(response.body).to.have.property('message').eq("User registered successfuly");
            done();
         })
      })
    })

    describe('Login testing', (done) => {
        it('It should let user login', (done) => {
            const rigthLogin = {
                email: "khachatryan200104@gmail.com",
                password: "123456"
            }
            chai.request(server)
            .post("/users/login")
            .send(rigthLogin)
            .end((err, response) => {
                expect(response.body).to.have.property('message').eq("logined successfuly");
                done();
            })
        })
        it('It should Not let user login', (done) => {
            const wrongLogin = {
                email: "asdwad@gmail.com",
                password: '48645'
            }
            chai.request(server)
            .post("/users/login")
            .end((err, response) => {
                expect(response.body).to.have.property('message').eq("User isnt defined");
                done();
            })
        })
    })

    describe("createObject", (done) => {
        const createdObject = {
            obj : {
                name : "value1",
                tags : ["tag1", "tag2"]
            }
        }
        it('It should return Createdobject', (done) => {
            
        })
    })
})