#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <Firebase.h> 
#import <Singular-React-Native/SingularBridge.h>
#import <CodePush/CodePush.h>
#import "RNSplashScreen.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  self.moduleName = @"Habitual Ecommerce";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  bool didFinish = [super application:application didFinishLaunchingWithOptions:launchOptions];
  [FIRApp configure];  
  [RNSplashScreen show];

  // if (@available(iOS 13.0, *)) {
  //     rootView.backgroundColor = [UIColor systemBackgroundColor];
  // } else {
  //     rootView.backgroundColor = [UIColor whiteColor];
  // }

  // for (NSString *familyName in [UIFont familyNames]){
  //     NSLog(@"Family name: %@", familyName);
  //     for (NSString *fontName in [UIFont fontNamesForFamilyName:familyName]) {
  //         NSLog(@"--Font name: %@", fontName);
  //     }
  // }
  [SingularBridge startSessionWithLaunchOptions:launchOptions];
  return didFinish;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id> * _Nullable))restorationHandler{
  [SingularBridge startSessionWithUserActivity:userActivity];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL];
#endif
}

@end
