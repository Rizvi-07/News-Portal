var config = require('./dbconfig');
const sql = require('mssql');

async function getUsers() {
    try {
        let tc = await sql.connect(config);
        let userList = await tc.request().query("SELECT * from users");
        return userList.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getUserbyLoginID(loginid) {
    try {
        let tc = await sql.connect(config);
        let userList = await tc.request()
        .input('loginid', sql.VarChar, loginid)
        .query("SELECT * from users WHERE loginid=@loginid");
        return userList.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getPosts(userid) {
    try {
        let tc = await sql.connect(config);
        let postList = await tc.request()
            .input('input_parameter', sql.Int, userid)
            .query("SELECT * from posts where USERSID = @input_parameter");
        return postList.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getPost(postid){
    try {
        let tc = await sql.connect(config);
        let postList = await tc.request()
            .input('input_parameter', sql.Int, postid)
            .query("SELECT * from posts where postid = @input_parameter");
        return postList.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function deletePost(postid){
    try {
        let tc = await sql.connect(config);
        let postList = await tc.request()
            .input('input_parameter', sql.Int, postid)
            .query("DELETE from posts where postid = @input_parameter");
        return postList.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function saveUser(users) {
    try {
        let tc = await sql.connect(config);
        let insertUser = await tc.request()
            .input('loginid', sql.VarChar, users.loginid)
            .input('authorname', sql.VarChar, users.authorname)
            .input('password', sql.VarChar, users.password)
            .input('type', sql.Int, users.type)
            .execute('INSERT INTO POSTS (AUTHORNAME,LOGINID,PASSWORD,TYPE,AUHTORNAME) VALUES(@loginid,@password,@type,@authorname)');
        return insertUser.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function savePost(posts, userid) {
    try {
        let tc = await sql.connect(config);
        let insertPost = await tc.request()
            .input('posttitle', sql.VarChar, posts.posttitle)
            .input('description', sql.VarChar, posts.description)
            .input('creationDate', sql.DateTime, posts.creationDate)
            .input('userid', sql.Int, userid)
            .query('INSERT INTO POSTS (CREATIONDATE,POSTTITLE,DESCRIPTION,USERSID) VALUES(@creationDate,@title,@description,@userid)');
        return insertPost.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function updatePost(posts, userid) {
    try {
        let tc = await sql.connect(config);
        let updatePost = await tc.request()
            .input('title', sql.VarChar, posts.posttitle)
            .input('description', sql.VarChar, posts.description)
            .input('creationDate', sql.DateTime, posts.creationDate)
            .input('userid', sql.Int, userid)
            .query('update posts set title = @title, description = @description, creationDate = @creationDate, userid = @userid WHERE postid=@postid');
        return updatePost.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    saveUser: saveUser,
    getUsers : getUsers,
    getPosts : getPosts,
    savePost : savePost,
    updatePost : updatePost,
    getPost : getPost,
    getUserbyLoginID : getUserbyLoginID,
    deletePost : deletePost
}