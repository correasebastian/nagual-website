/* import {
  expect
} from 'chai';*/
import {
  stub,
  assert
} from 'sinon';
import {
  post
} from './controller';

describe.skip('contact-us controller', () => {



  describe('Methods', () => {



    describe('POSt', () => {

      let req;
      let res;
      let resultValidation;

      beforeEach(() => {
        req = {
          getValidationResult: stub(),
          body: {
            property: 'uno'
          }
        };
        res = {
          status: stub(),
          json: stub()
        };

        res.status.returns(res);
        resultValidation = {
          isEmpty: stub(),
          array: stub(),
          useFirstErrorOnly: stub()
        };
      });


      describe('when the info is valid ', () => {
        it('should return an 201 code with an response object', () => {

          resultValidation.isEmpty.returns(true);
          req.getValidationResult.returns(Promise.resolve(resultValidation));

          return post(req, res, stub())
            .then(() => {
              //  assert.calledOnce(stgVbls.getStageVariables);
              assert.calledWith(res.status, 201);
              assert.calledWith(res.json, {
                property: 'uno'
              });
            });
        });
      });

      describe('when the info is not valid ', () => {
        it('should return an 400  code with an response error', () => {

          const erros = 'lista de errores';
          resultValidation.isEmpty.returns(false);
          resultValidation.array.returns(erros);
          resultValidation.useFirstErrorOnly.returns(resultValidation);
          req.getValidationResult.returns(Promise.resolve(resultValidation));

          return post(req, res, stub())
            .then(() => {
              //  assert.calledOnce(stgVbls.getStageVariables);
              assert.calledWith(res.status, 400);
              assert.calledWith(res.json, {
                errors: erros
              });
            });
        });
      });

    });

  });


});
