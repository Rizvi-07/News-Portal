var optionsButtons = document.querySelectorAll(".option-button");
const basePath = "http://127.0.0.1:5000/api/";

function btnLoginClick() {
    if (
        sessionStorage.getItem("USERID") != undefined &&
        sessionStorage.getItem("USERID") != null
    ) {
        body.innerHTML = dashBoardDynamic();
    }
    let loginId = document.getElementById("txtUserName").value;
    let pass = document.getElementById("txtPass").value;

    fetch(basePath + "getUserbyLoginID/" + loginId, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data == undefined || data == null) {
                alert("Please Signup First");
            }
            if (data[0].PASSWORD == pass) {
                sessionStorage.setItem("USERSID", data[0].USERSID);
                localStorage.setItem("USERSID", JSON.stringify(sessionStorage.getItem("USERSID")));
                body.innerHTML = dashBoardDynamic();
            } else {
                alert("invalid userid / password");
            }
        })
        .catch((err) => alert(err));
}

function btnCreateClick() {
    body.innerHTML = createPost();
    optionsButtons = document.querySelectorAll(".option-button");
}

function btnSaveClick() {
    body.innerHTML = dashBoardDynamic();
}

function btnEditClick() {
    /**
     * populate all the field of the regarding post
     * pass id of the post as argument
     */
    body.innerHTML = createPost;
}

function btnDeleteClick() {
    /**
     * delete the item and refresh the page (fetch new data)
     */
}

function btnLogOutClick() {
    sessionStorage.clear();
    body.innerHTML = loginPage;
}

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

// optionsButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//         modifyText(button.id, false, null);
//     });
// });

const body = document.body;

const loginPage = () => {
    if (
        sessionStorage.getItem("USERID") != undefined &&
        sessionStorage.getItem("USERID") != null
    ) {
        return dashBoardDynamic();
    }

    return `
    <div
        style="
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            height: 100%;
        "
    >
        <form id="login-form" action="" method="post" style="width: 60%">
            <div
                style="
                    display: flex;
                    flex-flow: column;
                    justify-content: center;
                "
            >
                <input id="txtUserName" type="text" placeholder="Username" required style="margin: 1%; min-height: 2.5em; padding: 2%"/>
                <input id="txtPass" type="password" placeholder="Password" required style="margin: 1%; min-height: 2.5em; padding: 2%"/>
                <button id="btnLogin" onclick="btnLoginClick()" type="button" style="margin: 1%">Login</button>
            </div>
        </form>
    </div>
    `;
};

const signUpPage = `
<div
    style="
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    "
>
    <form id="login-form" action="" method="post">
        <div
            style="
                display: flex;
                flex-flow: column;
                justify-content: center;
            "
        >
            <input type="text" placeholder="Username" required />
            <input type="text" placeholder="User id" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button type="submit">Sign Up</button>
        </div>
    </form>
</div>
`;

var fetchPost = async (userid) => {
    await fetch(basePath + "getPosts/" + userid, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem("POSTS", JSON.stringify(data));
        })
        .catch((err) => alert(err));
};

const dashBoardDynamic = () => {
    let userid = sessionStorage.getItem("USERSID");
    var temp = fetchPost(userid);
    var tempPost;
    var postList = ``;

    tempPost = JSON.parse(localStorage.getItem("POSTS"));

    if (tempPost != undefined) {
        tempPost.forEach((item) => {
            postList += `
            <ls id="postID_${item.POSTID}">
                <div style="display: flex; align-items: center; border: 1px solid white; padding: 2%; margin:2%">
                    <div style="flex-grow: 1;">
                        <p>Title ${item.POSTTITLE}</p>
                        <p>(${new Date(item.CREATIONDATE).toDateString()})</p>
                    </div>
                    <div>
                        <button id="btn_${
                            item.POSTID
                        }" type="submit" onClick="btnEditClick()">edit</button>
                        <button id="btn_${
                            item.POSTID
                        }" type="submit" onClick="btnDeleteClick()">delete</button>
                    </div>
                </div>
            </ls>
            `;
        });
    }

    let str = `
        <div>
            <div style="display: flex; align-items: center; justify-content: flex-end; background-color: rgb(35, 41, 41); height: 5%; padding: 2%;">
                <div>
                    <a href="#" style="color: whitesmoke;" onClick="btnLogOutClick()"> Log Out </a>
                </div>
            </div>
            <div style="padding: 2%; background-color: #ededed;">
                <div style="display: flex; justify-content: flex-end; margin: 2%">
                    <button type="submit" onClick="btnCreateClick()">Create</button>
                </div>
                <hr>
                <ul style="margin:0; padding:0">
                    ${postList}
                </ul>
            </div>
        </div>`;

    return str;
};

optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

const createPost = () => {
    return `<div
        style="
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            padding: 2%;
        "
    >
        <div class="container">
            <input
                type="text"
                placeholder="Title"
                required
                style="
                    width: 100%;
                    border-radius: 5px;
                    border: 1px solid #dddddd;
                    min-height: 50px;
                    padding: 2%;
                    margin-top: 2%;
                    margin-bottom: 2%;
                "
            />
            <div class="options">
                <button id="bold" class="option-button format">Bold</button>
                <button id="italic" class="option-button format">Italic</button>
            </div>
            <div id="text-input" contenteditable="true"></div>
            <form id="post-form" action="" method="post" style="width: 100%">
                <div
                    style="
                        margin-top: 2%;
                        display: flex;
                        justify-content: flex-end;
                    "
                >
                    <button type="submit" onClick="btnSaveClick()">Save</button>
                </div>
            </form>
        </div>
    </div>
    `;
}
body.innerHTML = loginPage();
