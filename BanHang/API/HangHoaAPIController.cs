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
    public class HangHoaAPIController : ApiController
    {
        private BanHangEntities db = new BanHangEntities();

        // GET: api/HangHoaAPI
        public IQueryable<HangHoa> GetHangHoa()
        {
            return db.HangHoa.Where(p => p.ngungKinhDoanh != true);
        }

        // GET: api/HangHoaAPI/5
        [ResponseType(typeof(HangHoa))]
        public async Task<IHttpActionResult> GetHangHoa(int id)
        {
            HangHoa hangHoa = await db.HangHoa.FindAsync(id);
            if (hangHoa == null)
            {
                return NotFound();
            }

            return Ok(hangHoa);
        }

        // PUT: api/HangHoaAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutHangHoa(int id, HangHoa hangHoa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hangHoa.id)
            {
                return BadRequest();
            }

            db.Entry(hangHoa).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HangHoaExists(id))
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

        // POST: api/HangHoaAPI
        [ResponseType(typeof(HangHoa))]
        public async Task<IHttpActionResult> PostHangHoa(HangHoa hangHoa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.HangHoa.Add(hangHoa);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = hangHoa.id }, hangHoa);
        }

        // DELETE: api/HangHoaAPI/5
        [ResponseType(typeof(HangHoa))]
        public async Task<IHttpActionResult> DeleteHangHoa(int id)
        {
            HangHoa hangHoa = await db.HangHoa.FindAsync(id);
            if (hangHoa == null)
            {
                return NotFound();
            }

            db.HangHoa.Remove(hangHoa);
            await db.SaveChangesAsync();

            return Ok(hangHoa);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HangHoaExists(int id)
        {
            return db.HangHoa.Count(e => e.id == id) > 0;
        }
    }
}