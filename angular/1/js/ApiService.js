/**
 * 定义ApiService服务
 * 功能：专门向服务器发送post 和 get请求
 * */
angular.module("klwkData")
    .factory('ApiService', ["$window", "$http", "WAP_CONFIG", "$q", "$log", "httpCacheService",
        function ($window, $http, WAP_CONFIG, $q, $log, httpCacheService) {

            var _api = WAP_CONFIG;
            var endpoint = _api.host + ':' + _api.port + _api.path;
            // var endpoint = WAP_CONFIG.path;

            var param = function(obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i,values;
                for(name in obj){
                    value = obj[name];
                    if(value instanceof Array) {
                        query += name + '=' + JSON.stringify(value) + '&';
                    } else if(value instanceof Object) {
                        for(subName in value) {
                            subValue = value[subName];
                            if(subValue != null){
                                fullSubName = name + '.' + subName;
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        }
                    } else if(value !== undefined ) {
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                    }
                }
                return query.length ? query.substr(0, query.length - 1) : query;
            };

            // public api
            return {
                //发送服务器的域名+端口，例如http://deve.sqhzg.cn:80
                endpoint: endpoint,

                /**
                 * 隐藏所有layer蒙层
                 */
                hideAllLayer: function () {
                    layer.closeAll('loading');
                },


                //post请求，第一个参数是URL，第二个参数是向服务器发送的参数（JSON对象），
                post: function (url, data) {
                    url = endpoint + url;
                    var deferred = $q.defer();
                    var tempPromise;

                    //判断用户是否传递了参数，如果有参数需要传递参数
                    if (data != null && data != undefined && data != "") {
                        tempPromise = $http.post(url, param(data) ,{
                            headers:{
                                "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8",
                            }
                        });
                    } else {
                        tempPromise = $http.post(url);
                    }
                    tempPromise.success(function (data, header, config, status) {
                        deferred.resolve(data);
                    }).error(function (msg, code) {
                        deferred.reject(msg);
                        $log.error(msg, code);
                    });
                    return deferred.promise;
                },

                // postLoad 请求，第一个参数是URL，第二个参数是向服务器发送的参数（JSON对象），
                postLoad: function (url, data) {
                    var index = layer.load(2, {time: 10 * 1000});
                    url = endpoint + url;
                    var deferred = $q.defer();
                    var tempPromise;

                    //判断用户是否传递了参数，如果有参数需要传递参数
                    if (data != null && data != undefined && data != "") {
                        tempPromise = $http.post(url, param(data) ,{
                            headers:{
                                "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8",
                                
                            }
                        });
                    } else {
                        tempPromise = $http.post(url);
                    }
                    tempPromise.success(function (data, header, config, status) {
                        deferred.resolve(data);
                        setTimeout(function () {
                            layer.close(index);
                        }, 300);
                    }).error(function (msg, code) {
                        deferred.reject(msg);
                        $log.error(msg, code);
                        setTimeout(function () {
                            layer.close(index);
                        }, 300);
                    });
                    return deferred.promise;

                },

                //get请求，第一个参数是URL，第二个参数是向服务器发送的参数（JSON对象），
                get: function (url, data) {
                    url = endpoint + url;
                    var deferred = $q.defer();
                    var tempPromise;
                    //显示加载进度
                    //判断用户是否传递了参数，如果有参数需要传递参数
                    if (data != null && data != undefined && data != "") {
                        tempPromise = $http.get(url, param(data) ,{
                            headers:{
                                "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8",
                            }
                        });
                    } else {
                        tempPromise = $http.get(url);
                    }
                    tempPromise.success(function (data, header, config, status) {
                        deferred.resolve(data);
                    }).error(function (msg, code) {
                        deferred.reject(msg);
                        $log.error(msg, code);
                    });
                    return deferred.promise;
                },

                // getLoad 请求，第一个参数是URL，第二个参数是向服务器发送的参数（JSON对象），
                getLoad: function (url, data) {
                    var index = layer.load(2, {time: 50 * 1000});

                    url = endpoint + url;
                    var deferred = $q.defer();
                    var tempPromise;
                    //显示加载进度
                    //判断用户是否传递了参数，如果有参数需要传递参数
                    if (data != null && data != undefined && data != "") {
                        tempPromise = $http.get(url, param(data) ,{
                            headers:{
                                "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8",
                            }
                        });
                    } else {
                        tempPromise = $http.get(url);
                    }
                    tempPromise.success(function (data, header, config, status) {
                        deferred.resolve(data);
                        setTimeout(function () {
                            layer.close(index);
                        }, 300);
                    }).error(function (msg, code) {
                        deferred.reject(msg);
                        $log.error(msg, code);
                        setTimeout(function () {
                            layer.close(index);
                        }, 300);
                    });
                    return deferred.promise;
                },

                /**
                 * 监听多个条件，—— 条件成功，需要执行deffer.resolve() 方法，如果失败，则执行 deffer.reject()方法
                 * @returns Promise
                 * function logicFunc(deffer){
                    // 成功调用resolve 的方法
                    if(true){
                        deffer.resolve('func1 is OK');
                    }
                    // 失败调用 reject方法
                    else{
                        deffer.reject('func1 IS BAD')
                    }
                }
                 */
                listenAll: function () {
                    function aaa(myfunc) {
                        var deffer = $q.defer();
                        myfunc(deffer);
                        return deffer.promise;
                    }

                    var length = arguments.length;
                    var results = {};
                    for (var i = 0; i < length; i++) {
                        results["promise" + i] = aaa(arguments[i]);
                    }

                    var p = $q.all(results);
                    return p;
                },


                /**
                 * 使用get请求并且缓存数据
                 * @param url
                 * @param data
                 * @returns {deferred.promise|{then, catch, finally}}
                 */
                getCache: function (url, data) {
                    var targetUrl = endpoint + url;
                    var deferred = $q.defer();
                    var tempPromise;

                    if (httpCacheService[url]) {
                        deferred.resolve(httpCacheService[url]);
                    } else {
                        //判断用户是否传递了参数，如果有参数需要传递参数
                        if (data != null && data != undefined && data != "") {
                            tempPromise = $http.get(targetUrl, data);
                        } else {
                            tempPromise = $http.get(targetUrl);
                        }
                        tempPromise.success(function (data, header, config, status) {
                            deferred.resolve(data);
                            httpCacheService[url] = response;
                        }).error(function (msg, code) {
                            deferred.reject(msg);
                            $log.error(msg, code);
                        });
                    }

                    return deferred.promise;
                },

                /**
                 * 使用post请求并且缓存数据
                 * @param url
                 * @param data
                 * @returns {deferred.promise|{then, catch, finally}}
                 */
                postCache: function (url, data) {
                    var targetUrl = endpoint + url;
                    var deferred = $q.defer();
                    var tempPromise;

                    if (httpCacheService[url]) {
                        deferred.resolve(httpCacheService[url]);
                    } else {
                        //判断用户是否传递了参数，如果有参数需要传递参数
                        if (data != null && data != undefined && data != "") {
                            tempPromise = $http.post(targetUrl, data);
                        } else {
                            tempPromise = $http.post(targetUrl);
                        }
                        tempPromise.success(function (data, header, config, status) {
                            deferred.resolve(data);
                            httpCacheService[url] = data;
                        }).error(function (msg, code) {
                            deferred.reject(msg);
                            $log.error(msg, code);
                        });
                    }

                    return deferred.promise;
                }


            };

        }]);