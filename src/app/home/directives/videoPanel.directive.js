/**
 * Created by nowacki on 18.02.2016.
 */
angular.module('ytChallenge')
  .directive('videoPanel', () => {
      return {
        restrict: 'E',
        transclude: true,
        templateUrl: './src/home/',
        require: '^tabset',
        scope: {
          heading: '@'
        },
        link: function(scope, elem, attr, tabsetCtrl) {
          scope.active = false;
          tabsetCtrl.addTab(scope);

        }
      }
  });
