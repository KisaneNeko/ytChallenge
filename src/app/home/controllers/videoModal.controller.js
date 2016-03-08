/**
 * Created by nowacki on 07.03.2016.
 */
export class VideoModalController {
    constructor($uibModalInstance, $log, videoUrl) {
    'ngInject';
      this.$uibModalInstance = $uibModalInstance;
      this.videoUrl = videoUrl;
    }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}
