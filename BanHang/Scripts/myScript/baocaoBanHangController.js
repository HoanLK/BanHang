/// <reference path="D:\Code\MVC\Project\BanHang\BanHang\Template/Default/expandableRowTemplate.html" />
/// <reference path="D:\Code\MVC\Project\BanHang\BanHang\Template/Default/expandableRowTemplate.html" />
myApp.controller("baocaoBanHangController", ['$scope', '$http', '$window', 'uiGridConstants', 'sweet', function ($scope, $http, $window, uiGridConstants, sweet) {
    $scope.baocaos = {};
    $scope.khachhangs = [];
    $scope.nguoibans = [];

//Bảng hàng hóa

    //Export
    $scope.baocaos = {
        columnDefs :
        [
            {
                displayName: "STT",
                name: 'stt',
                enableCellEdit: false,
                enableSorting: false,
                enableFiltering: false,
                width: 55,
                cellTemplate: '<div class="ui-grid-cell-contents text-center">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
            },
            {
                displayName: "ID",
                name: 'id',
                enableSorting: false,
                width: 55
            },
            {
                displayName: "Thời gian",
                name: 'thoigian',
                type: "date",
                cellFilter: "date:'dd-MM-yyyy HH:mm:ss'",
                enableFiltering: false,
            },
            {
                displayName: "Nhân viên",
                name: 'User.Name'
            },
            {
                displayName: "Khách hàng",
                name: 'KhachHang.ten'
            },
            {
                displayName: "Tiền hàng",
                name: 'tongTien',
                cellFilter: 'number:0',
                cellClass: 'text-right',
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter: 'number:0',
                footerCellClass: 'text-right',
            },
            {
                displayName: "Giảm giá",
                name: 'giamgia',
                cellFilter: 'number:0',
                cellClass: 'text-right',
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter: 'number:0',
                footerCellClass: 'text-right',
            },
            {
                displayName: "Tổng tiền",
                name: 'thanhtoan',
                cellFilter: 'number:0',
                cellClass: 'text-right',
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter: 'number:0',
                footerCellClass: 'text-right',
            },

        ],
        enableRowSelection: true,
        enableGridMenu: true,
        //enableSelectAll: true,
        exporterCsvFilename: 'myFile.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Báo cáo bán hàng", style: 'headerStyle' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
            return docDefinition;
        },
        exporterPdfOrientation: 'landscape',
        exporterPdfPageSize: 'A4',
        exporterPdfMaxGridWidth: 600,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        expandableRowTemplate: 'Template/Default/expandableRowTemplate.html',
        expandableRowHeight: 200,
        expandableRowScope: {
            subGridVariable: 'subGridScopeVariable'
        }

    };


    //Footer
    $scope.baocaos.showGridFooter = true;
    $scope.baocaos.showColumnFooter = true;

    //Row height
    $scope.baocaos.rowHeight = 35;

    //Tim kiem
    $scope.baocaos.enableFiltering = true;
    //Select
    $scope.baocaos.enableRowSelection = false;
    $scope.baocaos.enableRowHeaderSelection = false;
    $scope.baocaos.multiSelect = false;

    //Grid API
    $scope.baocaos.onRegisterApi = function (gridApi) { };


    //Init
    $scope.Init = function () {
        $scope.role = angular.element('#role').val();
        if ($scope.role != "Admin") {
            $window.location.href = '/#/banhang';
        }
        //Load hóa đơn bán hàng
        $http.get('/API/HoaDonBanHangAPI/')
            .success(function (hoadonBanHangs) {
                $scope.baocaos.data = resolveReferences(hoadonBanHangs);
                angular.forEach($scope.baocaos.data, function (value, index) {
                    value.thoigian = new Date(value.thoigian);
                    //alert(value.ChiTietBanHang.length);
                    value.subGridOptions = {
                        columnDefs: [
                            {
                                displayName: "Mã hàng",
                                name: 'HangHoa.mavach',
                                width: 100
                            },
                            {
                                displayName: "Tên hàng",
                                name: 'HangHoa.ten',
                                enableSorting: false,
                                enableCellEdit: false,
                                cellTooltip: true
                            },
                            {
                                displayName: "Số lượng",
                                name: 'soluong',
                                cellFilter: 'number:0',
                                cellClass: 'text-right',
                                enableCellEdit: true,
                                width: 100
                            },
                            {
                                displayName: "Đơn giá",
                                name: 'dongia',
                                cellFilter: 'number:0',
                                cellClass: 'text-right',
                                enableCellEdit: true,
                                width: 100
                            },
                            {
                                displayName: "Thành tiền ",
                                name: 'thanhtien',
                                cellFilter: 'number:0',
                                cellClass: 'text-right',
                                enableCellEdit: false,
                                width: 100
                            }],
                        data: value.ChiTietBanHang
                    }
                });
            });
    };

    $scope.Init();

    //Lọc
    $scope.Loc = function () {
        $scope.baocaos.data = [];
        if($scope.tuNgay != null){
            $scope.tuNgay = new Date($scope.tuNgay);
        }
        if ($scope.denNgay != null) {
            $scope.denNgay = new Date($scope.denNgay);
        }
        //Load hóa đơn bán hàng
        $http.get('/API/HoaDonBanHangAPI/')
            .success(function (hoadonBanHangs) {
                var data = resolveReferences(hoadonBanHangs);
                angular.forEach(data, function (value, index) {
                    value.thoigian = new Date(value.thoigian);
                    value.subGridOptions = {
                        columnDefs: [
                            {
                                displayName: "Mã hàng",
                                name: 'HangHoa.mavach',
                                width: 100
                            },
                            {
                                displayName: "Tên hàng",
                                name: 'HangHoa.ten',
                                enableSorting: false,
                                enableCellEdit: false,
                                cellTooltip: true
                            },
                            {
                                displayName: "Số lượng",
                                name: 'soluong',
                                cellFilter: 'number:0',
                                cellClass: 'text-right',
                                enableCellEdit: true,
                                width: 100
                            },
                            {
                                displayName: "Đơn giá",
                                name: 'dongia',
                                cellFilter: 'number:0',
                                cellClass: 'text-right',
                                enableCellEdit: true,
                                width: 100
                            },
                            {
                                displayName: "Thành tiền ",
                                name: 'thanhtien',
                                cellFilter: 'number:0',
                                cellClass: 'text-right',
                                enableCellEdit: false,
                                width: 100
                            }],
                        data: value.ChiTietBanHang
                    }
                    if (value.thoigian <= $scope.denNgay && value.thoigian >= $scope.tuNgay) {
                        
                        $scope.baocaos.data.push(value);
                    }
                });

            });
    };

    $scope.LocTatCa = function () {
        $scope.tuNgay = null;
        $scope.denNgay = null;

        //Load hóa đơn bán hàng
        $http.get('/API/HoaDonBanHangAPI/')
            .success(function (hoadonBanHangs) {
                $scope.baocaos.data = resolveReferences(hoadonBanHangs);
                angular.forEach($scope.baocaos.data, function (value, index) {
                    value.thoigian = new Date(value.thoigian);
                    //alert(value.ChiTietBanHang.length);
                    value.subGridOptions = {
                        columnDefs: [
                            {
                                displayName: "Mã hàng",
                                name: 'HangHoa.mavach',
                                width: 100
                            },
                            {
                                displayName: "Tên hàng",
                                name: 'HangHoa.ten',
                                enableSorting: false,
                                enableCellEdit: false,
                                cellTooltip: true
                            },
                            {
                                displayName: "Số lượng",
                                name: 'soluong',
                                cellFilter: 'number:0',
                                cellClass: 'text-right',
                                enableCellEdit: true,
                                width: 100
                            },
                            {
                                displayName: "Đơn giá",
                                name: 'dongia',
                                cellFilter: 'number:0',
                                cellClass: 'text-right',
                                enableCellEdit: true,
                                width: 100
                            },
                            {
                                displayName: "Thành tiền ",
                                name: 'thanhtien',
                                cellFilter: 'number:0',
                                cellClass: 'text-right',
                                enableCellEdit: false,
                                width: 100
                            }],
                        data: value.ChiTietBanHang
                    }
                });
            });
    };


    //FUNCTION

    //Chuẩn hóa API
    function resolveReferences(json) {
        if (typeof json === 'string')
            json = JSON.parse(json);

        var byid = {}, // all objects by id
            refs = []; // references to objects that could not be resolved
        json = (function recurse(obj, prop, parent) {
            if (typeof obj !== 'object' || !obj) // a primitive value
                return obj;
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                for (var i = 0; i < obj.length; i++)
                    // check also if the array element is not a primitive value
                    if (typeof obj[i] !== 'object' || !obj[i]) // a primitive value
                        continue;
                    else if ("$ref" in obj[i])
                        obj[i] = recurse(obj[i], i, obj);
                    else
                        obj[i] = recurse(obj[i], prop, obj);
                return obj;
            }
            if ("$ref" in obj) { // a reference
                var ref = obj.$ref;
                if (ref in byid)
                    return byid[ref];
                // else we have to make it lazy:
                refs.push([parent, prop, ref]);
                return;
            } else if ("$id" in obj) {
                var id = obj.$id;
                delete obj.$id;
                if ("$values" in obj) // an array
                    obj = obj.$values.map(recurse);
                else // a plain object
                    for (var prop in obj)
                        obj[prop] = recurse(obj[prop], prop, obj);
                byid[id] = obj;
            }
            return obj;
        })(json); // run it!

        for (var i = 0; i < refs.length; i++) { // resolve previously unknown references
            var ref = refs[i];
            ref[0][ref[1]] = byid[ref[2]];
            // Notice that this throws if you put in a reference at top-level
        }
        return json;
    }


}]);