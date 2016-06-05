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
    public class NhaCungCapAPIController : ApiController
    {
        private BanHangEntities db = new BanHangEntities();

        // GET: api/NhaCungCapAPI
        public IQueryable<NhaCungCap> GetNhaCungCap()
        {
            return db.NhaCungCap;
        }

        // GET: api/NhaCungCapAPI/5
        [ResponseType(typeof(NhaCungCap))]
        public async Task<IHttpActionResult> GetNhaCungCap(int id)
        {
            NhaCungCap nhaCungCap = await db.NhaCungCap.FindAsync(id);
            if (nhaCungCap == null)
            {
                return NotFound();
            }

            return Ok(nhaCungCap);
        }

        // PUT: api/NhaCungCapAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutNhaCungCap(int id, NhaCungCap nhaCungCap)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != nhaCungCap.id)
            {
                return BadRequest();
            }

            db.Entry(nhaCungCap).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NhaCungCapExists(id))
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

        // POST: api/NhaCungCapAPI
        [ResponseType(typeof(NhaCungCap))]
        public async Task<IHttpActionResult> PostNhaCungCap(NhaCungCap nhaCungCap)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.NhaCungCap.Add(nhaCungCap);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = nhaCungCap.id }, nhaCungCap);
        }

        // DELETE: api/NhaCungCapAPI/5
        [ResponseType(typeof(NhaCungCap))]
        public async Task<IHttpActionResult> DeleteNhaCungCap(int id)
        {
            NhaCungCap nhaCungCap = await db.NhaCungCap.FindAsync(id);
            if (nhaCungCap == null)
            {
                return NotFound();
            }

            db.NhaCungCap.Remove(nhaCungCap);
            await db.SaveChangesAsync();

            return Ok(nhaCungCap);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NhaCungCapExists(int id)
        {
            return db.NhaCungCap.Count(e => e.id == id) > 0;
        }
    }
}