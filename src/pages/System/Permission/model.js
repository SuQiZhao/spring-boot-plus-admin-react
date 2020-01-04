import {getAllPermissionTree, addSysPermission, updateSysPermission, getSysPermission, deleteSysPermission, getSysPermissionList} from "./service";
import {messageR} from "@/utils/utils";

/**
 * SysPermissionModel
 */
const Model = {
  namespace: 'SysPermissionModel',
  state: {
    tree: [],
    select: [],
    total: 0,
    permission: {},
    permissions: [],
  },
  effects: {
    // 获取系统权限Tree
    * eSysPermissionTree({payload}, {call, put}) {
      const response = yield call(getAllPermissionTree, payload);
      yield put({type: 'rSysPermissionTree', payload: response});
    },
    // 添加系统权限
    * eAddSysPermission({payload}, {call}) {
      const response = yield call(addSysPermission, payload);
      return messageR(response);
    },
    // 修改系统权限
    * eUpdateSysPermission({payload}, {call}) {
      const response = yield call(updateSysPermission, payload);
      return messageR(response);
    },
    // 根据id获取系统权限信息
    * eGetSysPermission({payload}, {call, put}) {
      const response = yield call(getSysPermission, payload.id);
      if (response.success) {
        yield put({type: 'rGetSysPermission', payload: response});
        return true;
      }
      return false;
    },
    // 删除系统权限信息
    * eDeleteSysPermissionById({payload}, {call}) {
      const response = yield call(deleteSysPermission, payload.id);
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
    rSysPermissionTree(state, action) {
      const {data, success} = action.payload;
      if (success) {
        const select = [{id: 0, key: '无', value: '0', title: '无',},...data];
        return {...state, tree: data, select};
      }
      return state;
    },
    rGetPermissionList(state, action) {
      const {data, success} = action.payload;
      if (success) {
        return {...state, permissions: data};
      }
      return state;
    },
    rGetSysPermission(state, action) {
      const {data, success} = action.payload;
      if (success) {
        return {...state, permission: data};
      }
      return state;
    },
  },
};

export default Model;
