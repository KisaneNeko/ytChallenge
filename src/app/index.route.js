export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
  ;

  $urlRouterProvider.otherwise('/');
}
