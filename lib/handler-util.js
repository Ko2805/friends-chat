'use strict';
const fs = require('node:fs');
const Cookies = require('cookies');
const { currentThemeKey } = require('../config');
const results = ['大吉', '中吉', '吉', '小吉', '末吉'];
const items = ['鏡', 'お米', '写真', 'イチョウ', '招き猫', '甘酒', '手紙', '大福'];

function handleLogout(req, res) {
  res.writeHead(401, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.end(
    `<!DOCTYPE html><html lang="ja">
      <body>
        <h1>ログアウトしました</h1>
        <a href="/posts">ログイン</a>
      <body>
    </html>`
  );
}

function handleOmikuzi(req, res) {
  let random1 = Math.floor(Math.random() * results.length);
  let random2 = Math.floor(Math.random() * items.length);
  let omikuzi = results[random1];
  let happy = items[random2];
  
  res.writeHead(401, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.end(
    `<!DOCTYPE html><html lang="ja">
      <body>
        <h1>おみくじの結果は${omikuzi}で、運気アップのアイテムは${happy}です</h1>
        <a href="/omikuzi">おみくじを引きなおす</a>
        <a href="/posts">ログイン</a>
        <a href="/logout">ログアウト</a>
      <body>
    </html>`
  );
}

function handleChangeTheme(req, res) {
  const cookies = new Cookies(req, res);
  const currentTheme = (cookies.get(currentThemeKey) !== 'light' ? 'light' : 'dark');
  cookies.set(currentThemeKey, currentTheme);
  res.writeHead(303, {
    'Location': '/posts'
  });
  res.end();
}

function handleFavicon(req, res) {
  res.writeHead(200, {
    'Content-Type': 'image/vnd.microsoft.icon',
    'Cache-Control': 'public, max-age=604800'
  });
  const favicon = fs.readFileSync('./favicon.ico');
  res.end(favicon);
}

function handleStyleCssFile(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/css',
  });
  const file = fs.readFileSync('./public/style.css');
  res.end(file);
}

function handleFnChatJsFile(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/javascript',
  });
  const file = fs.readFileSync('./public/friends-chat.js');
  res.end(file);
}

function handleTopPage(req, res) {
  res.writeHead(404, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.write('<h1>みんなのチャットの入口</h1>');
  res.write('<p><a href="/posts">NNチャット</a></p>');
  res.write('<p><a href="/logout">ログアウト</a></p>');
  res.end();
}

function handleNotFound(req, res) {
  res.writeHead(404, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.write('<p>ページが見つかりません</p>');
  res.write('<p><a href="/posts">みんなのチャット</a>');
  res.end();
}

function handleBadRequest(req, res) {
  res.writeHead(400, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end('未対応のリクエストです');
}

module.exports = {
  handleLogout,
  handleOmikuzi,
  handleChangeTheme,
  handleFavicon,
  handleStyleCssFile,
  handleFnChatJsFile,
  handleTopPage,
  handleNotFound,
  handleBadRequest,
};
