import request from "@/utils/request";

/**
 * 获取分页系统部门列表
 * @param params
 * @returns {Promise<any>}
 */
export async function getPageList(params) {
  return request("/api/sysDepartment/getPageList", {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取部门树形列表
 * @returns {Promise<any>}
 */
export async function getAllDepartmentTree() {
  return request("/api/sysDepartment/getAllDepartmentTree", {
    method: 'POST',
  });
}

/**
 * 添加系统部门
 * @param params
 * @returns {Promise<void>}
 */
export async function addSysDepartment(params) {
  return request("/api/sysDepartment/add", {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改系统部门
 * @param params
 * @returns {Promise<any>}
 */
export async function updateSysDepartment(params) {
  return request("/api/sysDepartment/update", {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除系统部门信息
 * @param id
 * @returns {Promise<any>}
 */
export async function deleteSysDepartment(id) {
  return request(`/api/sysDepartment/delete/${id}`, {
    method: 'POST',
  });
}

/**
 * 根据id获取系统部门信息
 * @param id
 * @returns {Promise<any>}
 */
export async function getSysDepartment(id) {
  return request(`/api/sysDepartment/info/${id}`);
}

/**
 * 获取所有权限
 * @returns {Promise<any>}
 */
export async function getSysPermissionList() {
  return request('/api/sysPermission/getAllMenuTree', {
    method: 'POST',
  });
}
