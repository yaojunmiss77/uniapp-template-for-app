import { requestInstance } from '..';

/** 获取人脸信息 */
export const getUserFaceInfo = () => {
  return requestInstance.post('/bizhub/user/selfInfo');
};
