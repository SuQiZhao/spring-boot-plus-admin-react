import { stringify } from 'querystring';
import router from 'umi/router';
import { login, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import {getPageQuery, messageR} from '@/utils/utils';
import {TOKEN, USER} from "@/globalConst";

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      messageR(response);
      yield put({
        type: 'changeLoginStatus',
        payload: {...response, type: payload.type},
      }); // Login successfully
      if (response.success) {
        const { token , loginSysUserVo } = response.data;
        if( !loginSysUserVo.avatar ) {
          const avatar = "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png";
          loginSysUserVo.avatar = avatar;
        }
        localStorage.setItem(TOKEN, token );
        localStorage.setItem(USER, JSON.stringify(loginSysUserVo));

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        router.replace(redirect || '/');
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.success) {
        setAuthority(payload.currentAuthority);
      }
      return {
        ...state,
        status: payload.success ? 'ok' : 'error',
        type: payload.type,
      };
    },
  },
};
export default Model;
