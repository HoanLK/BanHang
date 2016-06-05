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
    public class HangHoaController : Controller
    {
        private BanHangEntities db = new BanHangEntities();

        public JsonResult GetByMaVach(string mavach)
        {
            db.Configuration.AutoDetectChangesEnabled = false;
            db.Configuration.LazyLoadingEnabled = false;
            db.Configuration.ProxyCreationEnabled = false;

            var model = db.HangHoa.Where(p => p.mavach == mavach).FirstOrDefault();

            return Json(model, JsonRequestBehavior.AllowGet);

        }
    }
}