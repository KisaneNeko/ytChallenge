/**
 * Created by nowacki on 21.03.2016.
 */
export class VideoPanelController{
    constructor($sce, videoService) {
    'ngInject';
      this.$sce = $sce;
      this.videoService = videoService;
      this.manageFavorite = this.manageFavorite.bind(this);
      const _getUrls = this._getSafeUrls.bind(this);

      ( {shorthandUrl: this.shorthandUrl, fullUrl: this.fullUrl} = _getUrls(this.vid.url));
    }

  manageFavorite () {
    this.videoService.manageFavorite(this.index);
    this.vid.favorite = !this.vid.favorite;
  }

  _getSafeUrls (video_id) {
    let {shorthandUrl, fullUrl} = this.getVideoFullUrl( { video_id } );

    shorthandUrl = this.$sce.trustAsResourceUrl(shorthandUrl);
    fullUrl = this.$sce.trustAsResourceUrl(fullUrl);

    return {shorthandUrl, fullUrl};
  }
}
