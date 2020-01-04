import {getAllDepartmentTree, addSysDepartment, updateSysDepartment, getSysDepartment, deleteSysDepartment, getSysPermissionList} from "./service";
import {messageR} from "@/utils/utils";

/**
 * SysDepartmentModel
 */
const Model = {
  namespace: 'SysDepartmentModel',
  state: {
    tree: [],
    select: [],
    total: 0,
    department: {},
    permissions: [],
  },
  effects: {
    // 获取系统部门Tree
    * eSysDepartmentTree({payload}, {call, put}) {
      const response = yield call(getAllDepartmentTree, payload);
      yield put({type: 'rSysDepartmentTree', payload: response});
    },
    // 添加系统部门
    * eAddSysDepartment({payload}, {call}) {
      const response = yield call(addSysDepartment, payload);
      return messageR(response);
    },
    // 修改系统部门
    * eUpdateSysDepartment({payload}, {call}) {
      const response = yield call(updateSysDepartment, payload);
      return messageR(response);
    },
    // 根据id获取系统部门信息
    * eGetSysDepartment({payload}, {call, put}) {
      const response = yield call(getSysDepartment, payload.id);
      if (response.success) {
        yield put({type: 'rGetSysDepartment', payload: response});
        return true;
      }
      return false;
    },
    // 删除系统部门信息
    * eDeleteSysDepartmentById({payload}, {call}) {
      const response = yield call(deleteSysDepartment, payload.id);
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
    rSysDepartmentTree(state, action) {
      const {data, success} = action.payload;
      if (success) {
        const select = [{id: 0, key: '无', value: '0', title: '无',},...data];
        return {...state, tree: data, select};
      }
      return state;
    },
    rGetDepartmentList(state, action) {
      const {data, success} = action.payload;
      if (success) {
        return {...state, departments: data};
      }
      return state;
    },
    rGetSysDepartment(state, action) {
      const {data, success} = action.payload;
      if (success) {
        return {...state, department: data};
      }
      return state;
    },
  },
};

export default Model;
