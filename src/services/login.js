import request from '@/utils/request';

export async function login(params) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
