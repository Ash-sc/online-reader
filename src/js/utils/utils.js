export default class Utils {
  static jsonToQueryString(json) {
    const querystring = Object.keys(json).map((key) => {
      const nkey = encodeURIComponent(key);
      const nval = encodeURIComponent(json[key]);
      return `${nkey}=${nval}`;
    }).join('&');
    return `?${querystring}`;
  }

  static filterEmptyJsonValues(jsonParameters) {
    const json = jsonParameters;
    Object.keys(json).forEach((key) => {
      if (json[key] === '') {
        delete json[key];
      }
    });
    return json;
  }

  static getCookie(cookieName) {
    if (document.cookie.length > 0) {
      let cStart = document.cookie.indexOf(`${cookieName}=`);
      if (cStart !== -1) {
        cStart = cStart + cookieName.length + 1;
        let cookieEnd = document.cookie.indexOf(';', cStart);
        if (cookieEnd === -1) {
          cookieEnd = document.cookie.length;
        }
        return unescape(document.cookie.substring(cStart, cookieEnd));
      }
    }
    return '';
  }

  static resetFilterObj(state) {
    const initialState = { _pageSize: 10, _pageNo: 0 };
    const initialStateArray = Object.keys(initialState);
    const newState = Object.assign({}, state);
    for (const item of Object.keys(state)) {
      newState[item] = initialStateArray.includes(item) ? initialState[item] : '';
    }
    return newState;
  }

  static fmoney(s, n, m) {
    n = (n > 0 && n <= 20) ? n : 0;
    if (m === 0) {
      // m = 0 四舍五入
      s = `${parseFloat((`${s}''`).replace(/[^\d\\.-]/g, '')).toFixed(n)}`;
      let l = s.split('.')[0].split('').reverse();
      let r = s.split('.')[1];
      let t = '';
      for (let i = 0; i < l.length; i += 1) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
      }
      return `${t.split('').reverse().join('')}.${r}`;
    } else if (m === -1) {
      // m = -1 向下取整
      s = `${parseFloat((`${s}''`).replace(/[^\d\\.-]/g, '')).toFixed(n + 1)}`;
      let l = s.split('.')[0].split('').reverse();
      let r = s.split('.')[1];
      let t = '';
      for (let i = 0; i < l.length; i += 1) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
      }
      t = `${t.split('').reverse().join('')}.${r}`;
      return t.substr(0, t.length - 1);
    } else if (m === 1) {
      // m = 1向上取整
      s = `${parseFloat((`${s}''`).replace(/[^\d\\.-]/g, '')).toFixed(n + 1)}`;
      let l = s.split('.')[0].split('').reverse();
      let r = s.split('.')[1];
      let t = '';
      for (let i = 0; i < l.length; i += 1) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
      }
      t = `${t.split('').reverse().join('')}.${r}`;
      return Number(t.substr(0, t.length - 1)) + (1 / (Math.pow(10, n)));
    }
    return null;
  }
}
