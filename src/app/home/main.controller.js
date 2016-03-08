export class MainController {
  constructor ($timeout, webDevTec, toastr, $sce, videoService, $log, $scope) {
    'ngInject';
    this.videoService = videoService;
    this.$log = $log;
    this.$scope = $scope;
    this.tmp_video = {};
    this.video_details = [];
    this.show_preview = false;
    this.is_favorite_filter = false;

    let videoInfoHelper;

    this.sort_videos = {
      sort_desc: true,
      values : [
        { label: 'Od najnowszych', value: true },
        { label: 'Od najstarszych', value: false }
      ]
    };


    this.videos = this.videoService.getVideosFromStorage() || [];
    videoInfoHelper = this.getVideoInfo(this.videos);
    this.video_details = videoInfoHelper ? videoInfoHelper : this.video_details;
  }

  getVideoInfo(vids) {
    this.videoService.getYoutubeVideos(vids).then((videos_data) => {
      if(videos_data) {
        // do wywalenia jak ogarnę jak to zrobic immutable
        this.video_details = videos_data;
      }
      return videos_data ? videos_data : [];
    });
  }

  /**
   * @todo: dodac obsluge, aby nie trzeba bylo opakowywac obiektu tmp_video w tablice
   * @todo: dodać loading animation
   * @returns
   */
  getPreview(video = this.tmp_video) {
    this.show_preview = false;
    if(!video.url) return;

    if(this.video_details.some(vid => video.url === vid.url)) {
      this.$log.error('This video is already in the library');
      return;
    }

    return this.videoService.getYoutubeVideos([ video ]).then(
      videos_data => {
        if(videos_data) {
          this.tmp_video = videos_data[0];
          this.show_preview = true;
        }
    });
  }

  addTmpVideo() {
      let newVideo = this.tmp_video;
      newVideo.date_created = Date.now();
      newVideo.id  = this.video_details ? this.video_details.length : 0;
      this.video_details.push(newVideo);
      this.videoService.storeVideos(newVideo);
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
    this.videoService.clearStoredVideos();
    this.video_details = [];
  }

  openVideoModal(url) {
    this.videoService.openVideoModal(url);
  }

  deleteVideo(index) {
    this.videoService.deleteVideo(index);
    this.video_details.splice(index, 1);
  }

  manageFavorite(index) {
    this.videoService.manageFavorite(index);
    this.video_details[index].favorite = !this.video_details[index].favorite;
  }

  logVideos() {
    this.$log.debug(this.video_details);
  }
}
