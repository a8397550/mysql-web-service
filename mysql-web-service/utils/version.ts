export const versionVerify = function (versionOne, versionTwo) {
  const regReg = /^[0-9]+\.[0-9]+\.[0-9]+$/;
  if (!(regReg.test(versionOne) && regReg.test(versionTwo))) {
    throw "版本号格式异常"
  }

  const versionOneList = versionOne.split('.');
  const versionTwoList = versionTwo.split('.');

  for (let i = 0; i < 3; i += 1) {
    let prev = Number(versionOneList[i])
    let next = Number(versionTwoList[i])
    if (prev > next) {
      return -1;
    } else if (prev < next) {
      return 1;
    }
  }

  return 0
}