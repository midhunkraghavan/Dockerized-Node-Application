let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let constant = require("./constants.json")

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe('Contact API', () => {

    /**
     * Test the GET route
     */

    describe("GET /contact", () => {

        it("It should return unauthorized response", (done) => {
            chai.request(server)
                .get("/contact")
                .end((err, response) => {
                response.should.have.status(401);
                done();
                });
        });

        it("It should GET all the contacts", (done) => {
            chai.request(server)
                .get("/contact")
                .set({ "Authorization": `Bearer ${constant.token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.result.should.be.a('array');
                done();
                });
        });

    });


 
    /**
     * Test the GET (by id) route
     * 
     */

     describe("GET /contact/:id", () => {

        it("It should return unauthorized response", (done) => {
            const id = 1;
            chai.request(server)
                .get("/contact/"+id)
                .end((err, response) => {
                response.should.have.status(401);
                done();
                });
        });

        it("It should GET a contact by ID", (done) => {
            const id = 1;
            chai.request(server)                
                .get("/contact/" + id)
                .set({ "Authorization": `Bearer ${constant.token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.result.should.have.property('id');
                    response.body.result.should.have.property('firstName');
                    response.body.result.should.have.property('lastName');
                    response.body.result.should.have.property('email');
                    response.body.result.should.have.property('phone');
                    response.body.result.should.have.property('address');
                    response.body.result.should.have.property('city');
                    response.body.result.should.have.property('state');
                    response.body.result.should.have.property('country');
                    response.body.result.should.have.property('zipCode');
                    response.body.result.should.have.property('createdOn');
                    response.body.result.should.have.property('updatedOn')
                done();
                });
        });


        it("It should NOT GET a task by invalid ID", (done) => {
            const id = 123456789;
            chai.request(server)                
                .get("/contact/" + id)
                .set({ "Authorization": `Bearer ${constant.token}` })
                .end((err, response) => {
                    response.should.have.status(500);
                    response.body.message.should.be.eq("Invalid request data.");
                done();
                });
        });

    });
    

     /**
     * Test the POST route
     */

      describe("POST /contact", () => {

        it("It should return unauthorized response", (done) => {
            const contactDetails = {
                "firstName": "Nidhin",
                "lastName": "Raghavan",
                "email": "midhun@gmail.com",
                "phone": "8848005010",
                "address": "Address1",
                "city": "Thrissur",
                "state": "Kerala",
                "country": "India",
                "zipCode": "680581"
            }
            chai.request(server)                
            .post("/contact")
            .send(contactDetails)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            });
        });


        it("It should POST a new contact", (done) => {
            const contactDetails = {
                "firstName": "Nidhin",
                "lastName": "Raghavan",
                "email": "midhun@gmail.com",
                "phone": "8848005010",
                "address": "Address1",
                "city": "Thrissur",
                "state": "Kerala",
                "country": "India",
                "zipCode": "680581"
            }
            chai.request(server)                
                .post("/contact")
                .set({ "Authorization": `Bearer ${constant.token}` })
                .send(contactDetails)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.message.should.be.eq('Success');
                done();
                });
        });

        it("It should NOT POST a new task without the firstName", (done) => {

            const contactDetails = {
                "firstName": "",
                "lastName": "Raghavan",
                "email": "midhun@gmail.com",
                "phone": "8848005010",
                "address": "Address1",
                "city": "Thrissur",
                "state": "Kerala",
                "country": "India",
                "zipCode": "680581"
            }

            chai.request(server)                
                .post("/contact")
                .set({ "Authorization": `Bearer ${constant.token}` })
                .send(contactDetails)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });

    });



      /**
     * Test the PUT route
     */

       describe("PUT /contact", () => {

        it("It should return unauthorized response", (done) => {
            const contactDetails = {
                "id":1,
                "firstName": "Nidhin",
                "lastName": "Raghavan",
                "email": "midhun@gmail.com",
                "phone": "8848005010",
                "address": "Address1",
                "city": "Thrissur",
                "state": "Kerala",
                "country": "India",
                "zipCode": "680581"
            }
            chai.request(server)                
            .put("/contact")
            .send(contactDetails)
            .end((err, response) => {
                response.should.have.status(401);
            done();
            });
        });


        it("It should update a new contact", (done) => {
            const contactDetails = {
                "id":1,
                "firstName": "Nidhin",
                "lastName": "Raghavan",
                "email": "midhun@gmail.com",
                "phone": "8848005010",
                "address": "Address1",
                "city": "Thrissur",
                "state": "Kerala",
                "country": "India",
                "zipCode": "680581"
            }
            chai.request(server)                
                .put("/contact")
                .set({ "Authorization": `Bearer ${constant.token}` })
                .send(contactDetails)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.message.should.be.eq('Success');
                done();
                });
        });

        it("It should NOT POST a new task without Id ", (done) => {

            const contactDetails = {
                "firstName": "Nidhin",
                "lastName": "Raghavan",
                "email": "midhun@gmail.com",
                "phone": "8848005010",
                "address": "Address1",
                "city": "Thrissur",
                "state": "Kerala",
                "country": "India",
                "zipCode": "680581"
            }

            chai.request(server)                
                .put("/contact")
                .set({ "Authorization": `Bearer ${constant.token}` })
                .send(contactDetails)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });

    });

  /**
     * Test the DELETE route
     */
   describe("DELETE /contact:id", () => {

    it("It should return unauthorized response", (done) => {
        const id = 1;
        chai.request(server)
            .delete("/contact/"+id)
            .end((err, response) => {
            response.should.have.status(401);
            done();
            });
    });

    it("It should DELETE an existing contact", (done) => {
        const id = 1;
        chai.request(server)                
            .delete("/contact/" + id)
            .set({ "Authorization": `Bearer ${constant.token}` })
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });
    });

    it("It should NOT DELETE a contact that is not in the database", (done) => {
        const id = 123456789;
        chai.request(server)                
            .delete("/contact/" + id)
            .set({ "Authorization": `Bearer ${constant.token}` })
            .end((err, response) => {
                response.should.have.status(500);
            done();
            });
    });

});




});
