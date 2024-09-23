
# Web Search Aggregator - Proof of Concept (POC)

This project is a web search aggregator that fetches and ranks content from YouTube, articles, blogs, and academic papers based on a given search term. The results are ranked by relevance, views, likes, and other factors. It includes a simple user interface where users can input search terms and view relevant content, along with options for advanced filtering.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [API Integration](#api-integration)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Future Enhancements](#future-enhancements)

---

## Features
- Search across multiple content types: YouTube videos, articles, blogs, and academic papers.
- Ranked search results based on views, likes, and relevance.
- Simple and responsive user interface.
- Advanced filtering for content types (YouTube, academic papers, articles).
- Performance optimization to ensure fast search results.

---

## Technology Stack
- **Frontend:** React.js (optional: any other frontend framework can be used)
- **Backend:** Node.js with Express (or Python, Ruby on Rails as an alternative)
- **APIs:**
  - YouTube Data API (for YouTube video links, views, likes)
  - Google Custom Search API (for fetching articles and blogs)
  - Google Scholar API or PubMed API (for academic papers)
- **Database (Optional):** MongoDB, SQLite (for storing and managing search result metadata)

---

## API Integration
### YouTube Data API
- Fetches video data such as video links, views, and likes for ranking.
- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)

### Google Custom Search API
- Fetches articles and blog posts based on the search term.
- [Google Custom Search API Documentation](https://developers.google.com/custom-search/v1/overview)

### Google Scholar or PubMed API
- Fetches academic papers and research articles.
- [Google Scholar API (Unofficial)](https://serpapi.com/google-scholar-api) or [PubMed API](https://www.ncbi.nlm.nih.gov/home/develop/api/)

---

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 12.x or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- YouTube Data API Key, Google Custom Search API Key, Google Scholar API Key or PubMed API Key

### Steps to Install

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ayush123-bit/SmartSearch
   cd SmartSearch
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create an `.env` file** in the root of your project and add your API keys:

   ```bash
   YOUTUBE_API_KEY=your-youtube-api-key
   GOOGLE_CUSTOM_SEARCH_API_KEY=your-google-search-api-key
   GOOGLE_SCHOLAR_API_KEY=your-google-scholar-api-key (optional)
   ```

4. **Install Nodemon globally (optional but recommended):**

   ```bash
   npm install -g nodemon
   ```

5. **Run the development server:**

   - If Nodemon is installed:
   
     ```bash
     nodemon app.js
     ```

   - Otherwise, use Node:

     ```bash
     node app.js
     ```

---

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Enter a search term in the input box and hit "Search."
3. The results will be displayed, categorized into:
   - YouTube videos
   - Articles
   - Blog posts
   - Academic papers
4. Use the filters to refine your search based on the type of content.

---

## Folder Structure
```
search-aggregator/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Search.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── server/
│   └── server.js
├── .env
├── package.json
└── README.md
```

### Key Files:
- `src/components/Search.js`: The main search component.
- `server/server.js`: The backend logic for fetching search results from different APIs.
- `.env`: Stores API keys.
  
---

## Future Enhancements
- Add user authentication for personalized search results.
- Implement caching to speed up repeated searches.
- Extend the ranking algorithm to include more factors (e.g., engagement metrics).
- Add pagination for large sets of search results.

---

## License
This project is licensed under the MIT License.

---

## Contact
**Ayush Rai**  
Email: ayushrai803@gmail.com  
Phone: +91 8318542040

Feel free to contribute, report issues, or suggest new features!
