'use strict';
const fs = require('node:fs');
const Cookies = require('cookies');
const { currentThemeKey } = require('../config');
const results = ['大吉', '中吉', '吉', '小吉', '末吉'];
var random = Math.floor( Math.random() * results.length );
const items = ['鏡', 'お米', '写真', 'イチョウ', '眼鏡', '甘酒', '手紙', '大福'];
var random = Math.floor( Math.random() * items.length );
const omikuzi = results[random];
const happy = items[random];

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
  res.writeHead(401, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.end(
    `<!DOCTYPE html><html lang="ja">
      <body>
        <h1>おみくじの結果は${omikuzi}で、運気アップのアイテムは${happy}です</h1>
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
  handleNotFound,
  handleBadRequest,
};