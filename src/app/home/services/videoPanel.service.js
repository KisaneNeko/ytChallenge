/**
 * Created by nowacki on 18.02.2016.
 */
export class VideoPanelService {
  constructor ($http, $log) {
    'ngInject'

    this.$http = $http;
    this.$log = $log;
  }

  /**
   * @TODO: Jak wysylam request po X filmow w danej kolejnosci to jak upewnic się czy sie nie pomieszaja, jak jeden
   * id bedzie nieprawidlowy
   *
   * @param basics
   * @param details
   */
  prepareVideoData(basics, details) {
  return basics.map((vid, i) => {
    let snippet = details[i].snippet;
    let stats = details[i].statistics;

    return {
      id: vid.id,
      date_created: vid.date_created,
      url: vid.url,
      title: snippet.title,
      thumbnailUrl: snippet.thumbnails.medium.url,
      likeCount: stats.likeCount,
      viewCount: stats.viewCount,
      favorite: false
      }
    })
  }

  sendRequestForVideos(video_id) {
    return this.$http({
      method: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/videos',
      params: {
        id: video_id,
        key: "AIzaSyD2ZZ6QC7Ly8JR-YoUHIixj_7xpf7Lo5nQ",
        part: "snippet,contentDetails,statistics,status"
      }
    }).then(this.handleSuccess, this.handleErr)
  }

  getYoutubeVideos(vids_basic_info) {
    let video_ids = vids_basic_info.map((vid) => {
      return vid.url;
    }).join(",");

    return this.sendRequestForVideos(video_ids).then((resp) => {
      let videos_info = resp.data.items;
      if(videos_info.length !== 0) {
        return this.prepareVideoData(vids_basic_info, resp.data.items)
      }
    });
  }

  handleErr(response) {
    this.$log.error('HTTP request failed with status:' + response.status);
    return { status: 'fail' }
  }

  static handleSuccess(response){
    return {
      status: 'success',
      data: response.data
    }
  }
}
