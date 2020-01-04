import request from "@/utils/request";

/**
 * 获取分页系统权限列表
 * @param params
 * @returns {Promise<any>}
 */
export async function getPageList(params) {
  return request("/api/sysPermission/getPageList", {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取权限树形列表
 * @returns {Promise<any>}
 */
export async function getAllPermissionTree() {
  return request("/api/sysPermission/getAllMenuTree", {
    method: 'POST',
  });
}

/**
 * 添加系统权限
 * @param params
 * @returns {Promise<void>}
 */
export async function addSysPermission(params) {
  return request("/api/sysPermission/add", {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改系统权限
 * @param params
 * @returns {Promise<any>}
 */
export async function updateSysPermission(params) {
  return request("/api/sysPermission/update", {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除系统权限信息
 * @param id
 * @returns {Promise<any>}
 */
export async function deleteSysPermission(id) {
  return request(`/api/sysPermission/delete/${id}`, {
    method: 'POST',
  });
}

/**
 * 根据id获取系统权限信息
 * @param id
 * @returns {Promise<any>}
 */
export async function getSysPermission(id) {
  return request(`/api/sysPermission/info/${id}`);
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
