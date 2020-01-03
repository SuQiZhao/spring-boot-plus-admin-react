import request from "@/utils/request";

/**
 * 获取分页系统用户列表
 * @param params
 * @returns {Promise<any>}
 */
export async function getPageList(params) {
  return request("/api/sysUser/getPageList", {
    method: 'POST',
    data: params,
  });
}

/**
 * 添加系统用户
 * @param params
 * @returns {Promise<void>}
 */
export async function addSysUser(params) {
  return request("/api/sysUser/add", {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改系统用户
 * @param params
 * @returns {Promise<any>}
 */
export async function updateSysUser(params) {
  return request("/api/sysUser/update", {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除系统用户信息
 * @param id
 * @returns {Promise<any>}
 */
export async function deleteSysUser(id) {
  return request(`/api/sysUser/delete/${id}`, {
    method: 'POST',
  });
}

/**
 * 根据id获取系统用户信息
 * @param id
 * @returns {Promise<any>}
 */
export async function getSysUser(id) {
  return request(`/api/sysUser/info/${id}`);
}

/**
 * 获取SysRole列表
 * @returns {Promise<void>}
 */
export async function getRoleList() {
  return request("/api/sysRole/list", {});
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

