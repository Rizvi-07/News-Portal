export default function loginPage() {
    return (
        `<div
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
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>`
    );
}
