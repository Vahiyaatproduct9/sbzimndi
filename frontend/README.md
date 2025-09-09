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

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
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

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:
