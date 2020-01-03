import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'global', ...(require('/Users/xiaoshitou/Documents/GitHub/spring-boot-plus-admin-react/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('/Users/xiaoshitou/Documents/GitHub/spring-boot-plus-admin-react/src/models/login.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/xiaoshitou/Documents/GitHub/spring-boot-plus-admin-react/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/xiaoshitou/Documents/GitHub/spring-boot-plus-admin-react/src/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
