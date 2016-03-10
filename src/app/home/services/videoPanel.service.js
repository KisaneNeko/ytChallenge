/**
 * Created by nowacki on 18.02.2016.
 */

export class VideoPanelService {
  constructor ($http, $log, $localStorage, $uibModal) {
    'ngInject'

    this.$http = $http;
    this.$log = $log;
    this.$localStorage = $localStorage;
    this.$uibModal = $uibModal;
  }

  ////////////////////////////
  /////   PUBLIC
  ////////////////////////////

  getVideoLayoutOptions () {
    return {
      videos_on_page: 3,
      options: [
        { label: '3', value: 3 },
        { label: '6', value: 6 },
        { label: '9', value: 9 },
        { label: '15', value: 15 },
        { label: '50', value: 50 },
        { label: '100', value: 100 }
      ]
    }
  }

  getVideosSortOptions () {
    return {
      sort_desc: true,
      options : [
        { label: 'Od najnowszych', value: true },
        { label: 'Od najstarszych', value: false }
      ]
    }
  }

  getYoutubeVideos(vids_basic_info) {
    let video_ids = vids_basic_info.map((vid) => {
      return vid.url;
    }).join(",");

    return this._sendRequestForVideos(video_ids).then((resp) => {
      let videos_info = resp.data.items;
      if(videos_info.length !== 0) {
        return this._prepareVideoData(vids_basic_info, resp.data.items)
      }
    });
  }

  storeVideos(video_data) {
    if(!this.$localStorage.videos) {
      this.$localStorage.videos = [];
    }

    this.$localStorage.videos.push(video_data);
  }

  getVideosFromStorage() {
    return this.$localStorage.videos;
  }

  clearStoredVideos() {
    this.$localStorage.videos = [];
  }

  openVideoModal (url) {
    this.$uibModal.open({
      templateUrl: 'app/home/templates/videoModal.tpl.html',
      controller: 'VideoModalController',
      controllerAs: 'vidModCtrl',
      size: 'lg',
      resolve: {
        videoUrl: () => {
          return url;
        }
      }
    });
  }

  deleteVideo (video_id) {
    let stored_videos = this.$localStorage.videos;
    let index = _.findIndex(stored_videos, {url : video_id});

    stored_videos.splice(index, 1);
  }

  manageFavorite(index) {
    let stored = this.$localStorage.videos[index];
    stored.favorite = !stored.favorite;
  }



////////////////////////////
/////   PRIVATE
////////////////////////////

  /**
   * @TODO: Jak wysylam request po X filmow w danej kolejnosci to jak upewnic się czy sie nie pomieszaja, jak jeden
   * id bedzie nieprawidlowy
   *
   * @param basics
   * @param details
   */
  _prepareVideoData(basics, details) {
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
        favorite: !!vid.favorite
      }
    })
  }

  _sendRequestForVideos(video_id) {
    return this.$http({
      method: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/videos',
      params: {
        id: video_id,
        key: "AIzaSyD2ZZ6QC7Ly8JR-YoUHIixj_7xpf7Lo5nQ",
        part: "snippet,contentDetails,statistics,status"
      }
    }).then(this._handleSuccess, this._handleErr)
  }

  _handleErr(response) {
    this.$log.error('HTTP request failed with status:' + response.status);
    return { status: 'fail' }
  }

  _handleSuccess(response){
    return {
      status: 'success',
      data: response.data
    }
  }
}
