import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/system';
import { backend } from 'declarations/backend';
import PostList from './components/PostList';
import CreatePostForm from './components/CreatePostForm';

const HeroSection = styled('div')(({ theme }) => ({
  backgroundImage: 'url(https://images.unsplash.com/photo-1666635376260-9053f9642939?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjUzNjU5MjN8&ixlib=rb-4.0.3)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  padding: theme.spacing(8, 0, 6),
  marginBottom: theme.spacing(4),
}));

interface Post {
  id: bigint;
  title: string;
  body: string;
  author: string;
  timestamp: bigint;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await backend.getPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleCreatePost = async (title: string, body: string, author: string) => {
    setLoading(true);
    try {
      await backend.createPost(title, body, author);
      await fetchPosts();
      setFormOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <HeroSection>
        <Container maxWidth="sm">
          <Typography variant="h2" align="center" gutterBottom>
            Crypto Blog
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Explore the latest in cryptocurrency and blockchain technology
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="md">
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setFormOpen(true)}
          >
            Create New Post
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <PostList posts={posts} />
        )}

        <CreatePostForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleCreatePost}
        />
      </Container>
    </div>
  );
}

export default App;
