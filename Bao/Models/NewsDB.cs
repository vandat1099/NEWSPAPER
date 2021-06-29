using System;
using System.Linq;
using System.Web;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using Bao.Models;
using System.Collections.Generic;

namespace Bao.Models
    {
        public  class NewsDB
        {

           string strcon = "data source= DESKTOP-JFQCD59\\SQLEXPRESS; initial catalog=newspaper;initial catalog=newspaper;integrated security=True;MultipleActiveResultSets=True;";


            public  List<News> ListAll()
            {
                List<News> Lst = new List<News>();
                using (SqlConnection con = new SqlConnection(strcon))
                {
                    con.Open();
                    SqlCommand com = new SqlCommand("Select_News", con);
                    com.CommandType = CommandType.StoredProcedure;
                    SqlDataReader rdr = com.ExecuteReader();
                    while (rdr.Read())
                    {
                        Lst.Add(new News
                        {
                            Id = Convert.ToInt64(rdr["Id"]),
                            Name = rdr["Name"].ToString(),
                            Avartar = rdr["Avartar"].ToString(),
                            Sapo = rdr["Sapo"].ToString(),
                            Description = rdr["Description"].ToString(),
                            Category_Id = Convert.ToInt64(rdr["Category_Id"]),
                            Createdate = Convert.ToDateTime(rdr["Createdate"]),
                            ModifyDate = Convert.ToDateTime(rdr["ModifyDate"]),
                            Active = Convert.ToBoolean(rdr["Active"])
                        });
                    }
                return Lst;
            }
            
        }
       /* public static List<News> GetNews(String search)
        {
            using (SqlConnection con = new SqlConnection(strcon))
            {
                List<News> ListNews = new List<News>();
                connectDb.sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                if (search == null)
                {
                    connectDb.sqlCommand.CommandText = "News_GetAll";
                }
                else
                {
                    connectDb.sqlCommand.CommandText = "News_Search";
                    connectDb.sqlCommand.Parameters.AddWithValue("@Id", null);
                    connectDb.sqlCommand.Parameters.AddWithValue("@Name", search);
                    connectDb.sqlCommand.Parameters.AddWithValue("@Action", null);
                }
                SqlDataReader sqlDataReader = connectDb.sqlCommand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    News news = new News();
                    for (int i = 0; i < sqlDataReader.FieldCount; i++)
                    {
                        var name = sqlDataReader.GetName(i);
                        var value = sqlDataReader.GetValue(i);
                        var property = news.GetType().GetProperty(name);
                        if (property != null && value != DBNull.Value)
                        {
                            property.SetValue(news, value);
                        }
                    }
                    ListNews.Add(news);
                }
                return ListNews;
            }
            return null;
        }
*/
        //thêm data
        public  int Add(News news)
            {
                int i;
                using (SqlConnection con = new SqlConnection(strcon))
                {
                    con.Open();
                    SqlCommand com = new SqlCommand("InsertNews", con);
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.AddWithValue("@Id", news.Id);
                    com.Parameters.AddWithValue("@Name", news.Name);
                    com.Parameters.AddWithValue("@Avartar", news.Avartar);
                    com.Parameters.AddWithValue("@Sapo", news.Sapo);
                    com.Parameters.AddWithValue("@Description", news.Description);
                    com.Parameters.AddWithValue("@Category_Id", news.Category_Id);
                    com.Parameters.Add("@Createdate", news.Createdate).Value = DateTime.Now;
                    com.Parameters.Add("@ModifyDate", news.ModifyDate).Value = DateTime.Now;
                    com.Parameters.AddWithValue("@Active", news.Active);
                    com.Parameters.AddWithValue("@Action", "Insert");

                    i = com.ExecuteNonQuery();
                }
                return i;
            }
            //sửa data|| cập nhật data
            public  int Update(News news)
            {
                int i;
                using (SqlConnection con = new SqlConnection(strcon))
                {
                    con.Open();
                    SqlCommand com = new SqlCommand("InsertNews", con);
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.AddWithValue("@Id", news.Id);
                    com.Parameters.AddWithValue("@Name", news.Name);
                    com.Parameters.AddWithValue("@Avartar", news.Avartar);
                    com.Parameters.AddWithValue("@Sapo", news.Sapo);
                    com.Parameters.AddWithValue("@Description", news.Description);
                    com.Parameters.AddWithValue("@Category_Id", news.Category_Id);
                    com.Parameters.Add("@Createdate", news.Createdate).Value = DateTime.Now.ToString();
                    com.Parameters.Add("@ModifyDate", news.ModifyDate).Value = DateTime.Now.ToString();
                    com.Parameters.AddWithValue("@Active", news.Active);
                    com.Parameters.AddWithValue("@Action", "Update");

                    i = com.ExecuteNonQuery();
                }
                return i;
            }
            public  int Delete(int Id)
            {
                int i;
                using (SqlConnection con = new SqlConnection(strcon))
                {
                    con.Open();
                    SqlCommand com = new SqlCommand("DeleteNews", con);
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.AddWithValue("@Id", Id);
                    i = com.ExecuteNonQuery();
                }
                return i;
            }
        }
    }