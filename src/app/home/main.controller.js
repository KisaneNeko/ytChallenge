export class MainController {
  constructor ($timeout, webDevTec, toastr, $sce, videoService, $log, $scope) {
    'ngInject';
    this._videoService = videoService;
    this._$log = $log;
    this.$scope = $scope;
    this.tmp_video = {};
    this.video_details = [];
    this.show_preview = false;
    this.is_favorite_filter = false;
    this.page_layout_options = this._videoService.getVideoLayoutOptions();
    this.sort_videos = this._videoService.getVideosSortOptions();
    this.videos = this._videoService.getVideosFromStorage() || [];
    this.addVideoModelOptions = {
      updateOn: 'default blur',
      debounce: {
        default: 500,
        blur: 0
      }
    };
    let videoInfoHelper = this._getVideoInfo(this.videos);

    this.video_details = videoInfoHelper ? videoInfoHelper : this.video_details;
  }

  ////////////////////////////
  /////   PRIVATE
  ////////////////////////////

  /**
   * @todo: dodac obsluge, aby nie trzeba bylo opakowywac obiektu tmp_video w tablice
   * @todo: dodać loading animation
   * @returns
   */
  getPreview(video = this.tmp_video) {
    this.show_preview = false;
    if(!video.url) return;


    return this._videoService.getYoutubeVideos([ video ]).then(
      videos_data => {
        if(videos_data) {
          this.tmp_video = videos_data[0];
          this.show_preview = true;
        }
    });
  }

  addTmpVideo(newVideo) {
    if(!newVideo.url) return;
    if(this.video_details.some(vid => newVideo.url === vid.url)) {
      this.$log.error('This video is already in the library');
      return;
    }

    newVideo.date_created = Date.now();
    newVideo.id  = this.video_details ? this.video_details.length : 0;
    this.video_details.push(newVideo);
    this._videoService.storeVideos(newVideo);
    this.clearTmpVideo();
  }

  clearTmpVideo() {
    this.show_preview = false;
    this.tmp_video = {};
  }

  /**
  * Shorthand prefix nie sprawdza się przy przekierowaniu do strony youtube.
  * @param video_id
  * @returns {string}
  */
  getVideoFullUrl(video_id) {
    const shorthandUrl = `https://www.youtube.com/v/${video_id}`;
    const fullUrl = `https://www.youtube.com/watch?v=${video_id}`;
    return { shorthandUrl, fullUrl };
  }

  clearStoredVideos() {
    this._videoService.clearStoredVideos();
    this.video_details = [];
  }

  openVideoModal(url) {
    this._videoService.openVideoModal(url);
  }

  deleteVideo(video_id) {
    // remove niepotrzebnie będzie kontynuować przeszukiwanie po usunięciu elementu
    let index = _.findIndex(this.video_details, {url: video_id});
    if(index === -1){
      this._$log.error('Wystąpił błąd: nie znaleziono filmiku w zbiorze');
      return;
    }

    this._videoService.deleteVideo(video_id);
    this.video_details.splice(index, 1);
  }

  manageFavorite(index) {
    this._videoService.manageFavorite(index);
    this.video_details[index].favorite = !this.video_details[index].favorite;
  }

  logVideos() {
    this._$log.debug(this.video_details);
  }

  ////////////////////////////
  /////   PRIVATE
  ////////////////////////////

  _getVideoInfo(vids) {
    this._videoService.getYoutubeVideos(vids).then((videos_data) => {
      if(videos_data) {
        // do wywalenia jak ogarnę jak to zrobic immutable
        this.video_details = videos_data;
      }
      return videos_data ? videos_data : [];
    });
  }
}
