let optionsButtons = document.querySelectorAll(".option-button");

function btnLoginClick(){
    /**
     * call API for validation 
     * set session
     */
    body.innerHTML = dashBoardDynamic();
}

function btnCreateClick(){
    body.innerHTML = createPost;
}

function btnSaveClick(){
    body.innerHTML = dashBoardDynamic();
}

function btnEditClick(){
    /**
     * populate all the field of the regarding post
     * pass id of the post as argument
     */
    body.innerHTML = createPost;
}

function btnDeleteClick(){
    /**
     * delete the item and refresh the page (fetch new data)
     */
}

function btnLogOutClick(){
    sessionStorage.clear();
    body.innerHTML = loginPage;
}

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

const body = document.body;

const loginPage = `
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
            <button id="btnLogin" onclick="btnLoginClick()" type="submit" style="margin: 1%">Login</button>
        </div>
    </form>
</div>
`;

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
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button type="submit">Sign Up</button>
        </div>
    </form>
</div>
`;

const dashBoardDynamic = () => {
    let postList = ``;

    for (var i = 0; i < 3; i++) {
        postList += `
        <ls id="postID${i}">
            <div style="display: flex; align-items: center; border: 1px solid white; padding: 2%; margin:2%">
                <div style="flex-grow: 1;">
                    <p>Title ${i} (1 Jan 2022)</p>
                </div>
                <div>
                    <button id="btn${i}" type="submit" onClick="btnEditClick()">edit</button>
                    <button id="btn${i}" type="submit" onClick="btnDeleteClick()">delete</button>
                </div>
            </div>
        </ls>
        `;
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

const createPost = `
<div
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
            <button id="italic" class="option-button format">
                Italic
            </button>
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

body.innerHTML = loginPage;
