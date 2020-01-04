import request from "@/utils/request";

/**
 * 获取分页系统角色列表
 * @param params
 * @returns {Promise<any>}
 */
export async function getPageList(params) {
  return request("/api/sysRole/getPageList", {
    method: 'POST',
    data: params,
  });
}

/**
 * 添加系统角色
 * @param params
 * @returns {Promise<void>}
 */
export async function addSysRole(params) {
  return request("/api/sysRole/add", {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改系统角色
 * @param params
 * @returns {Promise<any>}
 */
export async function updateSysRole(params) {
  return request("/api/sysRole/update", {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除系统角色信息
 * @param id
 * @returns {Promise<any>}
 */
export async function deleteSysRole(id) {
  return request(`/api/sysRole/delete/${id}`, {
    method: 'POST',
  });
}

/**
 * 根据id获取系统角色信息
 * @param id
 * @returns {Promise<any>}
 */
export async function getSysRole(id) {
  return request(`/api/sysRole/info/${id}`);
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
