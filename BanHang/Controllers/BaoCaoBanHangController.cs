using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BanHang.Models;
using BanHang.Models.Reports;
using System.Web.UI.WebControls;
using System.Data;
using System.IO;
using System.Web.UI;

namespace BanHang.Controllers
{
    [Authorize(Roles = "Admin")]
    public class BaoCaoBanHangController : Controller
    {
        private BanHangEntities db = new BanHangEntities();

        private static IEnumerable<HoaDonBanHang> _hoadonBanHangs;
        private static SumHoaDonBanHang _sumHoaDonBanHang;

        // GET: BaoCaoBanHang
        [HttpGet]
        public ActionResult Index()
        {
            //Khai báo biến
            SearchHoaDonBanHang model = new SearchHoaDonBanHang();
            CriterialHoaDonBanHang critHoaDonBanHang = new CriterialHoaDonBanHang();
            SumHoaDonBanHang sumHoaDonBanHang = new SumHoaDonBanHang();

            var hoadonBanHangs = db.HoaDonBanHang.OrderBy(p => p.thoigian).ToList();

            if (hoadonBanHangs.Count >= 1)
            {
                foreach (var value in hoadonBanHangs)
                {
                    value.thoigian = value.thoigian.Value.AddHours(7);
                }
            }

            //Default View
            ViewBag.nguoiban = new SelectList(db.User.OrderBy(p => p.Name), "UserId", "Name");
            ViewBag.khachhang = new SelectList(db.KhachHang.OrderBy(p => p.ten), "id", "ten");

            //Footer
            sumHoaDonBanHang.tongTongTien = hoadonBanHangs.Sum(p => p.tongTien);
            sumHoaDonBanHang.tongGiamGia = hoadonBanHangs.Sum(p => p.giamgia);
            sumHoaDonBanHang.tongThanhToan = hoadonBanHangs.Sum(p => p.thanhtoan);

            //Model
            model.hoadonBanHangs = hoadonBanHangs.ToList();
            model.sumHoaDonBanHang = sumHoaDonBanHang;

            //Export
            _hoadonBanHangs = model.hoadonBanHangs.ToList();
            _sumHoaDonBanHang = model.sumHoaDonBanHang;

            return View(model);
        }

        // POST
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index([Bind(Include = "tuNgay,denNgay,nguoiban,khachhang")]CriterialHoaDonBanHang critHoaDonBanHang, FormCollection fc)
        {
            //Khai báo biến
            SearchHoaDonBanHang model = new SearchHoaDonBanHang();
            SumHoaDonBanHang sumHoaDonBanHang = new SumHoaDonBanHang();

            //Lấy giá trị từ form
            string khachhang = fc["khachhang"].ToString();
            string nguoiban = fc["nguoiban"].ToString();

            DateTime? tuNgay;
            if (critHoaDonBanHang.tuNgay != null)
            {
                tuNgay = DateTime.Parse(critHoaDonBanHang.tuNgay.ToString());
            }
            else
            {
                tuNgay = db.HoaDonBanHang.OrderBy(p => p.thoigian).Select(p => p.thoigian).FirstOrDefault();
            }
            DateTime? denNgay;
            if (critHoaDonBanHang.denNgay != null)
            {
                denNgay = DateTime.Parse(critHoaDonBanHang.denNgay.ToString());
            }
            else
            {
                denNgay = DateTime.Now;
            }

            //Truy vấn
            var hoadonBanHangs = from c in db.HoaDonBanHang select c;
            {
                //Lọc theo Từ ngày
                if (!string.IsNullOrEmpty(tuNgay.ToString()))
                {
                    tuNgay = tuNgay.Value.AddHours(-7);

                    hoadonBanHangs = hoadonBanHangs.Where(p => p.thoigian >= tuNgay);
                }

                //Lọc theo Đến ngày
                if (!string.IsNullOrEmpty(denNgay.ToString()))
                {
                    denNgay = denNgay.Value.AddHours(-7);
                    hoadonBanHangs = hoadonBanHangs.Where(p => p.thoigian <= denNgay);
                }

                //Lọc theo khách hàng
                if (!string.IsNullOrEmpty(khachhang.ToString()))
                {
                    int? temp = int.Parse(khachhang.ToString());
                    hoadonBanHangs = hoadonBanHangs.Where(p => p.idKhachHang == temp);
                }

                //Lọc theo người bán
                if (!string.IsNullOrEmpty(nguoiban.ToString()))
                {
                    int? temp = int.Parse(nguoiban.ToString());
                    hoadonBanHangs = hoadonBanHangs.Where(p => p.idNhanVien == temp);
                }


            }

            if(hoadonBanHangs.ToList().Count >= 1)
            {
                foreach (var value in hoadonBanHangs)
                {
                    value.thoigian = value.thoigian.Value.AddHours(7);
                }
            }

            //Default View
            ViewBag.nguoiban = new SelectList(db.User.OrderBy(p => p.Name), "UserId", "Name", nguoiban);
            ViewBag.khachhang = new SelectList(db.KhachHang.OrderBy(p => p.ten), "id", "ten", khachhang);

            //Foottable
            sumHoaDonBanHang.tongTongTien = hoadonBanHangs.Sum(p => p.tongTien);
            sumHoaDonBanHang.tongGiamGia = hoadonBanHangs.Sum(p => p.giamgia);
            sumHoaDonBanHang.tongThanhToan = hoadonBanHangs.Sum(p => p.thanhtoan);

            //Model
            model.hoadonBanHangs = hoadonBanHangs;
            model.critHoaDonBanHang = critHoaDonBanHang;
            model.sumHoaDonBanHang = sumHoaDonBanHang;

            //Export
            _hoadonBanHangs = model.hoadonBanHangs.ToList();
            _sumHoaDonBanHang = model.sumHoaDonBanHang;

            return View(model);
        }





        public ActionResult ExportExcel()
        {
            GridView gv = new GridView();



            gv.Caption = "<b style='font-size: 15px;' height = '50'><span style='font-size: 17px;'>KẾT NỐI TRẺ JSC</span> <br>"
                + "Đ/c: Số 75 - Lâm Tường - Tô Hiệu - Lê Chân - Hải Phòng" + "<br>"
                + "SĐT: 0973.xxx.xxx"
                + "</b><br>"
                + "<b style='font-size: 20px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Báo cáo bán hàng</b> <br>";
            gv.CaptionAlign = TableCaptionAlign.Left;

            DataTable dt = new DataTable();

            dt.Columns.Add("STT", typeof(string));
            dt.Columns.Add("ID", typeof(string));
            dt.Columns.Add("Thời gian", typeof(string));
            dt.Columns.Add("Khách hàng", typeof(string));
            dt.Columns.Add("Người bán", typeof(string));
            dt.Columns.Add("Tiền hàng", typeof(string));
            dt.Columns.Add("Giảm giá", typeof(string));
            dt.Columns.Add("Tổng tiền", typeof(string));

            DataRow dtrow = null;

            int count = 0;

            foreach (var item in _hoadonBanHangs.ToList())
            {
                count++;
                dtrow = dt.NewRow();
                dtrow["STT"] = count.ToString();
                dtrow["ID"] = item.id.ToString();
                dtrow["Thời gian"] = (item.thoigian != null) ? string.Format("{0:dd/MM/yyyy}", item.thoigian.Value.AddHours(7)) : "-";
                dtrow["Người bán"] = (item.idNhanVien != null) ? item.User.Name.ToString() : "-";
                dtrow["Khách hàng"] = (item.idKhachHang != null) ? item.KhachHang.ten.ToString() : "-";
                dtrow["Tiền hàng"] = (item.tongTien != null) ? string.Format("{0:N0}", item.tongTien) : "-";
                dtrow["Giảm giá"] = (item.giamgia != null) ? string.Format("{0:N0}", item.giamgia) : "-";
                dtrow["Tổng tiền"] = (item.tongTien != null) ? string.Format("{0:N0}", item.tongTien) : "-";

                dt.Rows.Add(dtrow);
            }

            //Footer
            dtrow = dt.NewRow();
            dtrow["STT"] = "TỔNG";

            dtrow["Tiền hàng"] = string.Format("{0:N0}", _sumHoaDonBanHang.tongTongTien);
            dtrow["Giảm giá"] = string.Format("{0:N0}", _sumHoaDonBanHang.tongGiamGia);
            dtrow["Tổng tiền"] = string.Format("{0:N0}", _sumHoaDonBanHang.tongThanhToan);

            dt.Rows.Add(dtrow);

            gv.DataSource = dt;
            gv.DataBind();

            Response.ClearContent();
            Response.Buffer = true;
            Response.AddHeader("content-disposition", "attachment; filename = Bao cao Ban hang.xls");
            Response.ContentType = "application/ms-excel";
            Response.Charset = "UTF-8";
            Response.ContentEncoding = System.Text.Encoding.UTF8;
            Response.Charset = "";

            using (StringWriter sw = new StringWriter())
            {
                using (HtmlTextWriter htw = new HtmlTextWriter(sw))
                {
                    gv.RenderControl(htw);
                    Response.Output.Write(sw.ToString());
                    Response.Flush();
                    Response.End();
                }
            }


            return RedirectToAction("Index");
        }


    }
}