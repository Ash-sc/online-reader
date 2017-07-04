/**
 * Created by ash on 22/05/2017.
 */
import Api from './api';
// import utils from '../utils';

export default class ArticleApi {
  // 搜索小说
  static searchArticle(searchKey) {
    // utils.filterEmptyJsonValues(obj);
    // const queryString = utils.jsonToQueryString(obj);
    return Api.get(`/article/searchArticle?searchKey=${searchKey}`);
  }

  // 获取章节列表或同时下载
  static getCharterList(link, download) {
    return Api.get(`/article/getCharterList?link=${link}&download=${download}`);
  }

  // 获取章节内容
  static getArticleContent(link) {
    return Api.get(`/article/getCharterContent?link=${link}`);
  }
}
