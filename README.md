# Team Members App

A modern React Native application built with Expo Router showcasing team member profiles with interactive cards and detailed modal views.

## Features

- **Interactive Team Directory**: Browse team members with smooth animations
- **Detailed Member Profiles**: Comprehensive modal views with contact information, skills, and social links
- **Responsive Design**: Optimized for mobile portrait orientation
- **Cross-Platform**: Runs natively on iOS and Android
- **Type-Safe**: Built with TypeScript for enhanced developer experience
- **Modern Architecture**: Component-based design with separation of concerns

## Prerequisites

- **Node.js** >= 16.0.0
- **npm** or **yarn**
- **Expo CLI** >= 6.0.0
- **iOS Simulator** (macOS) or **Android Emulator** for testing

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd team-members-app

# Install dependencies
npm install

# Start the development server
npx expo start
```

##  Running the App

### Development Mode

```bash
# Start Expo development server
npx expo start

# Run on iOS simulator (macOS only)
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Run in web browser
npx expo start --web
```

### Physical Device Testing

1. Install **Expo Go** from App Store (iOS) or Google Play (Android)
2. Scan the QR code displayed in terminal/browser
3. App will load automatically on your device

## Project Structure

```
├── app/
│   ├── _layout.tsx          # Root layout with navigation
│   ├── index.tsx           # Main screen component
│   └── page.tsx            # Web compatibility layer
├── components/
│   ├── Header.tsx          # Application header
│   ├── TeamMemberCard.tsx  # Individual member card
│   └── MemberDetailsModal.tsx # Detailed member view
├── data/
│   └── team-data.ts        # Mock team member data
├── types/
│   └── TeamMember.ts       # TypeScript interfaces
└── README.md
```

## Architecture

### Component Hierarchy

```
App Layout (_layout.tsx)
└── Home Screen (index.tsx)
    ├── Header
    ├── FlatList
    │   └── TeamMemberCard (multiple)
    └── Modal
        └── MemberDetailsModal
            ├── ContactSection
            ├── SkillsSection
            └── SocialSection
```

### Data Flow

1. **Static Data**: Team member information loaded from `data/team-data.ts`
2. **State Management**: Local React state using `useState` hooks
3. **Event Handling**: Props-based communication between components
4. **Navigation**: Modal-based detail views with smooth transitions

## Design System

### Color Palette

- **Primary Background**: `#1a1a1a` (Dark)
- **Card Background**: `#2a2a2a` (Medium Dark)
- **Text Primary**: `#ffffff` (White)
- **Text Secondary**: `#999999` (Gray)
- **Accent Colors**: LinkedIn Blue (`#0077B5`), Twitter Blue (`#1DA1F2`)

### Typography

- **Headers**: System font, bold weights
- **Body Text**: System font, regular weights
- **Responsive Sizing**: Scales appropriately across devices

### Animations

- **Card Interactions**: Spring-based scale animations
- **Modal Transitions**: Slide-up with fade-in effects
- **Performance**: Native driver enabled for 60fps animations

## Configuration

### Expo Configuration (`app.json`)

```json
{
  "expo": {
    "name": "Team Members App",
    "orientation": "portrait",
    "platforms": ["ios", "android", "web"]
  }
}
```

### TypeScript Configuration

- **Strict Mode**: Enabled for type safety
- **Path Mapping**: Configured for clean imports
- **React Native Types**: Included for platform-specific APIs

## Performance Considerations

### Optimizations Implemented

- **FlatList**: Efficient rendering for large team lists
- **Image Caching**: Automatic caching via React Native Image component
- **Native Animations**: Hardware-accelerated transitions
- **Component Memoization**: Prevents unnecessary re-renders

### Memory Management

- **Lazy Loading**: Images loaded on-demand
- **State Cleanup**: Proper cleanup in useEffect hooks
- **Modal Management**: Efficient modal mounting/unmounting

## Testing Strategy

### Recommended Testing Approach

```bash
# Unit Tests
npm run test

# Component Testing
npm run test:components

# E2E Testing (future implementation)
npm run test:e2e
```

### Testing Libraries (to be implemented)

- **Jest**: Unit testing framework
- **React Native Testing Library**: Component testing
- **Detox**: End-to-end testing

## Deployment

### Development Build

```bash
# Create development build
npx expo build

# Publish to Expo
npx expo publish
```

### Production Build

```bash
# iOS App Store
npx expo build:ios --type archive

# Google Play Store
npx expo build:android --type app-bundle
```

## Development Workflow

### Code Standards

- **ESLint**: Configured for React Native best practices
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict type checking enabled
- **Conventional Commits**: Standardized commit messages

### Git Workflow

```bash
# Feature development
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create pull request for code review
```

## Future Enhancements

### Planned Features

- [ ] **Search & Filter**: Team member search functionality
- [ ] **Department Grouping**: Organize by teams/departments
- [ ] **Dark/Light Theme**: Theme switching capability
- [ ] **Offline Support**: Local data persistence
- [ ] **Push Notifications**: Team updates and announcements
- [ ] **Analytics**: User interaction tracking

### Technical Improvements

- [ ] **API Integration**: Replace mock data with REST/GraphQL API
- [ ] **State Management**: Implement Redux/Zustand for complex state
- [ ] **Caching Strategy**: Implement React Query for data management
- [ ] **Error Boundaries**: Comprehensive error handling
- [ ] **Performance Monitoring**: Flipper/Reactotron integration

## Troubleshooting

### Common Issues

**Metro bundler cache issues:**
```bash
npx expo start --clear
```

**Dependencies not found:**
```bash
rm -rf node_modules
npm install
```

**iOS simulator not launching:**
```bash
npx expo start --ios --simulator="iPhone 14"
```

**Android emulator connection issues:**
```bash
npx expo start --tunnel
```

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Guide](https://expo.github.io/router/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Review Checklist

- [ ] TypeScript types are properly defined
- [ ] Components follow single responsibility principle
- [ ] Animations are performant (native driver enabled)
- [ ] Accessibility labels are included
- [ ] Error handling is implemented
- [ ] Code is properly documented

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Team

- **Frontend Team**: React Native development
- **Design Team**: UI/UX design and prototyping
- **DevOps Team**: CI/CD and deployment automation

---

**Built with using React Native & Expo**
```

