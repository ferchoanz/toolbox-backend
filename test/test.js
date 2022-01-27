let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp); 
const url= 'http://localhost:8000';

/**
 * Before run the test, run npm start to activate the server for the queries.
 */

describe('toolbox-backend', () => {

    describe('files/data', () => {
        it('should complete files/data', () => {
            console.time('files/data');
            chai.request(url)
			.get('/files/data')
			.end( function(err,res){
				console.timeEnd('files/data');
				expect(res).to.have.status(200);
			});
        });
    });

    describe('files/list', () => {
        it('should complete files/list', () => {
            console.time('/files/list');
            chai.request(url)
			.get('/files/list')
			.end( function(err,res){
				console.timeEnd('/files/list');
				expect(res).to.have.status(200);
			});
        });
    });

});