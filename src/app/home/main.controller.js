export class MainController {
  constructor (videoService, $log, $scope) {
    'ngInject';
    this._videoService = videoService;
    this.$log = $log;
    this.$scope = $scope;
    this.getVideoFullUrl = this._videoService.getVideoFullUrl;
    this.tmp_video = {};
    this.video_details = [];
    this.show_preview = false;
    this.is_favorite_filter = false;
    this.page_layout_options = this._videoService.getVideoLayoutOptions();
    this.sort_videos = this._videoService.getVideosSortOptions();
    this.videos = this._videoService.getVideosFromStorage() || [];
    this.videoModelOptions = this._videoService.getVideoModelOptions();
    this._getVideoInfo(this.videos);

    $scope.$watch('main.page_layout_options.videos_on_page', () => {
      this.isListView = this.page_layout_options.videos_on_page > 15;
    });
  }

  ////////////////////////////
  /////   PUBLIC
  ////////////////////////////

  /**
   * @todo: dodac obsluge, aby nie trzeba bylo opakowywac obiektu tmp_video w tablice
   * @todo: dodać loading animation
   * @returns
   */
  getPreview(video_id) {
    let vid_preview_condition = this._isVideoInvalid(video_id, this.tmp_video.url, this.video_details);
    this.tmp_video.url = this.video_id;
    this.show_preview = false;

    if(vid_preview_condition) return;
    this.tmp_video.url = video_id;
    return this._getPreviewRequest(this.tmp_video);
  }

  submitTmpVideo(newVideo) {
    if(!newVideo.url) {
      this.$log.error('This video is already in the library or the ID is incorrect');
      return;
    }

    this._addNewVideo(newVideo, this.video_details);
    this.clearTmpVideo();
  }

  clearTmpVideo() {
    this.show_preview = false;
    this.tmp_video = {};
  }

  clearStoredVideos() {
    this._videoService.clearStoredVideos();
    this.video_details = [];
  }

  openVideoModal(url) {
    this._videoService.openVideoModal(url);
  }

  deleteVideo(video_id) {
    // _.remove niepotrzebnie będzie kontynuować przeszukiwanie po usunięciu elementu
    let index = _.findIndex(this.video_details, {url: video_id});
    if(index === -1){
      this.$log.warn('Wystąpił błąd: nie znaleziono filmiku w zbiorze');
      return;
    }

    this._videoService.deleteVideo(video_id);
    this.video_details.splice(index, 1);
  }

  manageFavorite(index) {
    this._videoService.manageFavorite(index);
    this.video_details[index].favorite = !this.video_details[index].favorite;
  }

  getLayoutOption() {
    return this.page_layout_options.videos_on_page <= 15 ? 'panelPagination' : 'listPagination';
  }

  logVideos() {
    this.$log.debug(this.video_details);
  }

  ////////////////////////////
  /////   PRIVATE
  ////////////////////////////

  _getVideoInfo(vids) {
    this._videoService.getYoutubeVideos(vids)
      .then(videos_data =>  videos_data ? videos_data : [])
      .then(data => this.video_details = data);
  }

  _addNewVideo (newVideo, video_details) {
    newVideo.date_created = Date.now();
    newVideo.id  = this.video_details ? this.video_details.length : 0;

    video_details.push(newVideo);
    this._videoService.storeVideos(newVideo);
  }

  _isDuplicate( newVideoId, videoList ) {
    return videoList.some( vid => newVideoId === vid.url )
  }

  _getPreviewRequest (video) {
    this._videoService.getYoutubeVideos([ video ])
      .then( videos_data => videos_data ? videos_data[0] : null )
      .then( video => {
        if(video) this._setVideoPreview(video);
      });
  }

  _setVideoPreview (video) {
    this.tmp_video = video;
    this.show_preview = true;
  }

  _isVideoInvalid(video_id, vid_initial_url, video_details) {
    return !video_id || video_id === vid_initial_url || this._isDuplicate(video_id, video_details);
  }
}
