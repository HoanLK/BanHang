using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using BanHang.Models;

namespace BanHang.API
{
    public class HoaDonBanHangAPIController : ApiController
    {
        private BanHangEntities db = new BanHangEntities();

        // GET: api/HoaDonBanHangAPI
        public IQueryable<HoaDonBanHang> GetHoaDonBanHang()
        {
            return db.HoaDonBanHang;
        }

        // GET: api/HoaDonBanHangAPI/5
        [ResponseType(typeof(HoaDonBanHang))]
        public async Task<IHttpActionResult> GetHoaDonBanHang(int id)
        {
            HoaDonBanHang hoaDonBanHang = await db.HoaDonBanHang.FindAsync(id);
            if (hoaDonBanHang == null)
            {
                return NotFound();
            }

            return Ok(hoaDonBanHang);
        }

        // PUT: api/HoaDonBanHangAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutHoaDonBanHang(int id, HoaDonBanHang hoaDonBanHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hoaDonBanHang.id)
            {
                return BadRequest();
            }

            db.Entry(hoaDonBanHang).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HoaDonBanHangExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/HoaDonBanHangAPI
        [ResponseType(typeof(HoaDonBanHang))]
        public async Task<IHttpActionResult> PostHoaDonBanHang(HoaDonBanHang hoaDonBanHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.HoaDonBanHang.Add(hoaDonBanHang);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = hoaDonBanHang.id }, hoaDonBanHang);
        }

        // DELETE: api/HoaDonBanHangAPI/5
        [ResponseType(typeof(HoaDonBanHang))]
        public async Task<IHttpActionResult> DeleteHoaDonBanHang(int id)
        {
            HoaDonBanHang hoaDonBanHang = await db.HoaDonBanHang.FindAsync(id);
            if (hoaDonBanHang == null)
            {
                return NotFound();
            }

            db.HoaDonBanHang.Remove(hoaDonBanHang);
            await db.SaveChangesAsync();

            return Ok(hoaDonBanHang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HoaDonBanHangExists(int id)
        {
            return db.HoaDonBanHang.Count(e => e.id == id) > 0;
        }
    }
}