(function(){
    angular
    .module('users',['FBAngular','ui.bootstrap','dialogs.main','pascalprecht.translate'])
    .controller('UserController', [
        '$mdSidenav', '$mdBottomSheet', '$log', '$q','$scope','$element','Fullscreen','$mdToast','$animate','$translate','dialogs',
        UserController
    ])
    .config(['dialogsProvider','$translateProvider',function(dialogsProvider,$translateProvider){
        dialogsProvider.useBackdrop('static');
        dialogsProvider.useEscClose(false);
        dialogsProvider.useCopy(false);
        dialogsProvider.setSize('sm');
        $translateProvider.translations(language,{DIALOGS_ERROR:(_("Error")),DIALOGS_ERROR_MSG:(_("Add Methylene Blue!")),DIALOGS_CLOSE:(_("Okay"))}),$translateProvider.preferredLanguage(language);
    }]);
     /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function UserController($mdSidenav, $mdBottomSheet, $log, $q, $scope, $element, Fullscreen, $mdToast, $animate, $translate, dialogs) {
        $scope.toastPosition = {
            bottom: true,
            top: false,
            left: true,
            right: false
        };
		
		$scope.toggleSidenav = function(ev) {
            $mdSidenav('right').toggle();
        };
		
        $scope.getToastPosition = function() {
            return Object.keys($scope.toastPosition)
                .filter(function(pos) {
                    return $scope.toastPosition[pos];
                })
                .join(' ');
        };
        $scope.showActionToast = function() {
            var toast = $mdToast.simple()
                .content(help_array[0])
                .action(help_array[6])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast1 = $mdToast.simple()
                .content(help_array[1])
                .action(help_array[6])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast2 = $mdToast.simple()
                .content(help_array[2])
                .action(help_array[6])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast3 = $mdToast.simple()
                .content(help_array[3])
                .action(help_array[6])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast4 = $mdToast.simple()
                .content(help_array[4])
                .action(help_array[6])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            var toast5 = $mdToast.simple()
                .content(help_array[5])
                .action(help_array[7])
                .hideDelay(15000)
                .highlightAction(false)
                .position($scope.getToastPosition());

            $mdToast.show(toast).then(function() {
                $mdToast.show(toast1).then(function() {
                    $mdToast.show(toast2).then(function() {
                        $mdToast.show(toast3).then(function() {
                            $mdToast.show(toast4).then(function() {
                                $mdToast.show(toast5).then(function() {

                                });
                            });
                        });
                    });
                });
            });
        };

        var self = this;
        self.selected = null;
        self.users = [];
        self.toggleList = toggleUsersList;
        $scope.showValue = false; /** It hides the 'Result' tab */
        $scope.showVariables = false; /** I hides the 'Variables' tab */
        $scope.isActive = true;
        $scope.isActive1 = true;
        $scope.goFullscreen = function() {
            /** Full screen */
            if (Fullscreen.isEnabled())
                Fullscreen.cancel();
            else
                Fullscreen.all();
            /** Set Full screen to a specific element (bad practice) */
            /** Full screen.enable( document.getElementById('img') ) */
        };
        $scope.toggle = function() {
            $scope.showValue = !$scope.showValue;
            $scope.isActive = !$scope.isActive;
        };
        $scope.toggle1 = function() {
            $scope.showVariables = !$scope.showVariables;
            $scope.isActive1 = !$scope.isActive1;
        };

        /** Initial disable settings of controls */
        $scope.water_vol_disable = true;
        $scope.methylene_disable = true;

        /** Change event function of select titration dropdown */
        $scope.selectTitrant = function() {
            selectTitrantFn($scope); /** Function defined in experiment.js file */
        }

        /** Change event function of speed of the drop slider */
        $scope.changeDropSpeed = function() {
            changeDropSpeedFn($scope,dialogs); /** Function defined in experiment.js file */
        }

        /** Change event function of volume slider */
        $scope.changeVolume = function() {
            changeVolumeFn($scope); /** Function defined in experiment.js file */
        }

        /** Change event function of start button */
        $scope.startExp = function() {
            startExperiment($scope, dialogs); /** Function defined in experiment.js file */
        }

        /** Change event function of Methylene Blue button */
        $scope.addMethylene = function() {
            addMethyleneFn($scope); /** Function defined in experiment.js file */
        }

        /** Change event function of reset button */
        $scope.resetExp = function() {
            $mdToast.cancel();
            resetFn($scope); /** Function defined in experiment.js file */
        }

        /**
         * First hide the bottom sheet IF visible, then
         * hide or Show the 'left' sideNav area
         */
        function toggleUsersList() {
            $mdSidenav('right').toggle();
        }
    }
})();