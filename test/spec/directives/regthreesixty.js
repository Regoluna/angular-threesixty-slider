'use strict';

describe('Directive: regThreesixty', function () {

  // load the directive's module
  beforeEach(module('reg.threesixty'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should define the directive', inject(function ($compile) {
    element = angular.element('<reg-threesixty></reg-threesixty>');
    element = $compile(element)(scope);
    expect(element).toBeDefined();
  }));
});
