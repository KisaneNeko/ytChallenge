export class MainController {
  constructor ($timeout, webDevTec, toastr, $sce, videoService, $localStorage, $log) {
    'ngInject';

    this.videoService = videoService;
    this.$log = $log;
    this.showPreview = false;
    this.video_details = [];
    this.tmp_video = {};

    // mock data.
    //this.videos = [
    //  {id : 1, url:'Pecj5GGjQi8', date_created: '2016-02-18 09:28'},
    //  {id : 2, url:'VAerYplzZUE', date_created: '2016-02-17 10:28'},
    //  {id : 3, url:'oQBiPwklN_Q', date_created: '2016-02-17 07:28'}
    //];
    this.videos = [];

    let videoInfoHelper = [];

    this.video_details = videoInfoHelper ? videoInfoHelper : this.video_details;
  }

  getVideoInfo(vids = this.videos) {
    this.videoService.getYoutubeVideos(vids).then((videos_data) => {
      return videos_data ? videos_data : [];
    });
  }

  /**
   * @todo: dodac obsluge, aby nie trzeba bylo opakowywac obiektu tmp_video w tablice
   * @todo: dodać loading animation
   * @returns
   */
  getPreview(video = this.tmp_video) {
    this.showPreview = false;
    if(!video.url) return;

    return this.videoService.getYoutubeVideos([ video ]).then(
      videos_data => {
        if(videos_data) {
          this.tmp_video = videos_data[0];
          this.showPreview = true;
        }
    });
  }

  addTmpVideo() {
      let newVideo = this.tmp_video;
      newVideo.date_created = Date.now();
      newVideo.id  = this.video_details ? this.video_details.length : 0;
      this.video_details.push(newVideo);
      this.clearTmpVideo();
  }

  clearTmpVideo() {
    this.showPreview = false;
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
}
