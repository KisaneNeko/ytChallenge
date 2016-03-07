/**
 * Created by nowacki on 07.03.2016.
 */
export class VideoModalController {
    constructor($modalInstance, $log, videoUrl) {
    'ngInject';
      this.$modalInstance = $modalInstance;
      this.videoUrl = videoUrl;
    }

  cancel() {
    this.$modalInstance.dismiss('cancel');
  }
}
