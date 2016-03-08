/**
 * Created by nowacki on 07.03.2016.
*/
export default class favoriteVideoFilter {
  constructor () {
    'ngInject'
    this.favoriteVideo = favoriteVideo;
  }

  favoriteVideo(video_list, is_filter_active) {

    if(!is_filter_active) return video_list;

    let filtered_videos = video_list.filter( video => video.favorite === true );
    return filtered_videos.length > 0 ? filtered_videos : video_list;
  }
}
