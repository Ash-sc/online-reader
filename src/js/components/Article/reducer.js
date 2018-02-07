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
  SET_CHARTER_LINK,
} from 'constants/articleConstants';

// Initial state
export const initialState = {
  status: 'ok',
  contentList: JSON.parse(sessionStorage.contentList || '[]'),
  charterList: JSON.parse(sessionStorage.charterList || '[]'),
  articleLink: sessionStorage.articleLink || '', // 小说主页链接
  charterLink: sessionStorage.charterLink || '', // 当前章节链接
  articleContent: sessionStorage.articleContent || '', // 小说内容
  viewType: sessionStorage.viewType || 'search', // 视图类型
  toolSetting: sessionStorage.toolSetting ? JSON.parse(sessionStorage.toolSetting) : { // 小工具设置
    bgColor: '#eef8fd',
    fullScreen: false,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ARTICLE_REQUEST: {
      return { ...state, ...{ status: action.status } };
    }
    case SEARCH_ARTICLE_SUCCESS: {
      sessionStorage.contentList = JSON.stringify(action.data.content);
      return { ...state, ...{ status: action.status, contentList: action.data.content } };
    }
    case SEARCH_ARTICLE_FAILURE: {
      sessionStorage.contentList = '[]';
      return { ...state, ...{ status: action.status, contentList: [] } };
    }
    case GET_CHARTER_LIST_REQUEST:
    case GET_CHARTER_LIST_FAILURE: {
      sessionStorage.charterList = '[]';
      return { ...state, ...{ status: action.status, charterList: [] } };
    }
    case GET_CHARTER_LIST_SUCCESS: {
      sessionStorage.charterList = JSON.stringify(action.data.content);
      return { ...state, ...{ status: action.status, charterList: action.data.content } };
    }
    case GET_CHARTER_CONTENT_REQUEST:
    case GET_CHARTER_CONTENT_FAILURE: {
      sessionStorage.articleContent = '';
      return { ...state, ...{ status: action.status, articleContent: '' } };
    }
    case GET_CHARTER_CONTENT_SUCCESS: {
      sessionStorage.articleContent = action.data.content;
      return { ...state, ...{ status: action.status, articleContent: action.data.content } };
    }
    case CHANGE_VIEW_TYPE: {
      sessionStorage.viewType = action.viewType;
      return { ...state, ...{ viewType: action.viewType } };
    }
    case CHANGE_TOOL_SETTING: {
      sessionStorage.toolSetting = JSON.stringify({ ...state.toolSetting, ...action.setting });
      return { ...state, ...{ toolSetting: { ...state.toolSetting, ...action.setting } } };
    }
    case SET_ARTICLE_LINK: {
      sessionStorage.articleLink = action.articleLink;
      return { ...state, ...{ articleLink: action.articleLink } };
    }
    case SET_CHARTER_LINK: {
      sessionStorage.charterLink = action.charterLink;
      return { ...state, ...{ charterLink: action.charterLink } };
    }
    default:
      return state;
  }
}
