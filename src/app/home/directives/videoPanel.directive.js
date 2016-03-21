/**
 * Created by nowacki on 18.02.2016.
 */
import { VideoPanelController } from '../controllers/VideoPanel.controller';

export function VideoPanelDirective() {
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      title : '@',
      index: '@',
      vid: '=',
      isPreview: '=',
      openVideoModal: '&',
      getVideoFullUrl: '&',
      deleteVideo: '&'
    },
    bindToController: true,
    controllerAs: 'vidPanelCtrl',
    controller: VideoPanelController,
    templateUrl: 'app/home/templates/videoPanel.tpl.html'
  };
}
