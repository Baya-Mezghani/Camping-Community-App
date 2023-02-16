import {Schema} from "mongoose"
import moment from 'moment'

const commentSchema = new Schema(
  {
    commentBody: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => moment(timestamp).fromNow()
    },
    author: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true
      }
    ]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

export default commentSchema