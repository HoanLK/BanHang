myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        redirectTo: function(){
            return '/banhang';
        }
    })
    .when('/hanghoa', {
        templateUrl: 'Template/Default/HangHoa.html',
        controller: 'hanghoaController'
    })
    .when('/banhang', {
        templateUrl: 'Template/Default/BanHang.html',
        controller: 'banhangController'
    })
    .when('/nhaphang', {
        templateUrl: 'Template/Default/NhapHang.html',
        controller: 'nhaphangController'
    })
    .when('/baocaobanhang', {
        templateUrl: 'Template/Default/BaoCaoBanHang.html',
        controller: 'baocaoBanHangController'
    })
    .when('/baocaonhaphang', {
        templateUrl: 'Template/Default/BaoCaoNhapHang.html',
        controller: 'baocaonhaphangController'
    })

    
    //$locationProvider.html5Mode(false).hashPrefix('!');
    //$locationProvider.html5Mode(true);

});