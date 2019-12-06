const { graphql, buildSchema } = require('graphql')

const mockDatabase = require('../backend/mockdata/comment')

const schema = buildSchema(`
  type Comment {
    id: Int
    avatar: String
    name: String
    isTop: Boolean
    content: String
    publishDate: String
    commentNum: Int
    praiseNum: Int
  }

  type Query {
    comment: [Comment]
  }

  type Mutation {
    praise(id: Int): Int
  }
`)

schema.getQueryType().getFields().comment.resolve = () => {
  // return [{
  //   id: 1,
  //   avatar: 'https://static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg',
  //   name: 'XXX',
  //   isTop: true,
  //   content: '啦啦啦啦',
  //   publishDate: '今天',
  //   commentNum: 10,
  //   praiseNum: 5
  // }]
  return mockDatabase
}

schema.getMutationType().getFields().praise.resolve = (args0, { id }) => {
  let index = mockDatabase.findIndex(item => item.id === id)
  mockDatabase[index].praiseNum++

  return mockDatabase[index].praiseNum
}

module.exports = schema