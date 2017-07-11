/**
 * Created by ash on 22/05/2017.
 */
import {
  SEARCH_ARTICLE_REQUEST,
  SEARCH_ARTICLE_SUCCESS,
  SEARCH_ARTICLE_FAILURE,
  GET_CHARTER_LIST_REQUEST,
  GET_CHARTER_LIST_SUCCESS,
  GET_CHARTER_LIST_FAILURE,
  GET_CHARTER_CONTENT_REQUEST,
  GET_CHARTER_CONTENT_SUCCESS,
  GET_CHARTER_CONTENT_FAILURE,
  CHANGE_VIEW_TYPE,
  CHANGE_TOOL_SETTING,
  SET_ARTICLE_LINK,
} from 'constants/articleConstants';
import articleApi from 'utils/api/articleApi';

export function searchArticle(searchKey) {
  return {
    types: [
      SEARCH_ARTICLE_REQUEST,
      SEARCH_ARTICLE_SUCCESS,
      SEARCH_ARTICLE_FAILURE,
    ],
    callAPI: () => articleApi.searchArticle(searchKey),
    payload: {},
  };
}

export function getCharterList(link, download = 'no') {
  return {
    types: [
      GET_CHARTER_LIST_REQUEST,
      GET_CHARTER_LIST_SUCCESS,
      GET_CHARTER_LIST_FAILURE,
    ],
    callAPI: () => articleApi.getCharterList(link, download),
    payload: {},
  };
}

export function getArticleContent(link) {
  return {
    types: [
      GET_CHARTER_CONTENT_REQUEST,
      GET_CHARTER_CONTENT_SUCCESS,
      GET_CHARTER_CONTENT_FAILURE,
    ],
    callAPI: () => articleApi.getArticleContent(link),
    payload: {},
  };
}

export function changeViewType(viewType = 'search') {
  return {
    type: CHANGE_VIEW_TYPE,
    viewType,
  };
}

export function changeToolSetting(setting) {
  return {
    type: CHANGE_TOOL_SETTING,
    setting,
  };
}

export function setArticleLink(articleLink) {
  return {
    type: SET_ARTICLE_LINK,
    articleLink,
  };
}
