const {} = 'graphql'

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
`)

schema.get