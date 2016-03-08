/**
 * Created by nowacki on 07.03.2016.
*/
export function favoriteVideoFilter() {
    'ngInject';

    return (video_list, is_filter_active) => {

      if(!is_filter_active) return video_list;

      let filtered_videos = video_list.filter( video => video.favorite === true );
      return filtered_videos.length > 0 ? filtered_videos : video_list;
    }
}
