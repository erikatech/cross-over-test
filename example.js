(function() {
    'use strict';

    angular
        .module('processbyfreight')
        .controller('ProcessByFreightCtrl', ProcessByFreight);

    ProcessByFreight.$inject = ['ProcessByFreightService', 'MonthYearIntervalService', 'arrayUtilsService', 'CustomToastService', 'dateUtil'];

    function ProcessByFreight(ProcessByFreightService, MonthYearIntervalService, arrayUtilsService, CustomToastService, dateUtil) {
        var vm = this;

        vm.monthYearInterval = MonthYearIntervalService.getMonthYearIntervalModel();

        vm.chart = {
            series: ['Panalpina', 'Fedex'],
            colors: [
                { backgroundColor: "#00a5f2" },
                { backgroundColor: "#ff4155" },
            ],
            options: {
                tooltips: {
                    custom: function(tooltip) {
                        if (!tooltip) {
                            return;
                        }
                        tooltip.backgroundColor = 'rgba(72, 84, 101, 0.9)';
                        tooltip.cornerRadius = 1;
                        tooltip.bodyFontSize = 13;
                    },
                    titleFontSize: 13,
                    bodySpacing: 7,
                    xPadding: 15,
                    yPadding: 15,
                    bodyFontFamily: 'robotolight',
                    footerFontSize: 13,
                    footerFontFamily: 'robotobold',
                    callbacks : {
                        afterBody: function(tooltipItem) {
                            return "Total: " + (tooltipItem[0].yLabel + tooltipItem[1].yLabel);
                        }
                    }
                }
            },
            data: [],
            labels: []
        };

        vm.totalProcess = 0;
        vm.report = [];

        vm.onClickBtnPesquisar = function (){

            if(MonthYearIntervalService.isValidInterval(vm.monthYearInterval)) {

                vm.loadingReport = true;
                vm.chart.data = [];
                vm.chart.labels = [];
                vm.panalpinaReport = [];
                vm.fedexReport = [];
                vm.totals = [];
                vm.report = [];
                var panalpina = [];
                var fedex = [];
                var monthsInInterval = MonthYearIntervalService.getMonthsInInterval(vm.monthYearInterval);

                ProcessByFreightService.find(MonthYearIntervalService.generateDataFilter(vm.monthYearInterval))

                    .then(function(success) {

                        vm.panalpinaReport = success[0].result;
                        vm.fedexReport = success[1].result;


                        var panalpinaFedexByMonth = {};

                        // iterate thru all months
                        monthsInInterval.forEach(function (yearMonth) {

                            vm.panalpinaReport.forEach(function (value) {
                                if(value.anomes === yearMonth) {
                                    // initialize property
                                    panalpinaFedexByMonth[yearMonth] = {};

                                    // add panalpina
                                    panalpinaFedexByMonth[yearMonth].panalpina = value.panalpina;
                                }
                            });

                            vm.fedexReport.forEach(function (value) {
                                if(value.anomes === yearMonth) {
                                    // check it's not defined yet
                                    if(!panalpinaFedexByMonth.hasOwnProperty(yearMonth)) {
                                        panalpinaFedexByMonth[yearMonth] = {};
                                    }

                                    // add fedex
                                    panalpinaFedexByMonth[yearMonth].fedex = value.fedex;
                                }
                                else {

                                }
                            });

                        });

                        // treat undefined values and add labels
                        Object.keys(panalpinaFedexB yMonth).forEach(function (attrName) {

                            //
                            panalpina.push(panalpinaFedexByMonth[attrName].panalpina || 0);
                            fedex.push(panalpinaFedexByMonth[attrName].fedex || 0);

                            // format year month
                            // ex: 201703 => MAR/2017
                            vm.chart.labels.push(dateUtil.formatYearMonth(attrName));

                        });

                        // add data to the chart
                        vm.chart.data.push(panalpina);
                        vm.chart.data.push(fedex);

                        // sum some values
                        vm.totalPanalpina = arrayUtilsService.sumElements(panalpina);
                        vm.totalFedex = arrayUtilsService.sumElements(fedex);
                        vm.totalProcess = vm.totalPanalpina + vm.totalFedex;

                        vm.totalPanalpinaPeso = vm.panalpinaReport.map(val => val.peso).reduce((acc, curr) => acc + curr, 0);
                        vm.totalPanalpinaKgProcess = vm.panalpinaReport.map(val => val.kg_process).reduce((acc, curr) => acc + curr, 0);
                        vm.totalFedexPeso = vm.fedexReport.map(val => val.peso).reduce((acc, curr) => acc + curr, 0);
                        vm.totalFedexKgProcess = vm.fedexReport.map(val => val.kg_process).reduce((acc, curr) => acc + curr, 0);

                        vm.totals = [
                            {
                                name: "Panalpina",
                                anual: vm.totalPanalpina,
                                channelPercent: (vm.totalPanalpina / vm.totalProcess) * 100,
                                totalPeso: vm.totalPanalpinaPeso,
                                totalKgProcess: vm.totalPanalpinaKgProcess,
                                hex: 'rgb(91, 155, 213)'
                            },
                            {
                                name: "Fedex",
                                anual: vm.totalFedex,
                                channelPercent: (vm.totalFedex / vm.totalProcess) * 100,
                                totalPeso: vm.totalFedexPeso,
                                totalKgProcess: vm.totalFedexKgProcess,
                                hex: 'rgb(255, 93, 93)'
                            }
                        ];

                    })
                    .catch(function (e) {
                        console.error(e.message);
                        CustomToastService.show(e.message || 'Ocorreu um erro ao buscar os resultados', "top right", 3000);
                    })
                    .finally(function () {
                        vm.loadingReport = false;
                    });

            }
            else {
                CustomToastService.show("Período inválido", "top right", 1000);
            }
        };

        vm.onClickBtnPesquisar();

    }
})();