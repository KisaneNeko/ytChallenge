/**
 * Created by nowacki on 18.02.2016.
 */
import { VideoPanelController } from '../controllers/VideoPanel.controller';

export function VideoListItemDirective() {
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      title : '@',
      index: '@',
      vid: '=',
      openVideoModal: '&',
      getVideoFullUrl: '&',
      deleteVideo: '&'
    },
    replace: true,
    bindToController: true,
    controllerAs: 'vidListItemCtrl',
    controller: VideoPanelController,
    templateUrl: 'app/home/templates/videoListItem.tpl.html'
  };
}
