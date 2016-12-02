/**	 
* @author:anisha
* @date:24-11-2016
* @filename:user_controller.js
* @created 24-11-2016 4:00:50 PM
*/
(function() {
 angular.module('users', ['FBAngular','ui.bootstrap','dialogs.main','pascalprecht.translate'])
  .controller('UserController', [
   '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$scope', '$element', 'Fullscreen', '$mdToast', '$animate','$translate','dialogs',
   UserController
  ])
  .config(['dialogsProvider','$translateProvider',function(dialogsProvider,$translateProvider){
        dialogsProvider.useBackdrop('static');
        dialogsProvider.useEscClose(false);
        dialogsProvider.useCopy(false);
        dialogsProvider.setSize('sm');
        $translateProvider.translations(language,{DIALOGS_ERROR:(_("Error")),DIALOGS_ERROR_MSG:(_("Incorrect Lmax value")),DIALOGS_CLOSE:(_("Okay"))}),$translateProvider.preferredLanguage(language);
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
	.action(help_array[4])
	.hideDelay(15000)
	.highlightAction(false)
	.position($scope.getToastPosition());

	var toast1 = $mdToast.simple()
	.content(help_array[1])
	.action(help_array[4])
	.hideDelay(15000)
	.highlightAction(false)
	.position($scope.getToastPosition());

	var toast2 = $mdToast.simple()
	.content(help_array[2])
	.action(help_array[4])
	.hideDelay(15000)
	.highlightAction(false)
	.position($scope.getToastPosition());

	var toast3 = $mdToast.simple()
	.content(help_array[3])
	.action(help_array[5])
	.hideDelay(15000)
	.highlightAction(false)
	.position($scope.getToastPosition());
	$mdToast.show(toast).then(function() {
		$mdToast.show(toast1).then(function() {
			$mdToast.show(toast2).then(function() {
				$mdToast.show(toast3).then(function() {
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
  $scope.selectedIndex = 1;
  /** Initial value settings of wells drop downs */
 
  $scope.goFullscreen = function() {
		/** Full screen */
		if (Fullscreen.isEnabled())
		Fullscreen.cancel();
		else
		Fullscreen.all();
		/** Set Full screen to a specific element (bad practice) */
		/** Full screen.enable( document.getElementById('img') ) */
  };
  $scope.getSelectedIndexConjugate = function(){/**select conjugate tab*/
	  $scope.selectedIndex=1;
	  selectedIndex=1;
	  tab_label="conjugate";
	  init($scope.selectedIndex);  
  }
  $scope.getSelectedIndexKetone = function(){/**select ketone tab*/
	$scope.selectedIndex=2;
	selectedIndex=2;
    tab_label="ketone";
	init($scope.selectedIndex);
  }
  $scope.getSelectedIndexAromatic = function(){ /**select aromatic tab*/
	$scope.selectedIndex=3;
	selectedIndex=3;
    tab_label="aromatic";
	init($scope.selectedIndex);
  }
  
	$scope.toggle = function() {
		$scope.showValue = !$scope.showValue;
		$scope.isActive = !$scope.isActive;
	};
	$scope.toggle1 = function() {
		$scope.showVariables = !$scope.showVariables;
		$scope.isActive1 = !$scope.isActive1;
	};
	
	/** Click event function of find the effect of amplification efficiency*/ 
	$scope.submitAns = function() {
	calculation($scope,dialogs);
	}
		
	$scope.resetExp = function() {
		$mdToast.cancel();
		resetExp();
		init($scope.selectedIndex);
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