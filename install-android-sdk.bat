@echo off
echo ===================================================
echo Android SDK Installer for React Native Expo
echo ===================================================
echo.

:: Create directories
echo Creating directories...
if not exist "C:\Android" mkdir "C:\Android"
if not exist "C:\Android\sdk" mkdir "C:\Android\sdk"
if not exist "C:\Android\sdk\cmdline-tools" mkdir "C:\Android\sdk\cmdline-tools"
if not exist "C:\Android\sdk\cmdline-tools\latest" mkdir "C:\Android\sdk\cmdline-tools\latest"
echo Directories created.
echo.

:: Download command line tools
echo Downloading Android Command Line Tools...
echo This may take a few minutes depending on your internet connection.
echo.
powershell -Command "& {Invoke-WebRequest -Uri 'https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip' -OutFile 'C:\Android\android_tools.zip'}"
echo Download completed.
echo.

:: Extract command line tools
echo Extracting Android Command Line Tools...
powershell -Command "& {Expand-Archive -Path 'C:\Android\android_tools.zip' -DestinationPath 'C:\Android\temp' -Force}"
echo Moving files to the correct location...
powershell -Command "& {Copy-Item -Path 'C:\Android\temp\cmdline-tools\*' -Destination 'C:\Android\sdk\cmdline-tools\latest' -Recurse -Force}"
echo Cleaning up temporary files...
powershell -Command "& {Remove-Item -Path 'C:\Android\temp' -Recurse -Force}"
powershell -Command "& {Remove-Item -Path 'C:\Android\android_tools.zip' -Force}"
echo Extraction completed.
echo.

:: Set environment variables
echo Setting environment variables...
setx ANDROID_HOME "C:\Android\sdk"
setx ANDROID_SDK_ROOT "C:\Android\sdk"
setx PATH "%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\cmdline-tools\latest\bin;%ANDROID_HOME%\emulator"
echo Environment variables set.
echo.

echo ===================================================
echo Android SDK setup completed!
echo ===================================================
echo.
echo Please restart your command prompt or terminal for the changes to take effect.
echo.
echo After restarting, you should install the required SDK packages by running:
echo sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.2"
echo sdkmanager --licenses
echo.
echo Then you can run your app with 'npm start' and press 'a' to open on Android.
echo.
pause