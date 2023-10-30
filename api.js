import { fetchComments } from "./fetchComments.js";
import { renderComments } from "./renderComments.js";
import { renderLogin } from "./renderLogin.js";
import { sanitizeHtml } from "./sanitizeHtml.js";
import { comments } from "./fetchComments.js";

const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");

export let token;
export const setToken = (newtoken) => {
  token = newtoken;
}

export function getComments() {
  return fetch("https://wedev-api.sky.pro/api/v2/elena-vakulenko/comments", {
    method: "GET",
    headers: {
      Autorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        token = prompt('Введите верный пароль');
        getComments();
        throw new Error('Вы не авторизованы');
      }
      return response.json();
    })
}
// renderLogin({ fetchComments });
// fetchComments();

export function postComment({ comm }) {
  renderComments({ comments, fetchComments });
    return fetch("https://wedev-api.sky.pro/api/v2/elena-vakulenko/comments", {
    method: "POST",
    body: JSON.stringify({
      text: sanitizeHtml(comm),
      // name: sanitizeHtml(nameInputElement.value),
      // forceError: true,
    }),
    headers: {
      Autorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log(response);
      if (response.status === 500) {
        throw new Error('Сервер сломался, попробуй позже');
      } if (response.status === 400) {
        throw new Error('Имя и комментарий должны быть не короче 3 символов');
      } else {
        return response.json();
      }
    })
}

export function login({ login, password }) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    console.log(response);
    if (response.status === 500) {
      throw new Error('Сервер сломался, попробуй позже');
    } if (response.status === 400) {
      throw new Error('Логин и пароль должны быть не короче 3 символов');
    } else {
      return response.json();
    }
    return response.json();
  })
}