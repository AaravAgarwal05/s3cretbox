import { S3File, S3Bucket } from "../app/[bucket-name]/components/types";

// Demo bucket configuration
export const demoBucket: S3Bucket = {
  id: "demo-bucket",
  name: "demo-bucket",
  region: "us-east-1",
  accessKey: "DEMO_ACCESS_KEY",
  secretKey: "DEMO_SECRET_KEY",
  dateAdded: "2024-01-01",
};

// Demo files and folders data
export const demoFiles: S3File[] = [
  // Root level folders
  {
    id: "folder-images",
    name: "Images",
    size: "-",
    lastModified: "2024-12-15",
    type: "folder",
    path: "",
    isFolder: true,
  },
  {
    id: "folder-documents",
    name: "Documents",
    size: "-",
    lastModified: "2024-12-10",
    type: "folder",
    path: "",
    isFolder: true,
  },
  {
    id: "folder-music",
    name: "Music",
    size: "-",
    lastModified: "2024-12-08",
    type: "folder",
    path: "",
    isFolder: true,
  },
  {
    id: "folder-videos",
    name: "Videos",
    size: "-",
    lastModified: "2024-12-05",
    type: "folder",
    path: "",
    isFolder: true,
  },
  {
    id: "folder-archives",
    name: "Archives",
    size: "-",
    lastModified: "2024-11-28",
    type: "folder",
    path: "",
    isFolder: true,
  },
  {
    id: "folder-projects",
    name: "Projects",
    size: "-",
    lastModified: "2024-11-20",
    type: "folder",
    path: "",
    isFolder: true,
  },

  // Root level files
  {
    id: "file-readme",
    name: "README.md",
    size: "2.4 KB",
    lastModified: "2024-12-20",
    type: "document",
    path: "",
    isFolder: false,
  },
  {
    id: "file-notes",
    name: "notes.txt",
    size: "1.1 KB",
    lastModified: "2024-12-18",
    type: "document",
    path: "",
    isFolder: false,
  },

  // Images folder contents
  {
    id: "img-vacation-1",
    name: "vacation_photo_1.jpg",
    size: "3.2 MB",
    lastModified: "2024-12-14",
    type: "image",
    path: "Images/",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    isFolder: false,
  },
  {
    id: "img-vacation-2",
    name: "vacation_photo_2.jpg",
    size: "2.8 MB",
    lastModified: "2024-12-14",
    type: "image",
    path: "Images/",
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
    isFolder: false,
  },
  {
    id: "img-profile",
    name: "profile_picture.png",
    size: "856 KB",
    lastModified: "2024-12-10",
    type: "image",
    path: "Images/",
    url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
    isFolder: false,
  },
  {
    id: "img-landscape",
    name: "landscape_sunset.jpg",
    size: "4.5 MB",
    lastModified: "2024-12-08",
    type: "image",
    path: "Images/",
    url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800",
    isFolder: false,
  },
  {
    id: "img-nature",
    name: "nature_forest.jpg",
    size: "5.1 MB",
    lastModified: "2024-12-05",
    type: "image",
    path: "Images/",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    isFolder: false,
  },
  {
    id: "folder-images-screenshots",
    name: "Screenshots",
    size: "-",
    lastModified: "2024-12-01",
    type: "folder",
    path: "Images/",
    isFolder: true,
  },

  // Images/Screenshots folder contents
  {
    id: "img-screenshot-1",
    name: "app_screenshot_1.png",
    size: "1.2 MB",
    lastModified: "2024-11-30",
    type: "image",
    path: "Images/Screenshots/",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    isFolder: false,
  },
  {
    id: "img-screenshot-2",
    name: "dashboard_view.png",
    size: "980 KB",
    lastModified: "2024-11-28",
    type: "image",
    path: "Images/Screenshots/",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    isFolder: false,
  },

  // Documents folder contents
  {
    id: "doc-report",
    name: "Annual_Report_2024.pdf",
    size: "2.8 MB",
    lastModified: "2024-12-09",
    type: "document",
    path: "Documents/",
    isFolder: false,
  },
  {
    id: "doc-presentation",
    name: "Q4_Presentation.pptx",
    size: "5.4 MB",
    lastModified: "2024-12-07",
    type: "document",
    path: "Documents/",
    isFolder: false,
  },
  {
    id: "doc-spreadsheet",
    name: "Budget_2024.xlsx",
    size: "456 KB",
    lastModified: "2024-12-05",
    type: "document",
    path: "Documents/",
    isFolder: false,
  },
  {
    id: "doc-contract",
    name: "Contract_Template.docx",
    size: "234 KB",
    lastModified: "2024-11-20",
    type: "document",
    path: "Documents/",
    isFolder: false,
  },
  {
    id: "folder-docs-invoices",
    name: "Invoices",
    size: "-",
    lastModified: "2024-11-15",
    type: "folder",
    path: "Documents/",
    isFolder: true,
  },

  // Documents/Invoices folder contents
  {
    id: "doc-invoice-1",
    name: "Invoice_001.pdf",
    size: "125 KB",
    lastModified: "2024-11-14",
    type: "document",
    path: "Documents/Invoices/",
    isFolder: false,
  },
  {
    id: "doc-invoice-2",
    name: "Invoice_002.pdf",
    size: "132 KB",
    lastModified: "2024-11-10",
    type: "document",
    path: "Documents/Invoices/",
    isFolder: false,
  },
  {
    id: "doc-invoice-3",
    name: "Invoice_003.pdf",
    size: "118 KB",
    lastModified: "2024-11-05",
    type: "document",
    path: "Documents/Invoices/",
    isFolder: false,
  },

  // Music folder contents
  {
    id: "music-track-1",
    name: "summer_vibes.mp3",
    size: "8.2 MB",
    lastModified: "2024-12-07",
    type: "audio",
    path: "Music/",
    isFolder: false,
  },
  {
    id: "music-track-2",
    name: "relaxing_piano.mp3",
    size: "6.5 MB",
    lastModified: "2024-12-05",
    type: "audio",
    path: "Music/",
    isFolder: false,
  },
  {
    id: "music-track-3",
    name: "jazz_collection.flac",
    size: "45.2 MB",
    lastModified: "2024-11-28",
    type: "audio",
    path: "Music/",
    isFolder: false,
  },
  {
    id: "folder-music-podcasts",
    name: "Podcasts",
    size: "-",
    lastModified: "2024-11-20",
    type: "folder",
    path: "Music/",
    isFolder: true,
  },

  // Music/Podcasts folder contents
  {
    id: "music-podcast-1",
    name: "tech_talk_ep42.mp3",
    size: "52.3 MB",
    lastModified: "2024-11-19",
    type: "audio",
    path: "Music/Podcasts/",
    isFolder: false,
  },
  {
    id: "music-podcast-2",
    name: "startup_stories_ep15.mp3",
    size: "48.1 MB",
    lastModified: "2024-11-12",
    type: "audio",
    path: "Music/Podcasts/",
    isFolder: false,
  },

  // Videos folder contents
  {
    id: "video-tutorial",
    name: "coding_tutorial.mp4",
    size: "256 MB",
    lastModified: "2024-12-04",
    type: "video",
    path: "Videos/",
    isFolder: false,
  },
  {
    id: "video-presentation",
    name: "product_demo.mp4",
    size: "128 MB",
    lastModified: "2024-11-30",
    type: "video",
    path: "Videos/",
    isFolder: false,
  },
  {
    id: "video-webinar",
    name: "webinar_recording.mkv",
    size: "512 MB",
    lastModified: "2024-11-25",
    type: "video",
    path: "Videos/",
    isFolder: false,
  },
  {
    id: "folder-videos-clips",
    name: "Short Clips",
    size: "-",
    lastModified: "2024-11-18",
    type: "folder",
    path: "Videos/",
    isFolder: true,
  },

  // Videos/Short Clips folder contents
  {
    id: "video-clip-1",
    name: "highlight_reel.mp4",
    size: "45 MB",
    lastModified: "2024-11-17",
    type: "video",
    path: "Videos/Short Clips/",
    isFolder: false,
  },
  {
    id: "video-clip-2",
    name: "behind_scenes.mp4",
    size: "32 MB",
    lastModified: "2024-11-15",
    type: "video",
    path: "Videos/Short Clips/",
    isFolder: false,
  },

  // Archives folder contents
  {
    id: "archive-backup",
    name: "website_backup.zip",
    size: "156 MB",
    lastModified: "2024-11-27",
    type: "archive",
    path: "Archives/",
    isFolder: false,
  },
  {
    id: "archive-photos",
    name: "photos_2023.tar.gz",
    size: "2.4 GB",
    lastModified: "2024-11-20",
    type: "archive",
    path: "Archives/",
    isFolder: false,
  },
  {
    id: "archive-project",
    name: "old_project_files.rar",
    size: "890 MB",
    lastModified: "2024-10-15",
    type: "archive",
    path: "Archives/",
    isFolder: false,
  },

  // Projects folder contents
  {
    id: "folder-projects-webapp",
    name: "WebApp",
    size: "-",
    lastModified: "2024-11-19",
    type: "folder",
    path: "Projects/",
    isFolder: true,
  },
  {
    id: "folder-projects-mobile",
    name: "MobileApp",
    size: "-",
    lastModified: "2024-11-10",
    type: "folder",
    path: "Projects/",
    isFolder: true,
  },

  // Projects/WebApp folder contents
  {
    id: "project-webapp-1",
    name: "index.html",
    size: "12 KB",
    lastModified: "2024-11-18",
    type: "document",
    path: "Projects/WebApp/",
    isFolder: false,
  },
  {
    id: "project-webapp-2",
    name: "styles.css",
    size: "8 KB",
    lastModified: "2024-11-18",
    type: "document",
    path: "Projects/WebApp/",
    isFolder: false,
  },
  {
    id: "project-webapp-3",
    name: "app.js",
    size: "24 KB",
    lastModified: "2024-11-18",
    type: "document",
    path: "Projects/WebApp/",
    isFolder: false,
  },

  // Projects/MobileApp folder contents
  {
    id: "project-mobile-1",
    name: "App.tsx",
    size: "15 KB",
    lastModified: "2024-11-09",
    type: "document",
    path: "Projects/MobileApp/",
    isFolder: false,
  },
  {
    id: "project-mobile-2",
    name: "package.json",
    size: "2 KB",
    lastModified: "2024-11-09",
    type: "document",
    path: "Projects/MobileApp/",
    isFolder: false,
  },
];

// Helper function to get files for a specific path
export function getDemoFilesForPath(path: string): S3File[] {
  // Normalize path: add trailing slash if path is not empty, for matching
  const normalizedPath = path ? (path.endsWith("/") ? path : path + "/") : "";
  return demoFiles.filter((file) => file.path === normalizedPath);
}

// Helper function to search demo files
export function searchDemoFiles(query: string): S3File[] {
  const lowerQuery = query.toLowerCase();
  return demoFiles.filter((file) =>
    file.name.toLowerCase().includes(lowerQuery)
  );
}
