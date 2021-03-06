import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import Axios from 'axios';
import PostItem from '../../common/post/PostItem';
import Auth from '../../auth/modules/Auth';

export default class HomeTab extends React.Component {
  constructor() {
    super();

    this.state = { posts: [] };

    this.fetchPosts = () => {
      Axios.get('/api/user/posts', {
        headers: {
          Authorization: `bearer ${Auth.getToken()}`,
        },
      }).then(resp => this.setState({ posts: resp.data }))
        .catch(console.error);
    };
  }

  componentWillMount() {
    this.fetchPosts();
  }

  render() {
    const postItems = this.state.posts.map(post => (
      <PostItem
        key={post._id}
        post={post}
        id={post._id}
      />
    ));
    return (
      <Container text>
        <Card.Group>
          {postItems}
        </Card.Group>
      </Container>
    );
  }
}
