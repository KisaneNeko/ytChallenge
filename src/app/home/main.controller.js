export class MainController {
  constructor ($timeout, webDevTec, toastr, $sce, videoService, $localStorage, $log) {
    'ngInject';

    this.videoService = videoService;
    this.$log = $log;
    this.ytPrefix = 'https://www.youtube.com/v/';
    this.showPreview = false;
    //this.videos = $localStorage.$default({
    //  videos: []
    //}).videos;
    this.videos = [];
    this.tmp_video = {};
    this.video_details = [];


    this.getVideoInfo();
  }


  //this.videos = [
    //  {id : 1, url:'Pecj5GGjQi8', date_created: '2016-02-18 09:28'},
    //  {id : 2, url:'VAerYplzZUE', date_created: '2016-02-17 10:28'},
    //  {id : 3, url:'oQBiPwklN_Q', date_created: '2016-02-17 07:28'}
    //];

    getVideoInfo(vids = this.videos) {
      this.videoService.getYoutubeVideos(vids).then((videos_data) => {
        if(videos_data) {
          this.video_details = videos_data;
        }
      });
    }

    /**
     * @todo: dodac obsluge, aby nie trzeba bylo opakowywac obiektu tmp_video w tablice
     * @todo: dodać loading aniation
     * @returns
     */
    getPreview() {
      this.showPreview = false;
      if(!this.tmp_video.url){
        return;
      }

      return this.videoService.getYoutubeVideos([ this.tmp_video ]).then(
        videos_data => {
          if(videos_data) {
            this.tmp_video = videos_data[0];
            this.showPreview = true;
          }
        }
      );
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
}
