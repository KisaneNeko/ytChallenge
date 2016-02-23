export class MainController {
  constructor ($timeout, webDevTec, toastr, $sce, videoService) {
    'ngInject';
    const self = this;
    const ytPrefix = 'https://www.youtube.com/v/';
    this.tmp_video = {};
    this.showPreview = false;

    this.videos = [
      {id : 1, url:'Pecj5GGjQi8', date_created: '2016-02-18 09:28'},
      {id : 2, url:'VAerYplzZUE', date_created: '2016-02-17 10:28'},
      {id : 3, url:'oQBiPwklN_Q', date_created: '2016-02-17 07:28'}
    ];

    this.video_details = [];

    this.getTrustedUrl = (index) => {
      return $sce.trustAsResourceUrl(ytPrefix + this.videos[index].url)
    };


    this.getVideoInfo = (vids = self.videos) => {
      videoService.getYoutubeVideos(vids).then((videos_data) => {
        this.video_details = videos_data;
      });
    };

    this.getPreview = () => {

      this.showPreview = false;
      if(!this.tmp_video.url){
        return;
      }

      /**
       * @todo: dodac obsluge, aby nie trzeba bylo opakowywac obiektu tmp_video w tablice
       */
      videoService.getYoutubeVideos([ this.tmp_video ]).then((videos_data) => {
        this.showPreview = true;
        this.tmp_video = videos_data;
      });
    };


    this.addTmpVideo = () => {
      console.log(this.tmp_video[0]);

        this.tmp_video.date_created = Date.now();
        this.video_details.push(this.tmp_video[0]);
    };

    this.getVideoInfo();
  }
}
