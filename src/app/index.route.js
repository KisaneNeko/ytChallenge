export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('videoAdd', {
      url: '/videoAdd',
      templateUrl: 'app/videoAdd/videoAdd.html',
      controller: 'VideoAddController',
      controllerAs: 'vAddCtrl'
    })
  ;

  $urlRouterProvider.otherwise('/');
}
