"use strict";
var P;
var R;
var N;
var totalInterestVal;
var initialLoad = true;
var totalAmountVal;
var chart;
var app = angular.module('emiCalculator',[]);
app.controller('emiCalculatorController',function($scope){
	$scope.calculateEmi = function(){

        // $scope.loanAmount = 100000;
        // $scope.loanPeriod = 10;
        // $scope.interestRate = 8.5;

		 P = $scope.loanAmount;
		 R = $scope.interestRate;
		 N = $scope.loanPeriod;

		if (P >= 1000 && R >= 1) {
			let n = N * 12;
			let i = R / (100 * 12);
		
			var monthlyEMIval = Math.round(
			  P * i * (Math.pow(1 + i, n) / (Math.pow(1 + i, n) - 1))
			);
		    totalInterestVal = monthlyEMIval * N * 12 - P;
			totalAmountVal = monthlyEMIval * N * 12;

        }
        $scope.EMI = totalInterestVal;

        $scope.monthlyEMI = monthlyEMIval;

        $scope.totalAmountVal = totalAmountVal;

        if(!initialLoad){
            chart.destroy();
        }

        drawChart(P, totalInterestVal);
        initialLoad = false;
    }	
});

function drawChart(P, totalInterestVal){
    var ctx = document.getElementById("chart").getContext("2d");

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
        labels: ["Principal Amount", "Interest Amount"],
        datasets: [
            {
            backgroundColor: ["#7f4aa7", "#d68f43"],
            data: [P, totalInterestVal],
            },
        ],
        },
        options: {
        segmentShowStroke: false,
        responsive: true,
        },
    });
}