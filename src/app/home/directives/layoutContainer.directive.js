/**
 * Created by nowacki on 10.03.2016.
 */
export function LayoutContainerDirective() {
    'ngInject';

    return {
      restrict: 'E',
      scope: {
        videosPerPage : '='
      },
      templateUrl: 'app/home/templates/layoutContainer.tpl.html',
      transclude: true,
      replace: true,
      bindToController: true,
      controllerAs: 'containerCtrl',
      controller: function () {}
    }
}
