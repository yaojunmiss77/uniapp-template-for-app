const axios = require('axios');
const child_process = require('child_process');
const fs = require('fs');
const instance = axios.create();

const FormData = require('form-data');
const envMap = {
  dev: 'https://dev-mashangban.ge.cn',
  test: 'https://192.168.11.231:9999',
};
const uniAppIp = '__UNI__FF83C0C';
const appId = '73f08c754f957673';
const env = process.argv.slice(2);
const baseUrl = envMap[env[0]] || 'https://dev-mashangban.ge.cn';
const loginURL = `${baseUrl}/uniapp/user/login`;
const getAppListURL = `${baseUrl}/uniapp/uniApp/listUniApps`;
const uploadURL = `${baseUrl}/uniapp/file/upload`;
const submitPackage = `${baseUrl}/uniapp/package/submitPackage`;
let userInfo = {
  token: 'a97df052-c418-4d16-9986-a11d0b2c9d00',
  userId: '58c11073-279d-4adb-b8fe-4a18675327a3',
  role: '1',
};
const login = async () => {
  const { data } = await instance.post(loginURL, {
    username: 'lixd',
    password:
      'f0d5937ddef983a4fbf56eec5c84ab78e7402fd6b55b8b7271f75f676b57bae1afe09a476702f414c12b5259899db3790ab1d8915827f2f956f48c8ab4af7541',
    verifyCode: '9',
    verifyPid: '6d9e9a20-f5e5-11ed-8cdb-754dbdcd60b7',
  });
  if (data.errno === 0) {
    userInfo = data.data;
  }
};
const getAppList = async () => {
  const { data } = await instance.post(
    getAppListURL,
    {
      pageNum: 1,
      pageSize: 10,
      role: '1',
      userId: userInfo.userId,
    },
    { headers: { Authorization: `Bearer ${userInfo.token}` } },
  );
  const { uniAppVos = [] } = data.data || [];
  const app = uniAppVos.find((item) => (item.appId = appId));
};

const buildPackage = () => {
  child_process.exec('./build/build.sh', (error, stdout, stderr) => {
    if (error) {
      console.error(`执行Shell命令时出错： ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Shell命令错误： ${stderr}`);
      return;
    }
    console.log(`Shell命令输出： ${stdout}`);
  });
};
const uploadPackage = async () => {
  let formData = new FormData();
  if (fs.existsSync(`dist/build/${uniAppIp}.wgt.zip`)) {
    let file = fs.createReadStream(`dist/build/${uniAppIp}.wgt.zip`);
    formData.append('file', file);
    let headers = formData.getHeaders(); //获取headers
    await formData.getLength(async (err, length) => {
      if (err) {
        return;
      }
      headers['content-length'] = length;
      headers['Authorization'] = `Bearer ${userInfo.token}`;
      const { data } = await instance.post(uploadURL, formData, {
        headers: headers,
      });
    });
  }
};
const submit = async () => {
  const req = {
    packageId: 476,
    appId: '2',
    role: '1',
  };
  const data = await instance.post(uploadURL, req, { headers: { Authorization: `Bearer ${userInfo.token}` } });
};

const init = async () => {
  // 登录
  // await login()
  // 获取小程序列表
  // await getAppList()

  // buildPackage()
  await uploadPackage();
};

init();
