import React, { useState } from 'react';
import {
  TextField, Button, Grid, Card, CardMedia, CardContent, Typography, CardActions, Divider, ToggleButtonGroup, ToggleButton, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LinkIcon from '@mui/icons-material/Link';
import ArticleIcon from '@mui/icons-material/Article';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('search-results');
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY; // Use environment variable
  const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY; // Use environment variable
  const googleCx = process.env.REACT_APP_GOOGLE_CX; // Use environment variable

  const handleSearch = async () => {
    if (!searchQuery) return;

    setHasSearched(true);
    setLoading(true); // Set loading to true when starting fetch

    try {
      // Fetch Google search results
      const googleResponse = await fetch(
        `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchQuery)}&key=${googleApiKey}&cx=${googleCx}`
      );
      const googleData = await googleResponse.json();
      setSearchResults(googleData.items || []);

      // Fetch YouTube videos
      const youtubeResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${encodeURIComponent(searchQuery)}&key=${youtubeApiKey}`
      );
      const youtubeData = await youtubeResponse.json();

      if (youtubeData.items) {
        const videoIds = youtubeData.items.map(video => video.id.videoId).filter(id => id);

        // Fetch video statistics for each video
        const statsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds.join(',')}&key=${youtubeApiKey}`
        );
        const statsData = await statsResponse.json();

        // Combine video snippets with statistics
        const videosWithStats = youtubeData.items.map(video => {
          const videoStats = statsData.items.find(item => item.id === video.id.videoId);
          return { ...video, statistics: videoStats?.statistics };
        });

        // Filter out videos with 0 likes and 0 views
        const filteredVideos = videosWithStats.filter(video => 
          video.statistics?.likeCount > 0 || video.statistics?.viewCount > 0
        );

        // Sort videos by view count in decreasing order
        filteredVideos.sort((a, b) => (b.statistics?.viewCount || 0) - (a.statistics?.viewCount || 0));

        setVideos(filteredVideos);
      } else {
        console.error('No YouTube results found.');
      }

      // Fetch articles from CrossRef
      const crossrefResponse = await fetch(
        `https://api.crossref.org/works?query=${encodeURIComponent(searchQuery)}`
      );
      const crossrefData = await crossrefResponse.json();
      setArticles(crossrefData.message.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false when fetch is complete
    }
  };

  const handleFilterChange = (event, newFilter) => {
    setSelectedFilter(newFilter);
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* Search Bar */}
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            fullWidth
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {/* Conditional Rendering for Heading and Filters */}
      {hasSearched && (
        <>
          {/* Filter Selection */}
          <ToggleButtonGroup
            value={selectedFilter}
            exclusive
            onChange={handleFilterChange}
            style={{ marginTop: '2rem', marginBottom: '2rem' }}
          >
            <ToggleButton value="search-results">Search Results</ToggleButton>
            <ToggleButton value="youtube-videos">YouTube Videos</ToggleButton>
            <ToggleButton value="articles">Articles</ToggleButton>
          </ToggleButtonGroup>

          {/* Divider */}
          <Divider style={{ margin: '2rem 0' }} />

          {/* Loader */}
          {loading && (
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '400px' }}>
              <CircularProgress />
            </Grid>
          )}

          {/* Conditional Rendering Based on Selected Filter */}
          {!loading && selectedFilter === 'search-results' && (
            <>
              <Typography variant="h5" component="h2" gutterBottom>
                Search Results
              </Typography>
              <Grid container spacing={4}>
                {searchResults.map((result, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card style={{ height: '100%' }}>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {result.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {result.snippet}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary" href={result.link} target="_blank" startIcon={<LinkIcon />}>
                          Visit Site
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {!loading && selectedFilter === 'youtube-videos' && (
            <>
              <Typography variant="h5" component="h2" gutterBottom>
                YouTube Videos
              </Typography>
              <Grid container spacing={4}>
                {videos.map((video) => (
                  <Grid item xs={12} sm={6} md={4} key={video.id.videoId}>
                    <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={video.snippet.thumbnails.high.url}
                        alt={video.snippet.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {video.snippet.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {video.snippet.description || 'No description available'}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                          target="_blank"
                        >
                          Watch Now
                        </Button>
                        <Button size="small" startIcon={<ThumbUpIcon />}>
                          {video.statistics?.likeCount || 0} Likes
                        </Button>
                        <Button size="small" startIcon={<VisibilityIcon />}>
                          {video.statistics?.viewCount || 0} Views
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {!loading && selectedFilter === 'articles' && (
            <>
              <Typography variant="h5" component="h2" gutterBottom>
                Articles
              </Typography>
              <Grid container spacing={4}>
                {articles.map((article) => (
                  <Grid item xs={12} sm={6} md={4} key={article.DOI}>
                    <Card style={{ height: '100%' }}>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {article.title.join(', ')}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {article.abstract || 'No abstract available'}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary" href={article.URL} target="_blank" startIcon={<ArticleIcon />}>
                          Read Article
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchComponent;