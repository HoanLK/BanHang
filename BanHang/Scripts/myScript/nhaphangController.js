myApp.controller("nhaphangController", ['$scope', '$http', '$window', 'uiGridConstants', 'sweet', function ($scope, $http, $window, uiGridConstants, sweet) {
    $scope.hanghoas = {};
    $scope.hanghoa = {};

    $scope.nhaphangs = {};
    $scope.nhaphang = {};
    $scope.chitietNhapHangs = {};

    $scope.nhaCungCaps = [];

    $scope.nhomHangs = [];
    $scope.nhomHang = {};

    $scope.donvitinhs = [];
    $scope.error = {};


//Init
    $scope.Init = function () {
        $scope.role = angular.element('#role').val();
        if ($scope.role != "Admin") {
            $window.location.href = '/#/banhang';
        }
        //Load nhà cung cấp
        $http.get('/API/NhaCungCapAPI/')
            .success(function (nhaCungCaps) {
                $scope.nhaCungCaps = resolveReferences(nhaCungCaps);
            });
        //Load nhóm hàng
        $http.get('/API/NhomHangAPI')
            .success(function (nhomHangs) {
                $scope.nhomHangs = resolveReferences(nhomHangs);
            });
        //Load hàng hóa
        $http.get('/API/HangHoaAPI/')
            .success(function (hanghoas) {
                $scope.hanghoas.data = resolveReferences(hanghoas);
            });
    };

    $scope.Init();


//Bảng hàng hóa
    //Tùy chình Column
    $scope.hanghoas.columnDefs =
    [
        {
            displayName: "Mã hàng",
            name: 'mavach',
            enableSorting: false,
            width: 100
        },
        {
            displayName: "Tên hàng",
            name: 'ten'
        }
    ];

    //Tim kiem
    $scope.hanghoas.enableFiltering = true;
    //Select
    $scope.hanghoas.enableRowSelection = true;
    $scope.hanghoas.enableRowHeaderSelection = false;
    $scope.hanghoas.multiSelect = false;
    //Grid API
    $scope.hanghoas.onRegisterApi = function (gridApi) {
        //Thêm hàng hóa vào hóa đơn nhập
        gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
            if ($scope.nhaphang.id == null) {
                sweet.show('Chưa thêm', 'Vui lòng tạo Phiếu nhập hàng', 'error');
            } else {
                var hanghoa = gridApi.selection.getSelectedRows()[0];
                //Kiểm tra hàng hóa đã có trong hóa đơn chưa
                var count = 0;
                angular.forEach($scope.chitietNhapHangs.data, function (value, index) {
                    //Nếu có rồi thì tăng số lượng thêm 1
                    if (value.idHangHoa == hanghoa.id) {
                        count++;
                        $scope.chitietNhapHangs.data[index].soluong = $scope.chitietNhapHangs.data[index].soluong + 1;
                        var thanhtien = parseInt($scope.chitietNhapHangs.data[index].soluong) * parseInt($scope.chitietNhapHangs.data[index].dongia) - parseInt($scope.chitietNhapHangs.data[index].giamgia);
                        $scope.chitietNhapHangs.data[index].thanhtien = (isNaN(thanhtien)) ? 0 : thanhtien;
                        $scope.TinhTien();
                    }
                });
                //Chưa có thì thêm vào hóa đơn
                if (count == 0) {
                    var chitietNhapHang = {};
                    chitietNhapHang.idNhapHang = $scope.nhaphang.id;
                    chitietNhapHang.idHangHoa = hanghoa.id;
                    chitietNhapHang.tenHangHoa = hanghoa.ten;
                    chitietNhapHang.donvitinh = hanghoa.donvitinh;
                    chitietNhapHang.soluong = 1;
                    chitietNhapHang.dongia = hanghoa.giaVon;
                    chitietNhapHang.giamgia = 0;
                    var thanhtien = parseInt(chitietNhapHang.soluong) * parseInt(chitietNhapHang.dongia);
                    chitietNhapHang.thanhtien = (isNaN(thanhtien)) ? 0 : thanhtien;
                    $scope.chitietNhapHangs.data.push(chitietNhapHang);
                    $scope.TinhTien();
                }
            }
        });
    };

    //Chọn nhóm hàng
    $scope.ChonNhomHang = function () {
        $scope.hanghoas.data = $scope.nhomHang.HangHoa;
    }
    //Chọn tất cả nhóm hàng
    $scope.ChonTatCaNhomHang = function () {
        $scope.nhomHang = {};
        //Load hàng hóa
        $http.get('/API/HangHoaAPI/')
            .success(function (hanghoas) {
                $scope.hanghoas.data = resolveReferences(hanghoas);
            });
    }

//Bảng chi tiết nhập hàng
    //Tùy chình Column
    $scope.chitietNhapHangs.columnDefs =
    [
        //{
        //    displayName: "STT",
        //    name: 'stt',
        //    enableCellEdit: false,
        //    enableSorting: false,
        //    enableFiltering: false,
        //    cellTemplate: '<div class="ui-grid-cell-contents text-center">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
        //},
        {
            displayName: "Tên hàng",
            name: 'tenHangHoa',
            enableSorting: false,
            enableCellEdit: false
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
            width: 100
        },
        {
            displayName: "Giảm giá",
            name: 'giamgia',
            cellFilter: 'number:0',
            cellClass: 'text-right',
            width: 100
        },
        {
            displayName: "Thành tiền",
            name: 'thanhtien',
            cellFilter: 'number:0',
            cellClass: 'text-right',
            enableCellEdit: false,
            width: 100
        },
        {
            displayName: "",
            name: 'delete',
            enableSorting: false,
            enableFiltering: false,
            width: 50,
            enableCellEdit: false,
            cellTemplate: '<div ><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-danger" ng-click="grid.appScope.XoaHangHoaTrongHoaDonNhap(grid.renderContainers.body.visibleRowCache.indexOf(row))"><span class="fa fa-bitbucket"></span></button></div>',
        }
    ];
 
    //Tim kiem
    $scope.chitietNhapHangs.enableFiltering = true;
    //Select
    $scope.chitietNhapHangs.enableRowSelection = true;
    $scope.chitietNhapHangs.enableRowHeaderSelection = false;
    $scope.chitietNhapHangs.multiSelect = false;

    //Grid API
    $scope.chitietNhapHangs.onRegisterApi = function (gridApi) {
        //Edit
        gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {

            rowEntity.thanhtien = rowEntity.dongia * rowEntity.soluong - rowEntity.giamgia;

            //Tính tiền
            $scope.TinhTien();
        });
    };


//NHẬP HÀNG
    //Thêm nhập hàng
    $scope.ThemNhapHang = function () {
        //Tạo hóa đơn nhập
        var nhaphang = {
            thoigian: new Date()
        };
        $http.post('/API/NhapHangAPI/', nhaphang)
            .success(function (nhaphang) {
                $scope.nhaphang = resolveReferences(nhaphang);
                $scope.chitietNhapHangs.data = [];
            });
    };

    //Hủy nhập hàng
    $scope.HuyNhapHang = function () {
        $http.delete('/API/NhapHangAPI/' + $scope.nhaphang.id)
            .success(function () {
                $scope.nhaphang = {};
                $scope.chitietNhapHangs.data = [];
            });
    };

    //Xóa hàng hóa trong hóa đơn nhập
    $scope.XoaHangHoaTrongHoaDonNhap = function (index) {
        $scope.chitietNhapHangs.data.splice(index, 1);
        $scope.TinhTien();
    };

    //Lưu nhập hàng
    $scope.LuuNhapHang = function () {
        var nhaphang = {
            id: $scope.nhaphang.id,
            idNhaCungCap: $scope.nhaphang.idNhaCungCap,
            thoigian: $scope.nhaphang.thoigian,
            tongTien: $scope.nhaphang.tongTien,
            giamGia: $scope.nhaphang.giamGia,
            thanhtoan: $scope.nhaphang.thanhtoan,
            ghichu: $scope.nhaphang.ghichu,
        };
        //Lưu hóa đơn
        $http.put('/API/NhapHangAPI/' + nhaphang.id, nhaphang)
            .success(function (data) {
                //Lưu chi tiết hóa đơn nhập
                angular.forEach($scope.chitietNhapHangs.data, function (value, index) {
                    $http.post('/API/ChiTietNhapHangAPI/', value)
                        .success(function (chitietNhapHang) {
                            
                        });

                    //Tăng số lượng tồn
                    $http.get('/API/HangHoaAPI/' + value.idHangHoa)
                        .success(function (hanghoa) {
                            $scope.hanghoa = {
                                id: hanghoa.id,
                                mavach: hanghoa.mavach,
                                idNhaSanXuat: hanghoa.idNhaSanXuat,
                                idNhomHang: hanghoa.idNhomHang,
                                idDonViTinh: hanghoa.idDonViTinh,
                                ten: hanghoa.ten,
                                giaSi: hanghoa.giaSi,
                                giaLe: hanghoa.giaLe,
                                giaVon: hanghoa.giaVon,
                                mota: hanghoa.mota,
                                tonItNhat: hanghoa.tonItNhat,
                                tonNhieuNhat: hanghoa.tonNhieuNhat,
                                hinhanh: hanghoa.hinhanh,
                                ngungKinhDoanh: hanghoa.ngungKinhDoanh,
                                ghichu: hanghoa.ghichu,
                                soluong: hanghoa.soluong
                            };

                            $scope.hanghoa.soluong = parseInt($scope.hanghoa.soluong) + parseInt(value.soluong);

                            $http.put('/API/HangHoaAPI/' + $scope.hanghoa.id,  $scope.hanghoa);
                        });

                });
                $scope.nhaphang = {};
                $scope.chitietNhapHangs.data = [];

                toastr.success('Thành công', 'Lưu nhập hàng');
            });
    };

    //Xóa nhập hàng
    $scope.XoaNhapHang = function (id) {
        //Xác nhận
        sweet.show({
            title: 'Xác nhận',
            text: 'Xóa hóa đơn nhập hàng này?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Đồng ý!',
            cancelButtonText: 'Không',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                //Xóa hóa đơn nhập hàng
                $http.delete('/API/NhapHangAPI/' + id)
                    .success(function () {
                        sweet.show('Đã xóa', 'Xóa thành công ', 'success');
                        //Load danh sách nhập hàng
                        $http.get('/API/NhapHangAPI/')
                            .success(function (nhaphangs) {
                                $scope.nhaphangs.data = nhaphangs;
                                angular.forEach($scope.nhaphangs.data, function (value, index) {
                                    $scope.nhaphangs.data[index].thoigian = new Date($scope.nhaphangs.data[index].thoigian);
                                });
                            });
                        //Xóa chi tiết hóa đơn nhập hàng
                        $http.get('/ChiTietNhapHang/GetByNhapHang?idNhapHang=' + id)
                            .success(function (data) {
                                angular.forEach(data, function (value, index) {
                                    $http.delete('/API/ChiTietNhapHangAPI/' + value.id);
                                });
                            });
                    });
            }
            else {
                sweet.show('Đã hủy', 'Bạn giữ lại Đơn nhập hàng này', 'error');
            }
        });
        
    }

    //Tính tiền
    $scope.TinhTien = function () {
        var tongTien = 0;
        angular.forEach($scope.chitietNhapHangs.data, function (value, index) {
            tongTien = tongTien + value.thanhtien;
        });
        var thanhtoan = tongTien - $scope.nhaphang.giamGia;
        $scope.nhaphang.tongTien = tongTien;
        $scope.nhaphang.thanhtoan = thanhtoan;
    }


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