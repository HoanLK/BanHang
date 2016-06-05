myApp.controller("hanghoaController", ['$scope', '$http', '$window', 'uiGridConstants', 'sweet', function ($scope, $http, $window, uiGridConstants, sweet) {
    $scope.nhomHangs = [];
    $scope.nhomHang = {};
    $scope.hanghoas = {};
    $scope.hanghoa = {};
    $scope.chitietHangHoas = [];

    //Đon vị tính
    $scope.donvitinhs = [];
    $scope.donvitinh = {};

    $scope.nhasanxuats = [];
    $scope.error = {};
    $scope.error.hanghoa = {};


    //Init
    $scope.Init = function () {
        $scope.role = angular.element('#role').val();
        if ($scope.role != "Admin") {
            $window.location.href = '/#/banhang';
        }
        //Load nhóm hàng
        $http.get('/API/NhomHangAPI/').success(function (nhomHangs) {$scope.nhomHangs = resolveReferences(nhomHangs); });

        //Load hàng hóa
        $http.get('/API/HangHoaAPI/')
            .success(function (hanghoas) {
                $scope.hanghoas.data = resolveReferences(hanghoas);
            });

        //Load đơn vị tính
        $http.get('/API/DonViTinhAPI')
            .success(function (donvitinhs) {
                $scope.donvitinhs = resolveReferences(donvitinhs);
            });

        //Load nhà sản xuất
        $http.get('/API/NhaSanXuatAPI')
            .success(function (nhasanxuats) {
                $scope.nhasanxuats = resolveReferences(nhasanxuats);
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
        },
        {
            displayName: "Giá lẻ",
            name: 'giaLe',
            cellFilter: 'number:0',
            cellClass: 'text-right',
            width: 100
        },
        {
            displayName: "Giá sỉ",
            name: 'giaSi',
            cellFilter: 'number:0',
            cellClass: 'text-right',
            width: 100
        },
        {
            displayName: "Giá vốn",
            name: 'giaVon',
            cellFilter: 'number:0',
            cellClass: 'text-right',
            width: 100
        },
        {
            displayName: "Tồn kho",
            name: 'soluong',
            cellFilter: 'number:0',
            cellClass: 'text-right',
            width: 100
        },
        {
            displayName: "",
            name: 'delete',
            enableSorting: false,
            enableFiltering: false,
            width: 50,
            enableCellEdit: false,
            cellTemplate: '<div ><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-success" ng-click="grid.appScope.XemHangHoa(row.entity)" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#xemHangHoa" title="Xem hàng hóa"><span class="fa fa-search"></span></button></div>',
        }
    ];

    //Row height
    $scope.hanghoas.rowHeight = 35;

    //Tim kiem
    $scope.hanghoas.enableFiltering = true;
    //Select
    $scope.hanghoas.enableRowSelection = true;
    $scope.hanghoas.enableRowHeaderSelection = false;
    $scope.hanghoas.multiSelect = false;

    //Grid API
    $scope.hanghoas.onRegisterApi = function (gridApi) {};

//MÃ VẠCH
    

    $scope.InMaVach = function () {
        
    }

    $scope.mavach = {
        width: 2,
        height: 100,
        displayValue: true,
        font: 'monospace',
        textAlign: 'center',
        fontSize: 40,
        backgroundColor: '#fff',
        lineColor: '#000'
    }
    //$scope.mavach = {
    //    width: 0.5,
    //    height: 30,
    //    displayValue: true,
    //    font: 'monospace',
    //    textAlign: 'center',
    //    fontSize: 10,
    //    backgroundColor: '#fff',
    //    lineColor: '#000'
    //}

//HANG HÓA
    //Chọn Ảnh hàng hóa
    $scope.ChonHinhAnhHangHoa = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.hanghoa.hinhanh = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    };

    //Thêm hàng hóa
    $scope.ThemHangHoa = function () {
        $scope.hanghoa = {
            tonItNhat: 1,
            tonNhieuNhat: 99999,
            soluong: 0
        };
        $scope.error.hanghoa.ten = 1;
    }
    //Sửa hàng hóa
    $scope.SuaHangHoa = function () {

    }
    //Xem hàng hóa
    $scope.XemHangHoa = function (hanghoa) {
        $http.get('/API/HangHoaAPI/' + hanghoa.id)
            .success(function (data) {
                //Lấy thông tin hàng hóa
                $scope.hanghoa = resolveReferences(data);
            });
    }

    //Kiểm tra tên hàng hóa
    $scope.CheckTenHangHoa = function (ten) {
        if (ten == null || ten == '') {
            $scope.error.hanghoa.ten = 1;
        }
        else {
            $scope.error.hanghoa.ten = 0;
        }
    }

    //Lưu hàng hóa
    $scope.LuuHangHoa = function () {
        //Thêm
        if ($scope.hanghoa.id == null) {
            $http.post('/API/HangHoaAPI/', $scope.hanghoa)
                .success(function (data) {
                    toastr.success('Thành công', 'Thêm hàng hóa');
                    //Load nhóm hàng
                    $http.get('/API/NhomHangAPI/')
                        .success(function (nhomHangHoas) {
                            $scope.nhomHangs = resolveReferences(nhomHangHoas);
                            $scope.nhomHang = {};
                        });
                    //Load hàng hóa
                    $http.get('/API/HangHoaAPI/')
                        .success(function (hanghoas) {
                            $scope.hanghoas.data = resolveReferences(hanghoas);
                            $scope.hanghoa = {};
                        });
                });
        }
        //Sửa
        else {
            var hanghoa = {
                id: $scope.hanghoa.id,
                mavach: $scope.hanghoa.mavach,
                idNhaSanXuat: $scope.hanghoa.idNhaSanXuat,
                idNhomHang: $scope.hanghoa.idNhomHang,
                idDonViTinh: $scope.hanghoa.idDonViTinh,
                ten: $scope.hanghoa.ten,
                giaSi: $scope.hanghoa.giaSi,
                giaLe: $scope.hanghoa.giaLe,
                giaVon: $scope.hanghoa.giaVon,
                mota: $scope.hanghoa.mota,
                tonItNhat: $scope.hanghoa.tonItNhat,
                tonNhieuNhat: $scope.hanghoa.tonNhieuNhat,
                hinhanh: $scope.hanghoa.hinhanh,
                ngungKinhDoanh: $scope.hanghoa.ngungKinhDoanh,
                ghichu: $scope.hanghoa.ghichu,
                soluong: $scope.hanghoa.soluong
            };
            $http.put('/API/HangHoaAPI/' + $scope.hanghoa.id, hanghoa)
                .success(function () {
                    toastr.success('Thành công', 'Sửa hàng hóa');
                    //Load nhóm hàng
                    $http.get('/API/NhomHangAPI/')
                        .success(function (nhomHangs) {
                            $scope.nhomHangs = resolveReferences(nhomHangs);
                            $scope.nhomHang = {};
                        });
                    //Load hàng hóa
                    $http.get('/API/HangHoaAPI/')
                        .success(function (hanghoas) {
                            $scope.hanghoas.data = resolveReferences(hanghoas);
                            $http.get('/API/HangHoaAPI/' + $scope.hanghoa.id)
                                .success(function (data) {
                                    $scope.hanghoa = resolveReferences(data);
                                });
                        });
                });
        }
    };

    //Xóa hàng hóa
    $scope.XoaHangHoa = function () {
        //Xác nhận
        sweet.show({
            title: 'Xác nhận',
            text: 'Xóa ' + $scope.hanghoa.ten + ' ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Đồng ý!',
            cancelButtonText: 'Không',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                //Kiểm tra xem hàng hóa còn tồn trong kho không?
                //nếu còn thì thông báo không xóa được
                if ($scope.hanghoa.soluong > 0) {
                    sweet.show('Chưa xóa', 'Còn tồn ' + $scope.hanghoa.soluong + ' ' + $scope.hanghoa.donvitinh, 'error');
                }
                //Không còn thì thực hiện xóa
                else {
                    $http.delete('/API/HangHoaAPI/' + $scope.hanghoa.id)
                        .success(function () {
                            sweet.show('Đã xóa', 'Xóa thành công ' + $scope.hanghoa.ten, 'success');
                            angular.element('#xemHangHoa').modal('hide');
                            //Load nhóm hàng
                            $http.get('/API/NhomHangAPI/')
                                .success(function (nhomHangs) {
                                    $scope.nhomHangs = resolveReferences(nhomHangs);
                                });
                            //Load hàng hóa
                            $http.get('/API/HangHoaAPI/')
                                .success(function (hanghoas) {
                                    $scope.hanghoas.data = resolveReferences(hanghoas);
                                });
                        });
                }
            }
            else {
                sweet.show('Đã hủy', 'Bạn giữ lại ' + $scope.hanghoa.ten + ' !', 'error');
            }
        });
        
    };

    //Xóa hàng hóa
    $scope.XoaHangHoa = function () {
        //Xác nhận
        sweet.show({
            title: 'Xác nhận',
            text: 'Xóa ' + $scope.hanghoa.ten + ' ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Đồng ý!',
            cancelButtonText: 'Không',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                //Kiểm tra xem hàng hóa còn tồn trong kho không?
                //nếu còn thì thông báo không xóa được
                if ($scope.hanghoa.soluong > 0) {
                    sweet.show('Chưa xóa', 'Còn tồn ' + $scope.hanghoa.soluong + ' ' + $scope.hanghoa.donvitinh, 'error');
                }
                    //Không còn thì thực hiện xóa
                else {
                    $http.delete('/API/HangHoaAPI/' + $scope.hanghoa.id)
                        .success(function () {
                            sweet.show('Đã xóa', 'Xóa thành công ' + $scope.hanghoa.ten, 'success');
                            angular.element('#xemHangHoa').modal('hide');
                            //Load nhóm hàng
                            $http.get('/API/NhomHangAPI/')
                                .success(function (nhomHangs) {
                                    $scope.nhomHangs = resolveReferences(nhomHangs);
                                });
                            //Load hàng hóa
                            $http.get('/API/HangHoaAPI/')
                                .success(function (hanghoas) {
                                    $scope.hanghoas.data = resolveReferences(hanghoas);
                                });
                        });
                }
            }
            else {
                sweet.show('Đã hủy', 'Bạn giữ lại ' + $scope.hanghoa.ten + ' !', 'error');
            }
        });

    };

    //Hủy thêm - sửa hàng hóa
    $scope.HuyThemSuaHangHoa = function () {
        //Nếu hủy thêm thì reset biến error và hàng hóa
        if ($scope.hanghoa.id == null) {
            $scope.error.hanghoa = {};
            $scope.hanghoa = {};
        };
    };

//NHÓM HÀNG
    //Chọn nhóm hàng
    $scope.XemHangHoaTheoNhom = function (nhomHang) {
        if (nhomHang != null) {
            $http.get('/API/NhomHangAPI/' + nhomHang.id)
                .success(function (data) {
                    $scope.nhomHang = resolveReferences(data);
                    $scope.hanghoas.data = $scope.nhomHang.HangHoa;
                });
        }
        else {
            $scope.nhomHang = {};
            $http.get('/API/HangHoaAPI/')
                .success(function (data) {
                    $scope.hanghoas.data = resolveReferences(data);
                });
        }
    }

    //Lưu Nhóm hàng
    $scope.LuuNhomHang = function (id) {
        //Thêm
        if (id == null) {
            $http.post('/API/NhomHangAPI/', $scope.nhomHang)
                .success(function () {
                    //Load nhóm hàng
                    $http.get('/API/NhomHangAPI/').success(function (nhomHangs) { $scope.nhomHangs = resolveReferences(nhomHangs); });
                    toastr.success('Thành công', 'Thêm nhóm hàng');
                });
        }
        //Sửa
        else {
            $http.put('/API/NhomHangAPI/' + id, $scope.nhomHang)
                .success(function () {
                    //Load nhóm hàng
                    $http.get('/API/NhomHangAPI/').success(function (nhomHangs) { $scope.nhomHangs = resolveReferences(nhomHangs); });
                    toastr.success('Thành công', 'Sửa nhóm hàng');
                });
        }
    };

    //Thêm nhóm hàng
    $scope.ThemNhomHang = function () {
        $scope.nhomHang = {};
    };

    //Sửa Nhóm hàng
    $scope.SuaNhomHang = function (id) {
        $http.get('/API/NhomHangAPI/' + id)
            .success(function (data) {
                $scope.nhomHang = data;
            });
    }

    //Xóa Nhóm hàng
    $scope.XoaNhomHang = function (id, index) {
        //Lấy thông tin nhóm hàng cần xóa
        $http.get('/API/NhomHangAPI/' + id)
            .success(function (nhomHang) {
                $scope.nhomHang = nhomHang;

                sweet.show({
                    title: 'Xác nhận',
                    text: 'Xóa nhóm ' + $scope.nhomHang.ten + ' ?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#0AA89E',
                    confirmButtonText: 'Đồng ý!',
                    cancelButtonText: 'Không',
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        //Kiểm tra còn Hàng hóa nào trong nhóm không?
                        //Nếu còn thì thông báo xóa không thành công
                        if ($scope.nhomHang.HangHoa.length > 0) {
                            sweet.show('Chưa xóa', 'Còn hàng hóa trong nhóm ' + $scope.nhomHang.ten, 'error');
                        }
                        //Nếu không còn thì thực hiện xóa
                        else {
                            $http.delete('/API/NhomHangAPI/' + id)
                                .success(function () {
                                    sweet.show('Đã xóa', 'Xóa thành công nhóm ' + $scope.nhomHang.ten, 'success');
                                    //Load nhóm hàng
                                    $http.get('/API/NhomHangAPI/').success(function (nhomHangs) { $scope.nhomHangs = resolveReferences(nhomHangs); });
                                });
                        }
                    }
                    else {
                        sweet.show('Đã hủy', 'Bạn giữ lại nhóm ' + $scope.nhomHang.ten, 'error');
                    }
                });
            });

        


        
    }

//ĐON VỊ TÍNH
    //Thêm đơn vị tính
    $scope.ThemDonViTinh = function () {
        $scope.donvitinh = {};
    }
    //Lưu đơn vị tính
    $scope.LuuDonViTinh = function () {
        $http.post('/API/DonViTinhAPI', $scope.donvitinh)
            .success(function (donvitinh) {
                $scope.donvitinhs.push(donvitinh);
                toastr.success("Thành công", "Thêm đơn vị tính");
            });
    }

//NHÀ SẢN XUẤT
    //Thêm nhà sản xuất
    $scope.ThemNhaSanXuat = function () {
        $scope.nhasanxuat = {};
    }
    //Lưu nhà sản xuất
    $scope.LuuNhaSanXuat = function () {
        $http.post('/API/NhaSanXuatAPI', $scope.nhasanxuat)
            .success(function (nhasanxuat) {
                $scope.nhasanxuats.push(nhasanxuat);
                toastr.success("Thành công", "Thêm nhà sản xuất");
            });
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