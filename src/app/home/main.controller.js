export class MainController {
  constructor ($timeout, webDevTec, toastr, $sce, videoService) {
    'ngInject';
    const self = this;
    const ytPrefix = 'https://www.youtube.com/v/';

    this.videos = [
      {id : 1, url:'Pecj5GGjQi8', title: '', date_created: '2016-02-18 09:28'},
      {id : 2, url:'VAerYplzZUE', title: '',date_created: '2016-02-17 10:28'},
      {id : 3, url:'oQBiPwklN_Q', title: '',date_created: '2016-02-17 07:28'}
    ];
    this.video_details = [];

    this.getTrustedUrl = (index) => {
      return $sce.trustAsResourceUrl(ytPrefix + this.videos[index].url)
    };

    // test pobrania wideo
    (function () {

      videoService.getYoutubeVideos('Pecj5GGjQi8').then(function(videoData) {
        var data = videoData.data.items[0];
        self.videos[0].title = data.snippet.title;
      });

    }());
  }
}
