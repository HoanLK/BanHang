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
    public class ChiTietBanHangAPIController : ApiController
    {
        private BanHangEntities db = new BanHangEntities();

        // GET: api/ChiTietBanHangAPI
        public IQueryable<ChiTietBanHang> GetChiTietBanHang()
        {
            return db.ChiTietBanHang;
        }

        // GET: api/ChiTietBanHangAPI/5
        [ResponseType(typeof(ChiTietBanHang))]
        public async Task<IHttpActionResult> GetChiTietBanHang(int id)
        {
            ChiTietBanHang chiTietBanHang = await db.ChiTietBanHang.FindAsync(id);
            if (chiTietBanHang == null)
            {
                return NotFound();
            }

            return Ok(chiTietBanHang);
        }

        // PUT: api/ChiTietBanHangAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutChiTietBanHang(int id, ChiTietBanHang chiTietBanHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != chiTietBanHang.id)
            {
                return BadRequest();
            }

            db.Entry(chiTietBanHang).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChiTietBanHangExists(id))
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

        // POST: api/ChiTietBanHangAPI
        [ResponseType(typeof(ChiTietBanHang))]
        public async Task<IHttpActionResult> PostChiTietBanHang(ChiTietBanHang chiTietBanHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ChiTietBanHang.Add(chiTietBanHang);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = chiTietBanHang.id }, chiTietBanHang);
        }

        // DELETE: api/ChiTietBanHangAPI/5
        [ResponseType(typeof(ChiTietBanHang))]
        public async Task<IHttpActionResult> DeleteChiTietBanHang(int id)
        {
            ChiTietBanHang chiTietBanHang = await db.ChiTietBanHang.FindAsync(id);
            if (chiTietBanHang == null)
            {
                return NotFound();
            }

            db.ChiTietBanHang.Remove(chiTietBanHang);
            await db.SaveChangesAsync();

            return Ok(chiTietBanHang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ChiTietBanHangExists(int id)
        {
            return db.ChiTietBanHang.Count(e => e.id == id) > 0;
        }
    }
}