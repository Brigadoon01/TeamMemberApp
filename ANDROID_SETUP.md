# Android SDK Setup for React Native Expo

This guide will help you set up the Android SDK for your React Native Expo app.

## Error: "Failed to resolve the Android SDK path"

If you're seeing this error when trying to run your app on Android:

```
Failed to resolve the Android SDK path. Default install location not found: C:\Users\DELL\AppData\Local\Android\Sdk. Use ANDROID_HOME to set the Android SDK location.
```

It means your system can't find the Android SDK, which is required to run your app on Android devices or emulators.

## Solution

### Option 1: Run the Setup Script (Recommended)

1. Run the `setup-android-sdk.bat` file in this directory by double-clicking it.
2. This will set up the necessary environment variables for Android development.
3. Restart your command prompt or terminal.
4. Run your app with `npm start` and press `a` to open on Android.

### Option 2: Manual Setup

If you prefer to set up the Android SDK manually, follow these steps:

1. **Download Android Command Line Tools**:
   - Visit [Android Studio download page](https://developer.android.com/studio#command-tools)
   - Scroll down to "Command line tools only" and download the Windows version

2. **Set up the directory structure**:
   - Create a directory at `C:\Android\sdk`
   - Create a subdirectory at `C:\Android\sdk\cmdline-tools\latest`
   - Extract the downloaded zip file and move all contents into the `latest` directory

3. **Set environment variables**:
   - Open System Properties (Win+Pause or right-click on This PC > Properties > Advanced system settings)
   - Click on "Environment Variables"
   - Under "User variables", add:
     - Variable name: `ANDROID_HOME`
     - Variable value: `C:\Android\sdk`
   - Under "User variables", add:
     - Variable name: `ANDROID_SDK_ROOT`
     - Variable value: `C:\Android\sdk`
   - Edit the "Path" variable and add:
     - `%ANDROID_HOME%\platform-tools`
     - `%ANDROID_HOME%\cmdline-tools\latest\bin`
     - `%ANDROID_HOME%\emulator`

4. **Install required SDK packages**:
   - Open a new command prompt
   - Run: `sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.2"`
   - Accept all licenses when prompted with: `sdkmanager --licenses`

5. **Restart your terminal and run your app**:
   - Run your app with `npm start` and press `a` to open on Android

## Troubleshooting

If you're still having issues:

1. Make sure you've restarted your terminal after setting environment variables
2. Verify the environment variables are set correctly by running:
   ```
   echo %ANDROID_HOME%
   ```
3. Make sure you have Java JDK installed (version 8 or newer)
4. If using an Android device, ensure USB debugging is enabled in Developer Options

## Additional Resources

- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- [Expo Android Setup](https://docs.expo.dev/workflow/android-studio-emulator/)