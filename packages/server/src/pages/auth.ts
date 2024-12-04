import { css, html } from "@calpoly/mustang/server";
import renderPage from "./renderPage";

export class LoginPage {
    render() {
        return renderPage({
            scripts: [
                `
          import { define, Auth } from "@calpoly/mustang";
          import { LoginForm } from "/scripts/login_form.js";
  
          define({
            "mu-auth": Auth.Provider,
            "login-form": LoginForm
          })
          `
            ],
            styles: [
                css`
                    main.page {
                        --page-grids: 8;
                        @media screen and (max-width: 48rem) {
                            --page-grids: 6;
                        }

                    }
                    article {
                        height: 100vh;
                        display: flex;
                        flex-direction: column;
                    }
                    login-form,
                    registration-form {
                    grid-area: fm;
                    }

                    p.register,
                    p.login {
                    display: block;
                    grid-area: rq;
                    text-align: center;
                    }
                `
            ],
            body: html`
            <mu-auth provides="playpal:auth">
              <article>
                <pp-header></pp-header>
                <main class="page">
                  <login-form api="/auth/login">
                    <h3 slot="title">Sign in and find your gamer gang!</h3>
                  </login-form>
                  <p class="register">
                    Or did you want to
                    <a href="./register">
                      register as a new user
                    </a>
                    ?
                  </p>
                </main>
              </article>
            </mu-auth>
        `
        });
    }
}