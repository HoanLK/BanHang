myApp.controller("banhangController", ['$scope', '$http', '$window', 'uiGridConstants', 'sweet', function ($scope, $http, $window, uiGridConstants, sweet) {
    $scope.hanghoas = {};
    $scope.hanghoa = {};

    $scope.hoadonBanHangs = [];
    $scope.hoadonBanHang = {};
    $scope.chitietBanHangs = {};

    $scope.nhomHangs = [];
    $scope.nhomHang = {};

    $scope.khachhangs = [];

    $scope.donvitinhs = [];
    $scope.loaiHoaDonBanHangs = [];
    $scope.error = {};

//INIT
    $scope.Init = function () {
        $scope.idUser = angular.element('#user').val();
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
        //Load loại hóa đơn bán hàng
        $http.get('/API/LoaiHoaDonBanHangAPI/')
            .success(function (loaiHoaDonBanHangs) {
                $scope.loaiHoaDonBanHangs = resolveReferences(loaiHoaDonBanHangs);
            })
        //Load khách hàng
        $http.get('/API/KhachHangAPI/')
            .success(function (khachhangs) {
                $scope.khachhangs = resolveReferences(khachhangs);
            })
        //Load hóa đơn chua thanh toán
        $http.get('/HoaDonBanHang/GetChuaThanhToan/')
            .success(function (hoadonBanHangs) {
                $scope.hoadonBanHangs = resolveReferences(hoadonBanHangs);
            });
    }

    $scope.Init();
    
    $scope.QuetMaVach = function () {

        //Lấy thông tin hàng hóa
        $http.get('/HangHoa/GetByMaVach?mavach=' + $scope.mavach)
            .success(function (hanghoa) {
                $http.get('/API/HangHoaAPI/' + hanghoa.id)
                    .success(function (data) {
                        $scope.hanghoa = resolveReferences(data);
                        $scope.mavach = null;
                        //Kiểm tra hàng hóa đã có trong hóa đơn chưa
                        var count = 0;
                        angular.forEach($scope.chitietBanHangs.data, function (value, index) {
                            //Nếu có rồi thì tăng số lượng thêm 1
                            if ($scope.hanghoa.id == value.idHangHoa) {
                                count++;
                                $scope.chitietBanHangs.data[index].soluong++;
                                //Lấy đơn giá theo loại hóa đơn
                                if ($scope.hoadonBanHang.idLoaiHoaDonBanHang == 1) {
                                    $scope.chitietBanHangs.data[index].dongia = $scope.hanghoa.giaLe;
                                } else {
                                    $scope.chitietBanHangs.data[index].dongia = $scope.hanghoa.giaSi;
                                }
                                $scope.chitietBanHangs.data[index].thanhtien = $scope.chitietBanHangs.data[index].soluong * $scope.chitietBanHangs.data[index].dongia;
                                //Lưu chi tiết hóa đơn bán hàng
                                var chitietHoaDonBanHang = {
                                    id: $scope.chitietBanHangs.data[index].id,
                                    idHoaDonBanHang: $scope.chitietBanHangs.data[index].idHoaDonBanHang,
                                    idHangHoa: $scope.chitietBanHangs.data[index].idHangHoa,
                                    dongia: $scope.chitietBanHangs.data[index].dongia,
                                    soluong: $scope.chitietBanHangs.data[index].soluong,
                                    thanhtien: $scope.chitietBanHangs.data[index].thanhtien,
                                    ghichu: $scope.chitietBanHangs.data[index].ghichu
                                }
                                $http.put('/API/ChiTietBanHangAPI/' + chitietHoaDonBanHang.id, chitietHoaDonBanHang)
                                    .success(function () {
                                        //Lưu hóa đơn bán hàng
                                        $scope.LuuHoaDonBanHang();
                                    });
                            }
                        });
                        //Chưa có thì thêm vào hóa đơn
                        if (count == 0) {
                            //Lấy đơn giá theo loại hóa đơn
                            var dongia = 0;
                            if ($scope.hoadonBanHang.idLoaiHoaDonBanHang == 1) {
                                dongia = $scope.hanghoa.giaLe;
                            } else {
                                dongia = $scope.hanghoa.giaSi;
                            }
                            var chitietBanHang = {
                                idHoaDonBanHang: $scope.hoadonBanHang.id,
                                idHangHoa: $scope.hanghoa.id,
                                dongia: dongia,
                                soluong: 1,
                                thanhtien: parseInt(dongia)
                            };
                            //Thêm chi tiết hóa đơn bán hàng
                            $http.post('/API/ChiTietBanHangAPI/', chitietBanHang)
                                .success(function (data) {
                                    $http.get('/API/ChiTietBanHangAPI/' + data.id)
                                        .success(function (data) {
                                            $scope.chitietBanHangs.data.push(resolveReferences(data));

                                            //Lưu hóa đơn bán hàng
                                            $scope.LuuHoaDonBanHang();
                                        });
                                });
                        }
                    });
                
            });

    }

//Bảng hàng hóa
    //Tùy chình Column
    $scope.hanghoas.columnDefs =
    [
        {
            displayName: "Mã hàng",
            name: 'mavach',
            width: 100
        },
        {
            displayName: "Tên hàng hóa",
            name: 'ten',
            cellTooltip: true
        },
        {
            displayName: "SL",
            name: 'soluong',
            cellFilter: 'number:0',
            cellClass: 'text-right',
            width: 50
        },
        {
            displayName: "Giá lẻ",
            name: 'giaLe',
            cellFilter: 'number:0',
            cellClass: 'text-right',
            width: 75
        },
        {
            displayName: "Giá sỉ",
            name: 'giaSi',
            cellFilter: 'number:0',
            cellClass: 'text-right',
            width: 75
        },

    ];

    //Tim kiem
    $scope.hanghoas.enableFiltering = true;
    //Select
    $scope.hanghoas.enableRowSelection = true;
    $scope.hanghoas.enableRowHeaderSelection = false;
    $scope.hanghoas.multiSelect = false;
    //Group
    $scope.hanghoas.showGroupPanel = true;
    $scope.hanghoas.jqueryUIDraggable = true;

    //Grid API
    $scope.hanghoas.onRegisterApi = function (gridApi) {
        //Thêm hàng hóa vào hóa đơn bán hàng
        gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
            //Kiểm tra đã chọn hóa đơn chưa
            if ($scope.hoadonBanHang.id == null) {
                sweet.show('Chưa chọn', 'Vui lòng tạo Chọn hoặc Thêm hóa đơn bán hàng', 'error');
            }
            //Nếu chọn rồi thì thêm hàng hóa
            else {
                $scope.hanghoa = gridApi.selection.getSelectedRows()[0];
                //Kiểm tra hàng hóa đã có trong hóa đơn chưa
                var count = 0;
                angular.forEach($scope.chitietBanHangs.data, function (value, index) {
                    //Nếu có rồi thì tăng số lượng thêm 1
                    if ($scope.hanghoa.id == value.idHangHoa) {
                        count++;
                        $scope.chitietBanHangs.data[index].soluong++;
                        //Lấy đơn giá theo loại hóa đơn
                        if ($scope.hoadonBanHang.idLoaiHoaDonBanHang == 1) {
                            $scope.chitietBanHangs.data[index].dongia = $scope.hanghoa.giaLe;
                        } else {
                            $scope.chitietBanHangs.data[index].dongia = $scope.hanghoa.giaSi;
                        }
                        $scope.chitietBanHangs.data[index].thanhtien = $scope.chitietBanHangs.data[index].soluong * $scope.chitietBanHangs.data[index].dongia;
                        //Lưu chi tiết hóa đơn bán hàng
                        var chitietHoaDonBanHang = {
                            id: $scope.chitietBanHangs.data[index].id,
                            idHoaDonBanHang: $scope.chitietBanHangs.data[index].idHoaDonBanHang,
                            idHangHoa: $scope.chitietBanHangs.data[index].idHangHoa,
                            dongia: $scope.chitietBanHangs.data[index].dongia,
                            soluong: $scope.chitietBanHangs.data[index].soluong,
                            thanhtien: $scope.chitietBanHangs.data[index].thanhtien,
                            ghichu: $scope.chitietBanHangs.data[index].ghichu
                        }
                        $http.put('/API/ChiTietBanHangAPI/' + chitietHoaDonBanHang.id, chitietHoaDonBanHang)
                            .success(function () {
                                //Lưu hóa đơn bán hàng
                                $scope.LuuHoaDonBanHang();
                            });
                    }
                });
                //Chưa có thì thêm vào hóa đơn
                if (count == 0) {
                    //Lấy đơn giá theo loại hóa đơn
                    var dongia = 0;
                    if ($scope.hoadonBanHang.idLoaiHoaDonBanHang == 1) {
                        dongia = $scope.hanghoa.giaLe;
                    } else {
                        dongia = $scope.hanghoa.giaSi;
                    }
                    var chitietBanHang = {
                        idHoaDonBanHang: $scope.hoadonBanHang.id,
                        idHangHoa: $scope.hanghoa.id,
                        dongia: dongia,
                        soluong: 1,
                        thanhtien: parseInt(dongia)
                    };
                    //Thêm chi tiết hóa đơn bán hàng
                    $http.post('/API/ChiTietBanHangAPI/', chitietBanHang)
                        .success(function (data) {
                            $http.get('/API/ChiTietBanHangAPI/' + data.id)
                                .success(function (data) {
                                    $scope.chitietBanHangs.data.push(resolveReferences(data));

                                    //Lưu hóa đơn bán hàng
                                    $scope.LuuHoaDonBanHang();
                                });
                        });
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

//Bảng chi tiết bán hàng
    //Tùy chình Column
    $scope.chitietBanHangs.columnDefs =
    [
        {
            displayName: "Mã hàng",
            name: 'HangHoa.mavach',
            width: 100
        },
        {
            displayName: "Tên hàng hóa",
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
        },
        {
            displayName: "",
            name: 'delete',
            enableSorting: false,
            enableFiltering: false,
            width: 50,
            enableCellEdit: false,
            cellTemplate: '<div ><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-danger" ng-click="grid.appScope.XoaHangHoaKhoiHoaDon(grid.renderContainers.body.visibleRowCache.indexOf(row))"><span class="fa fa-bitbucket"></span></button></div>',
        }
    ];


    //Tim kiem
    $scope.chitietBanHangs.enableFiltering = true;
    //Select
    $scope.chitietBanHangs.enableRowSelection = true;
    $scope.chitietBanHangs.enableRowHeaderSelection = false;
    $scope.chitietBanHangs.multiSelect = false;

    //Grid API
    $scope.chitietBanHangs.onRegisterApi = function (gridApi) {
        //Edit
        gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {

            rowEntity.thanhtien = rowEntity.dongia * rowEntity.soluong;

            var chitietBanHang = {
                id: rowEntity.id,
                idHoaDonBanHang: rowEntity.idHoaDonBanHang,
                idHangHoa: rowEntity.idHangHoa,
                dongia: rowEntity.dongia,
                soluong: rowEntity.soluong,
                thanhtien: rowEntity.thanhtien,
                ghichu: rowEntity.ghichu
            };

            //Lưu chi tiết được sửa
            $http.put("/API/ChiTietBanHangAPI/" + chitietBanHang.id, chitietBanHang)
                .success(function () {

                    //Lưu hóa đơn bán hàng
                    $scope.LuuHoaDonBanHang();

                });
        });
    };



//BÁN HÀNG
    //Thêm hóa đơn bán hàng
    $scope.ThemHoaDonBanHang = function () {
        $scope.chitietBanHangs.data = [];
        var hoadonBanHang = {
            idLoaiHoaDonBanHang: 1,
            idKhachHang: 1,
            idNhanVien: $scope.idUser,
            thoigian: new Date(),
            tongTien: 0,
            giamgia: 0,
            thanhtoan: 0,
            daThanhToan: 0
        };
        $http.post('/API/HoaDonBanHangAPI/', hoadonBanHang)
            .success(function (data) {
                $scope.hoadonBanHang = data;
                $scope.hoadonBanHangs.push($scope.hoadonBanHang);
            });

    };

    //Chọn hóa đơn bán hàng
    $scope.ChonHoaDonBanHang = function (id) {
        //Lấy thông tin hóa đơn đó
        $http.get('/API/HoaDonBanHangAPI/' + id)
            .success(function (hoadonBanHang) {
                $scope.hoadonBanHang = resolveReferences(hoadonBanHang);
                $scope.hoadonBanHang.thoigian = new Date($scope.hoadonBanHang.thoigian);

                //Lấy chi tiết bàn hàng của hóa đơn đó
                $scope.chitietBanHangs.data = $scope.hoadonBanHang.ChiTietBanHang;
            });

    };

    //Lưu hóa đơn bán hàng
    $scope.LuuHoaDonBanHang = function () {
        $scope.TinhTien();
        var hoadonBanHang = {
            id: $scope.hoadonBanHang.id,
            idLoaiHoaDonBanHang: $scope.hoadonBanHang.idLoaiHoaDonBanHang,
            idKhachHang: $scope.hoadonBanHang.idKhachHang,
            idNhanVien: $scope.idUser,
            thoigian: $scope.hoadonBanHang.thoigian,
            hinhanh: $scope.hoadonBanHang.hinhanh,
            tongTien: $scope.hoadonBanHang.tongTien,
            giamgia: $scope.hoadonBanHang.giamgia,
            thanhtoan: $scope.hoadonBanHang.thanhtoan,
            daThanhToan: $scope.hoadonBanHang.daThanhToan,
            ghichu: $scope.hoadonBanHang.ghichu
        };
        $http.put('/API/HoaDonBanHangAPI/' + hoadonBanHang.id, hoadonBanHang)
            .success(function () { });
    }

    //Thanh toán hóa đơn bán hàng
    $scope.ThanhToan = function () {
        var hoadonBanHang = {
            id: $scope.hoadonBanHang.id,
            idLoaiHoaDonBanHang: $scope.hoadonBanHang.idLoaiHoaDonBanHang,
            idKhachHang: $scope.hoadonBanHang.idKhachHang,
            idNhanVien: $scope.hoadonBanHang.idNhanVien,
            thoigian: $scope.hoadonBanHang.thoigian,
            hinhanh: $scope.hoadonBanHang.hinhanh,
            tongTien: $scope.hoadonBanHang.tongTien,
            giamgia: $scope.hoadonBanHang.giamgia,
            thanhtoan: $scope.hoadonBanHang.thanhtoan,
            daThanhToan: 1,
            ghichu: $scope.hoadonBanHang.ghichu
        };

        //Đánh dấu hóa đơn là đã thanh toán
        $http.put('/API/HoaDonBanHangAPI/' + hoadonBanHang.id, hoadonBanHang)
            .success(function (data) {
                angular.forEach($scope.chitietBanHangs.data, function (value, index) {
                    $http.get('/API/HangHoaAPI/' + value.idHangHoa)
                        .success(function (data) {
                            var hanghoa = {
                                id: data.id,
                                mavach: data.mavach,
                                idNhaSanXuat: data.idNhaSanXuat,
                                idNhomHang: data.idNhomHang,
                                idDonViTinh: data.idDonViTinh,
                                ten: data.ten,
                                giaSi: data.giaSi,
                                giaLe: data.giaLe,
                                giaVon: data.giaVon,
                                mota: data.mota,
                                tonItNhat: data.tonItNhat,
                                tonNhieuNhat: data.tonNhieuNhat,
                                hinhanh: data.hinhanh,
                                ngungKinhDoanh: data.ngungKinhDoanh,
                                ghichu: data.ghichu,
                                soluong: data.soluong - value.soluong
                            };
                            $http.put('/API/HangHoaAPI/' + hanghoa.id, hanghoa)
                                .success(function () {
                                    //Load hàng hóa
                                    $http.get('/API/HangHoaAPI/')
                                        .success(function (hanghoas) {
                                            $scope.hanghoas.data = resolveReferences(hanghoas);
                                        });
                                });
                        });
                });

                //Load hóa đơn chua thanh toán
                $http.get('/HoaDonBanHang/GetChuaThanhToan/')
                    .success(function (hoadonBanHangs) {
                        $scope.hoadonBanHangs = resolveReferences(hoadonBanHangs);
                        $scope.hoadonBanHang = {};
                        $scope.chitietBanHangs.data = [];
                        toastr.success('Thành công', 'Thanh toán');
                    });
                

            });
        
    };

    //In
    $scope.In = function () {

    };

    //Xóa hàng hóa khỏi hóa đơn
    $scope.XoaHangHoaKhoiHoaDon = function (index) {
        var hanghoa = $scope.chitietBanHangs.data[index];
        //Xóa khỏi mảng
        $scope.chitietBanHangs.data.splice(index, 1);

        //Xóa khỏi CSDL
        $http.delete('/API/ChiTietBanHangAPI/' + hanghoa.id)
            .success(function () {
                $scope.TinhTien();
                $scope.LuuHoaDonBanHang();
            });
    };

    //Hủy hóa đơn bán hàng
    $scope.HuyHoaDonBanHang = function () {
        

        //Xác nhận
        sweet.show({
            title: 'Xác nhận',
            text: 'Hủy hóa đơn bán hàng này?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Đồng ý!',
            cancelButtonText: 'Không',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                //Xóa chi tiết bán hàng của hóa đơn đó
                angular.forEach($scope.hoadonBanHang.ChiTietBanHang, function (value, index) {
                    $http.delete('/API/ChiTietBanHangAPI/' + value.id);
                });
                //Xóa đơn hàng
                $http.delete('/API/HoaDonBanHangAPI/' + $scope.hoadonBanHang.id)
                    .success(function () {
                        //Load hóa đơn chua thanh toán
                        $http.get('/HoaDonBanHang/GetChuaThanhToan/')
                            .success(function (hoadonBanHangs) {
                                $scope.hoadonBanHangs = resolveReferences(hoadonBanHangs);
                                $scope.hoadonBanHang = {};
                                $scope.chitietBanHangs.data = [];
                            });
                    });
                sweet.show('Đã xóa', 'Xóa hóa đơn thành công', 'success');
            }
            else {
                sweet.show('Đã hủy', 'Bạn giữ lại hóa đơn', 'error');
            }
        });
        
    };

    //Tính tiền
    $scope.TinhTien = function () {
        var tong = 0;
        //Tổng tiền
        angular.forEach($scope.chitietBanHangs.data, function (value, index) {
            tong = tong + parseInt(value.thanhtien);
        });
        $scope.hoadonBanHang.tongTien = tong;

        var giamgia = (angular.isNumber($scope.hoadonBanHang.giamgia)) ? parseInt($scope.hoadonBanHang.giamgia) : 0;
        //Tổng Thanh toán
        $scope.hoadonBanHang.thanhtoan = parseInt($scope.hoadonBanHang.tongTien) - giamgia;

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