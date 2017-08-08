
/**
 * 定义常量WAP_CONFIG;WAP为当前子模块功能
 * */
angular.module("klwkData")
    .constant('WAP_CONFIG', {
        host: 'http://localhost',//
        port: '8088',//9000
        // 当前的模块名称
        module: 'index',
        path: '',
        version : '0.0.0.0',
        platform: 'pc' // string 'weixin or app' 平台常量，通过此参数判断系统是在微信里面使用还是在APP里面使用，以便调用不同的微信接口
    });
