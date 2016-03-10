/**
 * Created by nowacki on 18.02.2016.
 */
export function VideoPanelDirective($sce, $log, videoService) {
  'ngInject';

  ////////////////////////////
  /////   PUBLIC
  ////////////////////////////

  function manageFavorite () {
    videoService.manageFavorite(this.index);
    this.vid.favorite = !this.vid.favorite;
  }

  ////////////////////////////
  /////   PRIVATE
  ////////////////////////////

  function _videoPanelController(){
    this.manageFavorite = manageFavorite.bind(this);
    const _getUrls = _getSafeUrls.bind(this);

    ( {shorthandUrl: this.shorthandUrl, fullUrl: this.fullUrl} = _getUrls(this.vid.url));
  }

  function _getSafeUrls (video_id) {
    let {shorthandUrl, fullUrl} = this.getVideoFullUrl({video_id: video_id});

    shorthandUrl = $sce.trustAsResourceUrl(shorthandUrl);
    fullUrl = $sce.trustAsResourceUrl(fullUrl);

    return {shorthandUrl, fullUrl};
  }

  return {
    restrict: 'E',
    scope: {
      title : '@',
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
    controller: _videoPanelController
  };
}
