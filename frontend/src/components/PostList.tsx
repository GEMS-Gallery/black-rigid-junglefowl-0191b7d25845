import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

interface Post {
  id: bigint;
  title: string;
  body: string;
  author: string;
  timestamp: bigint;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <Grid container spacing={4}>
      {posts.map((post) => (
        <Grid item key={post.id.toString()} xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                By {post.author} | {new Date(Number(post.timestamp) / 1000000).toLocaleString()}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
