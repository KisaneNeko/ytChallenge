/**
 * Created by nowacki on 18.02.2016.
 */
export function VideoPanelDirective($sce, $log) {
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      title : '@',
      is_preview: '@',
      vid: '=',
      isPreview: '=',
      getVideoFullUrl: '&'
    },
    templateUrl: 'app/home/templates/videoPanel.tpl.html',
    bindToController: true,
    controllerAs: 'ytVid',
    controller: () => {},
    link: function(scope) {
      let video_id = scope.ytVid.vid.url;
      let {shorthandUrl, fullUrl} = scope.ytVid.getVideoFullUrl({video_id: video_id});

      scope.ytVid.shorthandUrl = $sce.trustAsResourceUrl(shorthandUrl);
      scope.ytVid.fullUrl = $sce.trustAsResourceUrl(fullUrl);
    }
  };
}
