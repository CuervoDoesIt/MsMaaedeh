# Maedeh Data Migration Plan

## Overview

This document outlines the strategy for migrating content from the Instagram account [@ms.maaedeh](https://www.instagram.com/ms.maaedeh/) (Maedeh Azari / مائده آذری) to populate the MsMaaedeh portfolio website.

---

## Table of Contents

1. [Data Requirements](#data-requirements)
2. [Content Acquisition Methods](#content-acquisition-methods)
3. [Data Structure](#data-structure)
4. [Implementation Plan](#implementation-plan)
5. [Placeholder Mapping](#placeholder-mapping)
6. [Legal & Ethical Considerations](#legal--ethical-considerations)

---

## Data Requirements

### Media Assets Needed

| Type | Purpose | Target Location |
|------|---------|-----------------|
| **Photos** | Gallery items, hero images | `/src/assets/gallery/`, `/public/images/` |
| **Videos** | Workshop previews, process videos | `/public/videos/` |
| **Profile Photo** | About page, navigation | `/src/assets/` |
| **Story Highlights** | Featured content sections | Various pages |

### Metadata Needed

- **Captions**: Descriptions for gallery items
- **Hashtags**: Category/filter tags for gallery
- **Dates**: Timeline/chronological ordering
- **Engagement data**: Highlight popular items (optional)
- **Bio text**: About section content
- **Contact info**: Contact page details

---

## Content Acquisition Methods

### Method 1: Instagram Data Download (Recommended)

Instagram allows account owners to download their complete data.

**Steps:**
1. Log into the Instagram account
2. Go to **Settings > Privacy and Security > Data Download**
3. Request data in **JSON format** (preferred for parsing)
4. Wait for email with download link (can take up to 48 hours)
5. Download and extract the archive

**Data includes:**
- All photos and videos in original quality
- Captions and comments
- Profile information
- Story archive (if enabled)
- Saved collections

**Pros:** Legal, complete data, original quality, structured JSON
**Cons:** Requires account access, 48-hour wait

---

### Method 2: Instagram Basic Display API

For authorized access to public content.

**Prerequisites:**
- Facebook Developer Account
- Instagram Business or Creator Account
- App Review approval

**API Endpoints:**
```
GET /me - User profile info
GET /me/media - User's media
GET /{media-id} - Individual media details
```

**Available Fields:**
- `id`, `caption`, `media_type`, `media_url`
- `permalink`, `thumbnail_url`, `timestamp`
- `username`

**Implementation:**
```typescript
// Example API integration
interface InstagramMedia {
  id: string;
  caption: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  timestamp: string;
  permalink: string;
}

async function fetchInstagramMedia(accessToken: string): Promise<InstagramMedia[]> {
  const response = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,permalink&access_token=${accessToken}`
  );
  const data = await response.json();
  return data.data;
}
```

**Pros:** Official API, real-time updates possible
**Cons:** Requires app approval, token management, rate limits

---

### Method 3: Manual Curation

Directly save and organize content from Instagram.

**Process:**
1. Browse [@ms.maaedeh](https://www.instagram.com/ms.maaedeh/) on desktop
2. Save desired images (right-click or screenshot)
3. For videos, use Instagram's "Save" feature and download from app
4. Manually copy captions and relevant hashtags
5. Organize into appropriate folders

**Folder Structure:**
```
/content-import/
├── gallery/
│   ├── sushi/
│   ├── sashimi/
│   ├── rolls/
│   └── platters/
├── workshops/
├── catering/
├── profile/
└── metadata.json
```

**Pros:** Selective curation, no technical setup, immediate
**Cons:** Time-consuming, manual quality control needed

---

## Data Structure

### Recommended JSON Schema for Imported Content

```json
{
  "profile": {
    "name": "Maedeh Azari",
    "namePersian": "مائده آذری",
    "bio": "",
    "profileImage": "profile.jpg",
    "contact": {
      "email": "",
      "phone": "",
      "location": ""
    }
  },
  "gallery": [
    {
      "id": "1",
      "title": "",
      "description": "",
      "category": "sushi|sashimi|rolls|platters|other",
      "image": "gallery/image-001.jpg",
      "video": null,
      "tags": [],
      "featured": false,
      "date": "2024-01-01",
      "instagramId": ""
    }
  ],
  "workshops": [
    {
      "id": "1",
      "title": "",
      "description": "",
      "image": "workshops/workshop-001.jpg",
      "level": "beginner|intermediate|advanced",
      "duration": "",
      "capacity": 0
    }
  ],
  "testimonials": [
    {
      "id": "1",
      "name": "",
      "text": "",
      "source": "instagram",
      "date": ""
    }
  ]
}
```

---

## Implementation Plan

### Phase 1: Content Acquisition (Week 1)

- [ ] Request Instagram data download (Method 1)
- [ ] While waiting, manually curate top 20-30 hero images
- [ ] Extract bio and profile information
- [ ] Identify category themes from hashtags

### Phase 2: Asset Processing (Week 1-2)

- [ ] Optimize images for web (WebP format, multiple sizes)
- [ ] Create thumbnail versions for gallery grid
- [ ] Compress videos for web delivery
- [ ] Organize assets into project structure

**Image Processing Script:**
```bash
# Example using ImageMagick
for img in *.jpg; do
  # Create WebP version
  convert "$img" -quality 85 -resize 1200x1200\> "${img%.jpg}.webp"
  # Create thumbnail
  convert "$img" -quality 80 -resize 400x400^ -gravity center -extent 400x400 "thumb_${img%.jpg}.webp"
done
```

### Phase 3: Data Integration (Week 2)

- [ ] Create content data files (`/src/data/`)
- [ ] Update Gallery page to use real data
- [ ] Update About page with bio content
- [ ] Populate Workshop descriptions
- [ ] Add Catering portfolio images

### Phase 4: Component Updates (Week 2-3)

**Files to Update:**

| File | Changes Needed |
|------|----------------|
| `src/pages/Home.tsx` | Hero image, featured items |
| `src/pages/Gallery.tsx` | Real gallery data, categories |
| `src/pages/About.tsx` | Bio, story, philosophy |
| `src/pages/Workshops.tsx` | Workshop images/descriptions |
| `src/pages/Catering.tsx` | Portfolio images |
| `src/pages/Contact.tsx` | Real contact info |
| `src/components/Navigation.tsx` | Logo/profile image |
| `src/components/Footer.tsx` | Social links, contact |

### Phase 5: Testing & Polish (Week 3)

- [ ] Verify all images load correctly
- [ ] Test responsive layouts with real content
- [ ] Optimize loading performance
- [ ] Final content review with stakeholder

---

## Placeholder Mapping

### Current Placeholders → Instagram Content

| Current Placeholder | Source from Instagram |
|--------------------|-----------------------|
| Hero background image | Best featured sushi photo |
| Gallery grid items | Post images by category |
| Gallery descriptions | Post captions |
| Gallery categories | Hashtag analysis |
| About profile photo | Profile picture |
| About bio text | Bio description |
| About story | Extended caption from key posts |
| Workshop images | Behind-the-scenes/process photos |
| Catering portfolio | Event/platter photos |
| Testimonials | Comment highlights (with permission) |

### Category Mapping from Hashtags

Analyze common hashtags to create gallery filters:

| Hashtag Pattern | Gallery Category |
|-----------------|------------------|
| `#sushi`, `#nigiri` | Sushi |
| `#sashimi` | Sashimi |
| `#sushiroll`, `#maki` | Rolls |
| `#sushiplatter`, `#omakase` | Platters |
| `#sushiworkshop`, `#sushiclass` | Workshops |
| `#catering`, `#event` | Catering |

---

## Legal & Ethical Considerations

### Important Notes

1. **Ownership**: Ensure the website owner has rights to all Instagram content being migrated

2. **Terms of Service**:
   - Instagram's ToS prohibits automated scraping
   - Use official data download or API methods only
   - Manual saving of own content is permitted

3. **Third-Party Content**:
   - Do not use photos of customers without consent
   - Blur or exclude identifiable faces if needed
   - Get written permission for testimonials

4. **Attribution**:
   - Consider linking back to Instagram for certain content
   - Maintain metadata for content provenance

5. **Copyright**:
   - The content creator retains copyright
   - Ensure proper licensing for commercial website use

---

## Tools & Resources

### Recommended Tools

| Purpose | Tool |
|---------|------|
| Image optimization | [Squoosh](https://squoosh.app/), ImageMagick |
| Video compression | FFmpeg, HandBrake |
| JSON editing | VS Code, jq |
| Batch renaming | PowerRename (Windows), rename (Linux) |

### Instagram Official Resources

- [Data Download Request](https://www.instagram.com/download/request/)
- [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Meta for Developers](https://developers.facebook.com/)

---

## Next Steps

1. **Immediate**: Request Instagram data download from account settings
2. **This week**: Begin manual curation of hero/featured images
3. **Decision needed**: Choose between API integration vs. static content approach
4. **Stakeholder input**: Confirm categories and content priorities

---

*Document created: January 2025*
*Last updated: January 2025*
