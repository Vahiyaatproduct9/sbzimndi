# SbziMndi

## Layout

- Root(App)
  - Tab
    - Home
      - Hero
      - Body
        - BlockTree(Navigation)
          - Block
          - Product Page
          - Payment Page
    - Search
    - AddItem
    - Profile
      - Options(Auth)
        - SignUp
        - SignIn
        - Otp
        - Kyc
      - Details
        - Edit Profile
        - Settings
          - Change Language
          - Privacy Policy
          - Notification
          - Donate
          - Earn with SbziMndi
    - Loading Screen

## Sign up Flow

1. User enters the Home Screen => Accepts location permission => Fetches Nearest Items
2. User Enters Profile => Enters SignUp details => Clicks next => get asked whether to fill back details for future item upload. (skippable) => - If yes => enters back details =>
   { - personal data including bank details gets submitted to DB with reference to that user - gets back an `access_token` and `refresh_token` - saved in local storage - redirected to home page with message of Login Successful.
   } - if no => { - personal data gets stored to DB with bank details as NULL. - gets back an `access_token` and `refresh_token` - saved to local storage - redirected to home page with signup successful message.
   } ## Purchase Flow 1. User clicks on the Item Block either on Home or Search. 2. Item info is displayed with a `buy` button 3. on clicking `buy` a confirm payment page appears 4. on clicking `pay` in the page, it checks if user is verified(logged in) - if no => { - message appears to log in first - navigates user to profile page after 1.8 secs.
   } - if yes => { - Razorpay payment page appears - user makes the payment - if payment successful
   { - Item is marked as bought and buyers id is added to the product's `bought_by` column
   }
   if not successful
   { - message appears of Something went wrong.
   }
   }

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

## Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### Next Setup

After you've finished building the app, it gets installed in your phone and run automatically.
To start immediately next time, follow these steps:

- Connect your mobile phone or turn on your emulator if you have one.
- Type these command in your Console/Terminal

```sh
# Reversing port 8081 (frontend) from computer to phone/emulator
# you must ensure you have java & javac installed and USB debugging enabled in your phone
adb reverse tcp:8081 tcp:8081
# Reversing post 8080 (backend) from computer to phone/emulator
adb reverse tcp:8080 tcp:8080

#For Linux user you can control or mirror your screen on your computer for convenience using the following command
# If you dont have it installed, install it using the following command
sudo apt update
sudo apt install scrcpy
# After you've installed type the following command
scrcpy
#or
scrcpy -K -M #K for Keyboard control M for Mouse
#or
scrcpy --otg #if you only want the control from the computer and not the screen

```

```Notice
I would like to notify that there may be some error in IOS devices as I've not optimized it for them.
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```
