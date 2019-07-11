import React from 'react';
class CommentBox extends React.Component {
  render() {
    return (
      <div>
        <label>{this.props.heading}</label>
        <textarea cols="30" rows="10" />
      </div>
    )
  }
}

export default CommentBox