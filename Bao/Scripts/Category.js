/// <reference path="jquery-3.4.1.intellisense.js" />
//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
});
function to_slug(str) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
}
//Load data in function
function loadData() {
    $("#Id").hide();
    $.ajax({
        url: "/Category/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Slug + '</td>';
                html += '<td>' + item.ParentId + '</td>';
                html += '<td>' + item.Createdate + '</td>';
                html += '<td>' + item.Active + '</td>';
                html += '<td><a href = "#" onclick = "return getbyId(' + item.Id + ')">Edit</a>|<a href="Category/Delete?Id=' + item.Id + '">Delete</a></td >';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function

function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var cateObj = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        Slug: $('#Slug').val(),
        ParentId: $('#ParentId').val(),
        Active: $('#Active').val(),
        Createdate: $('#Createdate').val()
    };
    $.ajax({
        url: "/Category/Add",
        data: JSON.stringify(cateObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Id
function getbyId(cateId) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Slug').css('border-color', 'lightgrey');
    $('#ParentId').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');
    $('#Createdate').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Category/getbyId/" + cateId,
        type: "GET",
        contentType: "application/json;chaset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Slug').val(result.Slug);
            $('#ParentId').val(result.ParentId);
            $('#Active').val(result.Active);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}


//function for editting category's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var cateObj = {
        Name: $('#Name').val(),
        Slug: $('#Slug').val(),
        ParentId: $('#ParentId').val(),
        Active: $('#Active').val(),
        Createdate: $('#Createdate').val()
    };
    $.ajax({
        url: "/Category/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModel').modal('hiden');
            $('#Name').val("");
            $('#Slug').val("");
            $('#ParentId').val("");
            $('#Active').val("");
            $('#Cretedate').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting category's record
function Delete(Id) {
    debugger
    var ans = confirm("bạn thật sự muốn xóa danh mục này?");
    if (ans) {
        $.ajax({
            url: "/Category/Delete",
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: {
                Id:Id
            },
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function clearTextBox() {
    $('#Id').val("");
    $('#Name').val("");
    $('#Slug').val("");
    $('#ParentId').val("");
    $('#Active').val("");
    $('#Createdate').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Slug').css('border-color', 'lightgrey');
    $('#ParentId').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');
    $('#Createdate').css('border-color', 'lightgrey');
}

//Validation using jquery
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#Slug').val().trim() == "") {
        $('#Slug').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Slug').css('border-color', 'lightgrey');
    }
    if ($('#ParentId').val().trim() == "") {
        $('#ParentId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ParentId').css('border-color', 'lightgrey');
    }
    if ($('#Active').is('checked')) {
        $('#Active').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Active').css('border-color', 'lightgrey');
    }
    if ($('#Createdate').val().trim() == "") {
        $('#Createdate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Createdate').css('border-color', 'lightgrey');
    }
    return isValid;
}