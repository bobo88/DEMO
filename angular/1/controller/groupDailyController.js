/**
 * Created by cj on 2017/6/26.
 */
angular.module('klwkData').controller("groupDailyController", ["$scope","ApiService", "$location", "WAP_CONFIG",
    function ($scope, ApiService, $location, WAP_CONFIG) {
        $scope.selectTime = new Date().toLocaleDateString();
        $scope.todayIncome = {}; //收入总览： 今日
        $scope.monthIncome = {}; //收入总览： 本月
        $scope.yearIncome = {}; //收入总览： 本年

        /*时间控件配置*/
        $scope.dateConfig = {
            showFilter: function (event) {
                $(event.target).datetimepicker({
                    format: 'yyyy-mm-dd',
                    weekStart: 1,
                    autoclose: true,
                    startView: 2,
                    minView: 2,
                    forceParse: false,
                    todayBtn: 1,
                    language: 'zh-CN',
                    locale: moment.locale('zh-cn')
                }).on('changeDate', function (event) {
                    var result = new moment(event.date).format('YYYY-MM-DD');
                    $scope.selectTime = result;

                    // 调用收入总览接口方法
                    overviewIncome($scope, $scope.selectTime);
                });
                $(event.target).closest('input').datetimepicker('show');
            }
        };

        var overviewIncome = function (scope,selectTime) {
            var url = "/demoData/overviewIncome.json";
            var paramObj = {
                "selectTime":selectTime
            };
            var promise = ApiService.getLoad(url,paramObj);
            promise.then(function (res) {
                if (res.code == 1) {
                    $scope.todayIncome = res.todayIncome;
                    $scope.monthIncome = res.monthIncome;
                    $scope.yearIncome = res.yearIncome;
                }
            });
        };

        overviewIncome($scope, $scope.selectTime);

        //-------------------------------------------最近7天收入趋势---------------------------------------
        var last7DaysChart = echarts.init(document.getElementById('last7Days'));
        var last7DaysOption = {
            title: {
                text: '最近7天收入趋势',
                top: 10,
                left: 10,
                textStyle: {
                    color: '#344559',
                    fontSize: 14,
                    fontWeight: 'normal'
                }
            },
            tooltip : {
                trigger: 'axis'
            },
            color:['#48cda6','#fd87ab','#11abff'],  //手动设置每个图例的颜色
            legend: {
                top: 10,
                right: 10,
                itemHeight: 8,
                textStyle:{
                    color: '#666',
                },
                data:['本日','上年同期','日预算']
            },
            toolbox: {
   
            },
            calculable : true,
            xAxis : [
                {  
                    splitLine:{show: false}, //去除网格线
                    type : 'category',
                    boundaryGap : false,
                    data : ['06-22','06-23','06-24','06-25','06-26','06-27','06-28']
                }
            ],
            yAxis : [
                {
                    splitLine:{
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'本日',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'上年同期',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'日预算',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        last7DaysChart.setOption(last7DaysOption);


        //-------------------------------------------今日top3---------------------------------------
        var todayTop3Chart = echarts.init(document.getElementById('todayTop3'));
        var todayTop3Option = {
            title: {
                text: '今日top3',
                top: 10,
                left: 10,
                textStyle: {
                    color: '#344559',
                    fontSize: 14,
                    fontWeight: 'normal'
                }
            },
            tooltip : { // 提示框组件
                trigger: 'axis'
            },
            grid: { // 直角坐标系网格组件
                left: '15%',
                height: '60%',
                width: '80%'
            },
            xAxis : [
                {  
                    splitLine:{
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    type : 'value'
                }
            ],
            yAxis : [
                {
                    splitLine:{show: false}, //去除网格线
                    type : 'category',
                    data : ['大连日航','北京唐拉','东莞唐拉']
                }
            ],
            series : [
                {
                    type:'bar',
                    data:[18203, 23489, 29034],
                    itemStyle:{
                        normal: {
                            color: '#87ADE3'
                        }
                    },
                    barCategoryGap: '70%' // 类目间柱形距离，默认为类目间距的20%，可设固定值。值越大，bar越细
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        todayTop3Chart.setOption(todayTop3Option);
    }
]);