import {getPageList, getAllDepartmentTree, getRoleList, addSysUser, updateSysUser, getSysUser, deleteSysUser} from "./service";
import {messageR} from "@/utils/utils";

/**
 * SysUserModel
 */
const Model = {
  namespace: 'SysUserModel',
  state: {
    records: [],
    total: 0,
    user: {},
    roles: [],
    departments: [],
  },
  effects: {
    // 获取分页系统用户列表
    * eSysUserPage({payload}, {call, put}) {
      const response = yield call(getPageList, payload);
      yield put({type: 'rSysUserPage', payload: response});
    },
    // 添加系统用户
    * eAddSysUser({payload}, {call}) {
      const response = yield call(addSysUser, payload);
      return messageR(response);
    },
    // 修改系统用户
    * eUpdateSysUser({payload}, {call}) {
      const response = yield call(updateSysUser, payload);
      return messageR(response);
    },
    // 根据id获取系统用户信息
    * eGetSysUser({payload}, {call, put}) {
      const response = yield call(getSysUser, payload.id);
      if (response.success) {
        yield put({type: 'rGetSysUser', payload: response});
        return true;
      }
      return false;
    },
    // 删除系统用户信息
    * eDeleteSysUserById({payload}, {call}) {
      const response = yield call(deleteSysUser, payload.id);
      return messageR(response);
    },
    // 获取SysRole列表
    * eGetRoleList(_, {call, put}) {
      const response = yield call(getRoleList);
      yield put({type: 'rGetRoleList', payload: response});
    },
    // 获取部门树形列表
    * eGetAllDepartmentTree(_, {call, put}) {
      const response = yield call(getAllDepartmentTree);
      yield put({type: 'rGetAllDepartmentTree', payload: response});
    }
  },
  reducers: {
    rSysUserPage(state, action) {
      const {data, success} = action.payload;
      if (success) {
        const {records, total} = data;
        return {...state, records, total};
      }
      return {...state};
    },
    rGetRoleList(state, action) {
      const {data, success} = action.payload;
      if (success) {
        return {...state, roles: data};
      }
      return {...state};
    },
    rGetAllDepartmentTree(state, action) {
      const {data, success} = action.payload;
      if (success) {
        return {...state, departments: data};
      }
      return {...state};
    },
    rGetSysUser(state, action) {
      const {data, success} = action.payload;
      if (success) {
        return {...state, user: data};
      }
      return {...state};
    },
  },
};

export default Model;
