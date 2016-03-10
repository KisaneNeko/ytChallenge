/* global malarkey:false, moment:false */

import * as _ from '../../node_modules/lodash/lodash';
import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './home/main.controller';
import { VideoModalController } from './home/controllers/videoModal.controller';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';
import { VideoPanelDirective } from '../app/home/directives/videoPanel.directive';
import { VideoAddDirective } from '../app/home/directives/videoAdd.directive';
import { LayoutContainerDirective } from '../app/home/directives/layoutContainer.directive';
import { VideoPanelService } from '../app/home/services/videoPanel.service';
import { favoriteVideoFilter } from '../app/home/filters/favoriteVideo.filter';

angular.module('ytChallenge', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngMessages',
  'ngAria',
  'ui.router',
  'ui.bootstrap',
  'toastr',
  'ngStorage',
  'angularUtils.directives.dirPagination'
]).constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .filter('favoriteVideoFilter', favoriteVideoFilter )
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .service('videoService', VideoPanelService)
  .controller('MainController', MainController)
  .controller('VideoModalController', VideoModalController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective)
  .directive('videoPanel', VideoPanelDirective)
  .directive('videoAdd', VideoAddDirective)
  .directive('layoutContainer', LayoutContainerDirective);
