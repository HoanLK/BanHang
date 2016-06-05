using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BanHang.Models;

namespace BanHang.Controllers
{
    [Authorize]
    public class HoaDonBanHangController : Controller
    {
       private BanHangEntities db = new BanHangEntities();


        // GET: HoaDonBanHang
        public ActionResult Index()
        {
            return View();
        }

        //GetChuaThanhToan
        public JsonResult GetChuaThanhToan()
        {
            db.Configuration.AutoDetectChangesEnabled = false;
            db.Configuration.LazyLoadingEnabled = false;
            db.Configuration.ProxyCreationEnabled = false;

            var model = db.HoaDonBanHang.Where(p => p.daThanhToan == 0);

            return Json(model, JsonRequestBehavior.AllowGet);
        }

    }
}