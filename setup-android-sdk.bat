@echo off
echo Setting up Android SDK environment variables...

:: Create Android SDK directory if it doesn't exist
if not exist "C:\Android\sdk" mkdir "C:\Android\sdk"

:: Set ANDROID_HOME environment variable
setx ANDROID_HOME "C:\Android\sdk"
setx ANDROID_SDK_ROOT "C:\Android\sdk"

:: Add Android SDK tools to PATH
setx PATH "%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\cmdline-tools\latest\bin;%ANDROID_HOME%\emulator"

echo.
echo Android SDK environment variables have been set.
echo ANDROID_HOME = C:\Android\sdk
echo.
echo Please restart your command prompt or terminal for the changes to take effect.
echo After restarting, you can run your app with 'npm start' and then press 'a' to open on Android.
echo.
pause