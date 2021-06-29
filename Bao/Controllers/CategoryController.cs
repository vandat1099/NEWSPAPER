using Bao.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Bao.Controllers
{
    public class CategoryController : Controller
    {
        CategoryDB cateDB = new CategoryDB();
        // GET: Category
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(cateDB.ListAll(), JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult Add(Category cate)
        {
            return Json(cateDB.Add(cate), JsonRequestBehavior.AllowGet);
        }
       
        public JsonResult GetbyId(int ID)
        {
            var Category = cateDB.ListAll().Find(x => x.Id.Equals(ID));
            return Json(Category, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Category cate)
        {
            return Json(cateDB.Update(cate), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult Delete(int Id)
        {
            cateDB.Delete(Id);
            return RedirectToAction("Index");

        }
    }
}