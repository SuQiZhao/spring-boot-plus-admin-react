import {getPageList, addSysRole, updateSysRole, getSysRole, deleteSysRole, getSysPermissionList} from "./service";
import {messageR} from "@/utils/utils";

/**
 * SysRoleModel
 */
const Model = {
  namespace: 'SysRoleModel',
  state: {
    records: [],
    total: 0,
    role: {},
    permissions: [],
  },
  effects: {
    // 获取分页系统角色列表
    * eSysRolePage({payload}, {call, put}) {
      const response = yield call(getPageList, payload);
      yield put({type: 'rSysRolePage', payload: response});
    },
    // 添加系统角色
    * eAddSysRole({payload}, {call}) {
      const response = yield call(addSysRole, payload);
      return messageR(response);
    },
    // 修改系统角色
    * eUpdateSysRole({payload}, {call}) {
      const response = yield call(updateSysRole, payload);
      return messageR(response);
    },
    // 根据id获取系统角色信息
    * eGetSysRole({payload}, {call, put}) {
      const response = yield call(getSysRole, payload.id);
      if (response.success) {
        yield put({type: 'rGetSysRole', payload: response});
        return true;
      }
      return false;
    },
    // 删除系统角色信息
    * eDeleteSysRoleById({payload}, {call}) {
      const response = yield call(deleteSysRole, payload.id);
      return messageR(response);
    },
    // 获取所有权限信息
    * eGetSysPermissionList(_, {call, put}) {
      const response = yield call(getSysPermissionList);
      if (response.success) {
        yield put({type: 'rGetSysPermissionList', payload: response});
        return true;
      }
      return false;
    },
  },
  reducers: {
    rSysRolePage(state, action) {
      const {data, success} = action.payload;
      if (success) {
        const {records, total} = data;
        return {...state, records, total};
      }
      return state;
    },
    rGetRoleList(state, action) {
      const {data, success} = action.payload;
      if (success) {
        return {...state, roles: data};
      }
      return state;
    },
    rGetSysPermissionList(state, action) {
      const {data, success} = action.payload;
      if (success) {
        return {...state, permissions: data};
      }
      return state;
    },
    rGetSysRole(state, action) {
      const {data, success} = action.payload;
      if (success) {
        return {...state, role: data};
      }
      return state;
    },
  },
};

export default Model;
