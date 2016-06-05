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
    public class ChiTietNhapHangAPIController : ApiController
    {
        private BanHangEntities db = new BanHangEntities();

        // GET: api/ChiTietNhapHangAPI
        public IQueryable<ChiTietNhapHang> GetChiTietNhapHang()
        {
            return db.ChiTietNhapHang;
        }

        // GET: api/ChiTietNhapHangAPI/5
        [ResponseType(typeof(ChiTietNhapHang))]
        public async Task<IHttpActionResult> GetChiTietNhapHang(int id)
        {
            ChiTietNhapHang chiTietNhapHang = await db.ChiTietNhapHang.FindAsync(id);
            if (chiTietNhapHang == null)
            {
                return NotFound();
            }

            return Ok(chiTietNhapHang);
        }

        // PUT: api/ChiTietNhapHangAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutChiTietNhapHang(int id, ChiTietNhapHang chiTietNhapHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != chiTietNhapHang.id)
            {
                return BadRequest();
            }

            db.Entry(chiTietNhapHang).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChiTietNhapHangExists(id))
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

        // POST: api/ChiTietNhapHangAPI
        [ResponseType(typeof(ChiTietNhapHang))]
        public async Task<IHttpActionResult> PostChiTietNhapHang(ChiTietNhapHang chiTietNhapHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ChiTietNhapHang.Add(chiTietNhapHang);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = chiTietNhapHang.id }, chiTietNhapHang);
        }

        // DELETE: api/ChiTietNhapHangAPI/5
        [ResponseType(typeof(ChiTietNhapHang))]
        public async Task<IHttpActionResult> DeleteChiTietNhapHang(int id)
        {
            ChiTietNhapHang chiTietNhapHang = await db.ChiTietNhapHang.FindAsync(id);
            if (chiTietNhapHang == null)
            {
                return NotFound();
            }

            db.ChiTietNhapHang.Remove(chiTietNhapHang);
            await db.SaveChangesAsync();

            return Ok(chiTietNhapHang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ChiTietNhapHangExists(int id)
        {
            return db.ChiTietNhapHang.Count(e => e.id == id) > 0;
        }
    }
}