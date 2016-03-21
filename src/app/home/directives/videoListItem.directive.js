/**
 * Created by nowacki on 18.02.2016.
 */
export function VideoListItemDirective($sce, $log, videoService) {
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

  function _videoListItemController(){
    this.manageFavorite = manageFavorite.bind(this);
    //this.showPanels = this.videosPerPage <= 15;
    this.showPanels = false;
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
    restrict: 'A',
    scope: {
      title : '@',
      index: '@',
      vid: '=',
      isPreview: '=',
      videosPerPage: '=',
      openVideoModal: '&',
      getVideoFullUrl: '&',
      deleteVideo: '&'
    },
    bindToController: true,
    controllerAs: 'vidListItemCtrl',
    controller: _videoListItemController,
    templateUrl: 'app/home/templates/videoListItem.tpl.html'
  };
}
