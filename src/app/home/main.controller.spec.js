//describe('controllers', () => {
//  let vm;
//
//  beforeEach(angular.mock.module('ytChallenge'));
//
//  beforeEach(inject(($controller, webDevTec, toastr) => {
//    spyOn(webDevTec, 'getTec').and.returnValue([{}, {}, {}, {}, {}]);
//    spyOn(toastr, 'info').and.callThrough();
//
//    vm = $controller('MainController');
//  }));
//
//  it('should have a timestamp creation date', () => {
//    expect(vm.creationDate).toEqual(jasmine.any(Number));
//  });
//
//  it('should define animate class after delaying timeout', inject($timeout => {
//    $timeout.flush();
//    expect(vm.classAnimation).toEqual('rubberBand');
//  }));
//
//  it('should show a Toastr info and stop animation when invoke showToastr()', inject(toastr => {
//    vm.showToastr();
//    expect(toastr.info).toHaveBeenCalled();
//    expect(vm.classAnimation).toEqual('');
//  }));
//
//  it('should define more than 5 awesome things', () => {
//    expect(angular.isArray(vm.awesomeThings)).toBeTruthy();
//    expect(vm.awesomeThings.length === 5).toBeTruthy();
//  });
//});

describe("MainController", () => {
  let vm;

  const mockData = {
    ytShorthandUrlPrefix: 'https://www.youtube.com/v/',
    ytFullUrlPrefix: 'https://www.youtube.com/watch?v=',
    mockVideoId: 'HmWm21cCAXM'
  };

  beforeEach(angular.mock.module("ytChallenge"));

  beforeEach(inject(($controller) => {
    vm = $controller('MainController');
  }));

  it('should return object containing full youtube addresses', () => {
    expect(vm.getVideoFullUrl(mockData.mockVideoId)).toBe({
      shorthandUrl: mockData.ytShorthandUrlPrefix + mockData.mockVideoId + 'aaa',
      fullUrl: mockData.ytFullUrlPrefix + mockData.mockVideoId
    })
  });
});
