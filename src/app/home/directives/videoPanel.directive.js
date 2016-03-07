/**
 * Created by nowacki on 18.02.2016.
 */
export function VideoPanelDirective($sce, $log, videoService) {
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      title : '@',
      is_preview: '@',
      index: '@',
      vid: '=',
      isPreview: '=',
      openVideoModal: '&',
      getVideoFullUrl: '&',
      deleteVideo: '&'
    },
    templateUrl: 'app/home/templates/videoPanel.tpl.html',
    bindToController: true,
    controllerAs: 'vidPanelCtrl',
    controller: function() {
      this.manageFavorite = () => {
        videoService.manageFavorite(this.index);
        this.vid.favorite = !this.vid.favorite;
      };

      let video_id = this.vid.url;
      let {shorthandUrl, fullUrl} = this.getVideoFullUrl({video_id: video_id});

      this.shorthandUrl = $sce.trustAsResourceUrl(shorthandUrl);
      this.fullUrl = $sce.trustAsResourceUrl(fullUrl);
    }
  };
}
