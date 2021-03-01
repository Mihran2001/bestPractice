let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let expect = require('chai').expect

chai.should();

chai.use(chaiHttp);

describe('API testing', () => {
    // Test the register rout
    describe('Register testing', () => {
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

    describe('Login testing', () => {
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
            .send(wrongLogin)
            .end((err, response) => {
                expect(response.body).to.have.property('message').eq("User isnt defined");
                done();
            })
        })
    })
})