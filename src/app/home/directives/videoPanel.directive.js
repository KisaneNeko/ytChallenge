/**
 * Created by nowacki on 18.02.2016.
 */
export function VideoPanelDirective() {
  'ngInject';

  return {
    restrict: 'E',
    scope: {
      title : '@',
      index : '@',
      url: '&',
      created: '@'
    },
    templateUrl: 'app/home/templates/videoPanel.tpl.html',
    bindToController: true,
    controllerAs: 'ytVid',
    controller: () => {},
    link: videoPanelLink
  };
}

let videoPanelLink = (scope, element, attributes) => {
};



