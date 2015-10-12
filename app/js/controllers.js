

angular.module('fillDropDownsController', [])
    
    // inject the Todo service factory into our controller
    .controller('MainController', function($scope, $http, FillDropDowns) {

        $scope.selectedMake = [];
        $scope.selectedModel = [];
        $scope.item = [];
        $scope.models = [];
        $scope.years = [];

        $scope.changeModels = function(item) {
            $scope.selectedMake.push(item);
            console.log($scope.selectedMake);
            for(var i=0; i<=$scope.makes.length-1; i++){
                if($scope.makes[i].name == $scope.selectedMake[$scope.selectedMake.length - 1]){
                    $scope.models = $scope.makes[i].models;
                }
                console.log($scope.models.length);
            }
        }

        $scope.changeYears = function(item) {
            $scope.selectedModel.push(item);
            for(var i=0; i<=$scope.models.length-1; i++){
                if($scope.models[i].name == $scope.selectedModel[$scope.selectedModel.length - 1].trim()){
                    $scope.years = $scope.models[i].years;
                }   
            }
        }

        $scope.search = function(make,model,year,zipcode) {
            console.log(make,model,year,zipcode);
            FillDropDowns.getData('/data/data-listings.json').
                then(function(data) {
                    $scope.PartnerResultsBO = data.PartnerResultsBO;
                    $scope.listings = data.PartnerResultsBO.listings;
                    console.log($scope);
                }, function(error) {
                    console.log('Something goes wrong :(');
            });
        }

        FillDropDowns.getData('/data/data.json').
            then(function(data) {
                $scope.makes = data.makes;
            }, function(error) {
                console.log('There is something wrong with the service. Couldnt fetch the data');
        });
        
    });
