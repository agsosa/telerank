# Telerank
Mobile App to browse and rate Telegram groups, channels, bots and stickers. Includes a web scraper to add new entries periodically in addition to those submitted by users.

Live: (work in progress, in playstore approval process)

#### Features
- Browse more than 5000 Telegram groups, channels, bots and stickers
- Multi-language support
- Submit your own community, bot or sticker set to the directory (Auth0)
- Rate your favorite communities
- Filter by type, language, categories, etc
- Search by terms (Fuzzy search) or discover a random community
- Featured, top rated, biggest and popular rankings
- Promote your group, channel or bot adding a featured badge and visual upgrades to your listing (Google Pay integration)
- Web scrapers are executed periodically by the "scraper-jobs" module to scrape new Telegram usernames, scrape Telegram info, update existing entries and more
- Web panel for administrators to moderate, modify, update, delete existing entries and manage the app.

#### Used libs/frameworks
- **Frontend:**
  - React Native 
  - Rematch (Redux) 
  - i18next
  - Hooks
  - react-navigation
  - Material UI (react-native-paper)
- **Backend:** 
  - TypeScript
  - Node (Express.js)
  - Mongoose (MongoDB)
  - Rest API
  - Auth0
  - ScrapeIt
  - Google Cloud Storage
  - MTProto
- **Admin Web Panel:** 
  - TypeScript
  - React
  - Material UI

#### Pending
- Admin web panel
- Auth0 implementation

#### Screenshots

![screen2](https://user-images.githubusercontent.com/23263273/115783986-eb695180-a393-11eb-9dd0-dd9a3a951972.png)
![screen1](https://user-images.githubusercontent.com/23263273/115783980-ea382480-a393-11eb-856a-918305a48315.png)

