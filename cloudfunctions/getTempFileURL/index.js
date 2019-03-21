const cloud = require('wx-server-sdk')
cloud.init({ env: 'test-f726fb' })
exports.main = async (event, context) => {
  const fileList = event.fileList;
  const result = await cloud.getTempFileURL({
    fileList,
  })
  return result.fileList
}