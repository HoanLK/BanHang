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
    public class KhachHangAPIController : ApiController
    {
        private BanHangEntities db = new BanHangEntities();

        // GET: api/KhachHangAPI
        public IQueryable<KhachHang> GetKhachHang()
        {
            return db.KhachHang;
        }

        // GET: api/KhachHangAPI/5
        [ResponseType(typeof(KhachHang))]
        public async Task<IHttpActionResult> GetKhachHang(int id)
        {
            KhachHang khachHang = await db.KhachHang.FindAsync(id);
            if (khachHang == null)
            {
                return NotFound();
            }

            return Ok(khachHang);
        }

        // PUT: api/KhachHangAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutKhachHang(int id, KhachHang khachHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != khachHang.id)
            {
                return BadRequest();
            }

            db.Entry(khachHang).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KhachHangExists(id))
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

        // POST: api/KhachHangAPI
        [ResponseType(typeof(KhachHang))]
        public async Task<IHttpActionResult> PostKhachHang(KhachHang khachHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.KhachHang.Add(khachHang);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = khachHang.id }, khachHang);
        }

        // DELETE: api/KhachHangAPI/5
        [ResponseType(typeof(KhachHang))]
        public async Task<IHttpActionResult> DeleteKhachHang(int id)
        {
            KhachHang khachHang = await db.KhachHang.FindAsync(id);
            if (khachHang == null)
            {
                return NotFound();
            }

            db.KhachHang.Remove(khachHang);
            await db.SaveChangesAsync();

            return Ok(khachHang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KhachHangExists(int id)
        {
            return db.KhachHang.Count(e => e.id == id) > 0;
        }
    }
}