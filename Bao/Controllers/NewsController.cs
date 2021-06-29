using Bao.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Bao.Controllers
{
    public class NewsController : Controller
    {
        NewsDB newsDB = new NewsDB();
        // GET: Category
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(newsDB.ListAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(News news)
        {
            return Json(newsDB.Add(news), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyId(int ID)
        {
            var News = newsDB.ListAll().Find(x => x.Id.Equals(ID));
            return Json(News, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(News news)
        {
            return Json(News.Update(news), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult Delete(int Id)
        {
            newsDB.Delete(Id);
            return RedirectToAction("Index");

        }
    }
}