/**
 * Created by ash on 22/05/2017.
 */
const express = require('express');
const router = express.Router();
const SimpleNodeLogger = require('simple-node-logger');
const moment = require('moment');
const cheerio = require('cheerio');
const charset = require('superagent-charset');
const request = require('superagent');
const fs = require('fs');
const urlencode = require('urlencode');

charset(request);
const opts = {
  logFilePath: `logs/article-log-${moment().format('YYYY-MM-DD')}.log`,
  timestampFormat:'YYYY-MM-DD HH:mm:ss'
};
const log = SimpleNodeLogger.createSimpleLogger(opts);

// 获取小说内容并打包成txt文件
const getContent = (index, charterList, articleUrl, articleName) => {
  log.info(`get charter ${charterList[index].title} content ...`);
  request.get(articleUrl + charterList[index].href)
    .charset('gbk')
    .end((error, resp) => {
      if (error) {
        log.error(`get charter ${charterList[index].title} error : `, error);
      } else {
        log.info(`get charter ${charterList[index].title} success !`);
        const $ = cheerio.load(resp.text);
        const content = charterList[index].title + '\n' + unescape($($('#BookText')[0]).html()
            .replace(/&#x/g,'%u')
            .replace(/;/g,'')
            .replace(/%uA0/g,' ')
            .replace(/&apos/g,'')
            .replace(/<br>/g, '\n'))
            .replace(/%[0-9a-zA-Z]+/g, ''); // 内容处理
        fs.appendFile(`${__dirname}/${articleName}.txt`, content, () => {
          log.info(`write charter ${charterList[index].title} success !`);
          if (index < charterList.length - 1) {
            getContent(index + 1, charterList, articleUrl, articleName);
          }
        });
      }
    })
};

// 搜索文章
router.get('/searchArticle', (req, res) => {
  request.get(`http://www.snwx8.com/modules/article/search.php?searchkey=${urlencode(req.query.searchKey, 'gbk')}`)
    .charset('gbk')
    .end((error, resp) => {
      if (error) {
        log.error('search error : ', error);
        res.status(200);
        res.send({
          result: 1,
          error,
        });
      } else {
        const $ = cheerio.load(resp.text);
        const item = [];
        $('#newscontent .l ul li').each((idx, element) => {
          const $element = $(element);
          item.push({
            classify: $element.find('.s1').text().replace(/小说|\[|]/g, ''),
            articleName: $element.find('.s2 a').text(),
            articleLink: $element.find('.s2 a').attr('href'),
            latestCharterName: $element.find('.s3 a').text(),
            latestCharterLink: $element.find('.s3 a').attr('href'),
            authorName: $element.find('.s4 a').text(),
            authorLink: $element.find('.s4 a').attr('href'),
            updateTime: $element.find('.s5').text(),
          });
        });
        res.status(200);
        res.send({
          result: 0,
          content: item,
        });
      }
    });
});

// 获取章节列表
router.get('/getCharterList', (req, res) => {
  // 获取章节列表
  try {
    const articleUrl = req.query.link;
    log.info('get charter list ...');
    request.get(articleUrl)
      .charset('gbk')
      .end((error, resp) => {
        if (error) {
          log.error('get charter list error : ', error);
          res.status(200);
          res.send({
            result: 1,
            error,
          });
        } else {
          const $ = cheerio.load(resp.text);
          const item = []; //章节信息列表
          const articleName = $($('.infotitle h1')[0]).text();
          $('#list dl dd a').each(function (idx, element) {
            const $element = $(element);
            item.push({
              title: $element.attr('title'),
              href: $element.attr('href')
            });
          });
          log.info('get charter list success !');
          if (req.query.download === 'yes') {
            log.info('start downloading article ...');
            getContent(0, item, articleUrl, articleName);
          }
          res.status(200);
          res.send({
            result: 0,
            content: item,
            name: articleName,
          });
        }
      });
  } catch (err) {
    log.error('interface error : ', err);
  }
});

router.get('/getCharterContent', (req, res) => {
  try {
    // 获取章节内容列表
    const articleUrl = req.query.link;
    log.info('get charter content ...');
    request.get(articleUrl)
      .charset('gbk')
      .end((error, resp) => {
        if (error) {
          log.error('get charter content error : ', error);
          res.status(200);
          res.send({
            result: 1,
            error,
          });
        } else {
          log.info(`get charter content success !`);
          const $ = cheerio.load(resp.text);
          const content = unescape($($('#BookText')[0]).html()
              .replace(/&#x/g,'%u')
              .replace(/;/g,'')
              .replace(/%uA0/g,' ')
              .replace(/&apos/g,''))
              .replace(/%[0-9a-zA-Z]+/g, ''); // 内容处理
          res.status(200);
          res.send({
            result: 0,
            content,
          });
        }
      });
  } catch (err) {
    log.error('catch get charter content error : ', err);
  }
});

module.exports = router;
