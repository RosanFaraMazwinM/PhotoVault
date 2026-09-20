# 📸 PhotoVault

PhotoVault is a cross-platform photo browsing application developed with **React Native, TypeScript, and Expo**. The app provides a complete local user experience, including account creation, login, image discovery, searching, filtering, favorites, profile management, image downloading, and theme customization.

## ✨ Key Features

### 🔐 User Authentication

PhotoVault includes a locally managed authentication flow with:

* New user registration
* Required-field validation
* Email format validation
* 10-digit mobile number validation
* Password and confirm-password validation
* Minimum password length validation
* Prevention of duplicate email registration
* Login using saved account details
* Invalid credential handling
* Persistent login sessions
* Secure logout from the current session

### 🖼️ Photo Gallery

The main gallery retrieves images from the Picsum Photos service and provides:

* Dynamic image loading
* Author and image ID information
* High-resolution image previews
* Loading indicators
* API failure handling
* Pull-to-refresh functionality
* Automatic loading of additional images while scrolling
* Responsive gallery presentation

### 🔍 Search and Filtering

Users can quickly locate images using:

* Author-based search
* Case-insensitive search matching
* A–M author filter
* N–Z author filter
* Combined search and filtering

### ❤️ Favorite Images

The application allows users to maintain a personal collection of favorite photos:

* Mark an image as a favorite
* Remove an image from favorites
* View favorites on a separate screen
* Search within favorite images
* Keep favorite selections saved with AsyncStorage

### 🖼️ Image Information

Selecting an image opens a dedicated details screen containing:

* Large image preview
* Photographer/author name
* Image ID
* Download option on Web
* Device gallery saving support on native platforms

### 👤 Profile Management

The profile section allows users to manage their saved information:

* View account details
* Update personal information
* Change gender selection
* Select a city from a dropdown
* Validate mobile number
* Save profile changes
* Automatically generated initial-based avatar
* Logout functionality

### 🌙 Theme Customization

PhotoVault supports personalized appearance settings:

* Light theme
* Dark theme
* Dark-mode profile interface
* Dark-mode form fields
* Saved theme preference across sessions

---

## 🛠️ Technologies Used

| Technology          | Purpose                                |
| ------------------- | -------------------------------------- |
| React Native        | Mobile application interface           |
| TypeScript          | Type-safe application development      |
| Expo                | Development and cross-platform tooling |
| React Navigation    | Screen and navigation management       |
| AsyncStorage        | Local data persistence                 |
| React Native Picker | City selection                         |
| Expo FileSystem     | File handling on native platforms      |
| Expo Media Library  | Saving images to the device gallery    |
| Picsum Photos API   | Image data source                      |

---

## 🌐 Image API

PhotoVault retrieves photo information from the **Picsum Photos API**.

Example endpoint:

```text
https://picsum.photos/v2/list?page=1&limit=50
```

Images are loaded in pages so that additional content can be requested as the user moves through the gallery.

---

## 📂 Project Organization

```text
PhotoVault/
│
├── App.tsx
├── package.json
├── README.md
│
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── FilterBar.tsx
│   │   ├── ImageCard.tsx
│   │   └── Input.tsx
│   │
│   ├── context/
│   │   └── AppContext.tsx
│   │
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   │
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── FavoritesScreen.tsx
│   │   ├── ImageDetailsScreen.tsx
│   │   └── ProfileScreen.tsx
│   │
│   ├── services/
│   │   ├── api.ts
│   │   └── storage.ts
│   │
│   └── types/
│       └── index.ts
│
└── assets/
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

Replace the placeholder with your GitHub repository address:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the Project Folder

```bash
cd PhotoVault
```

### 3. Install Packages

```bash
npm install
```

---

## ▶️ Starting the Application

Launch the Expo development server with:

```bash
npx expo start
```

### 🌐 Web Version

To open PhotoVault directly in a browser:

```bash
npx expo start --web
```

### 📱 Android Version

Start Expo:

```bash
npx expo start
```

Then open the application through an Android emulator or an Expo-compatible Android device.

---

## 🧪 TypeScript Verification

The project can be checked for TypeScript compilation issues using:

```bash
npx tsc --noEmit
```

A successful run without reported errors confirms that the TypeScript source files compile correctly.

---

## 💾 Data Persistence

PhotoVault uses **AsyncStorage** to retain application data locally.

The application stores:

* Registered account information
* Active login session
* Favorite image IDs
* Selected appearance theme

This allows important user preferences and session information to remain available after restarting the application.

---

## 🔒 Authentication Design

The authentication system is implemented locally for this project.

When a user registers, their account information is stored using AsyncStorage. During login, the entered email and password are compared with the locally stored account information.

> This local authentication design is intended for demonstration and learning purposes. A production application should use a dedicated backend authentication system with secure password handling.

---

## 📱 Image Saving

PhotoVault handles image downloads differently depending on the platform.

**Web:**
The selected image is opened in the browser so it can be downloaded using the browser's standard download functionality.

**Android/iOS:**
The application uses Expo FileSystem and Expo Media Library to request the required permission and save the selected image to the device gallery.

---

## 🎨 User Interface

The application focuses on a simple and responsive user experience with:

* Reusable UI components
* Form validation feedback
* Loading indicators
* Empty-result messages
* Interactive favorite controls
* Pull-to-refresh
* Infinite scrolling
* Light and dark themes
* Responsive layouts

---

## 🚀 Potential Improvements

The current application can be extended in several ways, including:

* Connecting authentication to a backend
* Adding encrypted password handling
* Moving user data to a cloud database
* Supporting profile pictures
* Adding photo-sharing functionality
* Introducing social login
* Creating additional image categories
* Implementing offline caching
* Adding push notifications
* Expanding automated test coverage
* Preparing the application for production deployment

---

## 👩‍💻 Developer

**M. Rosan Fara Mazwin**

MCA Graduate | MERN Full Stack Developer

---

## 📄 Project License

PhotoVault was created as a **learning, assessment, and portfolio project** to demonstrate React Native, TypeScript, API integration, local persistence, navigation, state management, and responsive mobile application development.
