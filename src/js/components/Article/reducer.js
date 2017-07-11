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

// Initial state
export const initialState = {
  status: 'ok',
  contentList: [],
  charterList: [],
  articleLink: '', // 小说主页连接
  articleContent: '', // 小说内容
  viewType: 'search', // 视图类型
  toolSetting: { // 小工具设置
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
      return { ...state, ...{ status: action.status, contentList: action.data.content } };
    }
    case SEARCH_ARTICLE_FAILURE: {
      return { ...state, ...{ status: action.status, contentList: [] } };
    }
    case GET_CHARTER_LIST_REQUEST:
    case GET_CHARTER_LIST_FAILURE: {
      return { ...state, ...{ status: action.status, charterList: [] } };
    }
    case GET_CHARTER_LIST_SUCCESS: {
      return { ...state, ...{ status: action.status, charterList: action.data.content } };
    }
    case GET_CHARTER_CONTENT_REQUEST:
    case GET_CHARTER_CONTENT_FAILURE: {
      return { ...state, ...{ status: action.status, articleContent: '' } };
    }
    case GET_CHARTER_CONTENT_SUCCESS: {
      return { ...state, ...{ status: action.status, articleContent: action.data.content } };
    }
    case CHANGE_VIEW_TYPE: {
      return { ...state, ...{ viewType: action.viewType } };
    }
    case CHANGE_TOOL_SETTING: {
      return { ...state, ...{ toolSetting: { ...state.toolSetting, ...action.setting } } };
    }
    case SET_ARTICLE_LINK: {
      return { ...state, ...{ articleLink: action.articleLink } };
    }
    default:
      return state;
  }
}
