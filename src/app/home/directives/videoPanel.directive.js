/**
 * Created by nowacki on 18.02.2016.
 */
export function VideoPanelDirective($sce) {
  'ngInject';

  return {
    restrict: 'E',
    scope: {
      title : '@',
      vidUrl: '@',
      vid: '='
    },
    templateUrl: 'app/home/templates/videoPanel.tpl.html',
    bindToController: true,
    controllerAs: 'ytVid',
    controller: () => {},
    link: (scope) => {
      let videoUrl = scope.ytVid.vidUrl;
      scope.ytVid.videoUrl = $sce.trustAsResourceUrl(videoUrl);
    }
  };
}
