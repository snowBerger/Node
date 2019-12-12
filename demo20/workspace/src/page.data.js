module.exports = {
  column: {
    protocol: 'geek-rpc',

    ip: '127.0.0.1',

    port: '4000',

    protobufFile: require(`${__dirname}/proto/detail.proto`),

    requestStruct: 'ColumnRequest',

    responseStruct: 'ColumnResponse',
  },
  articleList: {
    protocol: 'http',

    url: 'http://127.0.0.1:4003',

    before: (data) => {
      return data
    },

    then: (res) => {
      return JSON.parse(res)
    },

    catch: () => {

    },
  }
}