/**
 * Created by nowacki on 18.02.2016.
 */
export class VideoPanelService {
  constructor ($http) {
    'ngInject'

    let getYoutubeVideos = (video_id) => {
      return $http({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/videos',
        params: {
          id: video_id,
          key: "AIzaSyD2ZZ6QC7Ly8JR-YoUHIixj_7xpf7Lo5nQ",
          part: "snippet,contentDetails,statistics,status"
        }
      }).then(handleSuccess, handleErr);
    };

    let handleSuccess = (response) => {
      console.log('aaaa');
      // test dostepu do potrzebnych informacji o filmiku
      //let video = response.data.items[0];
      //console.log(video);
      //console.log(video.snippet.title);
      //console.log(video.snippet.thumbnails.medium.url);
      //console.log(video.statistics.likeCount);
      //console.log(video.statistics.viewCount);
      return response;
    };

    let handleErr = () => {
      console.log('HTTP request failed');
    };

    return {
      getYoutubeVideos
    };
  }
}
