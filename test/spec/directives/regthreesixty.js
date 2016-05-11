'use strict';

describe('Directive: regThreesixty', function () {

  // load the directive's module
  beforeEach(module('threesixtyDemo'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<reg-threesixty></reg-threesixty>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the regThreesixty directive');
  }));
});
