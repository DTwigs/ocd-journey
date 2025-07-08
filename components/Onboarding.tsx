import { Dimensions, Image, StyleSheet } from "react-native";
import OnboardingSwiper from "react-native-onboarding-swiper";
// import DeviceInfo from "react-native-device-info";
import { Colors } from "@/constants/Colors";

const ONBOARDING_COLORS = {
  backgroundColor: Colors.light.background,
};

type OnboardingProps = {
  onDone: () => void;
};

export const Onboarding = ({ onDone }: OnboardingProps) => (
  <OnboardingSwiper
    onSkip={onDone}
    onDone={onDone}
    bottomBarHighlight={false}
    bottomBarHeight={80}
    imageContainerStyles={styles.onboardingImageContainer}
    bottomBarColor="transparent"
    showSkip={false}
    pages={[
      {
        backgroundColor: ONBOARDING_COLORS.backgroundColor,
        image: (
          <Image
            style={styles.onboardingImage}
            resizeMode="cover"
            source={require("../assets/images/onboarding1.png")}
          />
        ),
        title: "",
        subtitle: "",
      },
      {
        backgroundColor: ONBOARDING_COLORS.backgroundColor,
        image: (
          <Image
            style={styles.onboardingImage}
            resizeMode="cover"
            source={require("../assets/images/onboarding2.png")}
          />
        ),
        title: "",
        subtitle: "",
      },
      {
        backgroundColor: ONBOARDING_COLORS.backgroundColor,
        image: (
          <Image
            style={styles.onboardingImage}
            resizeMode="cover"
            source={require("../assets/images/onboarding3.png")}
          />
        ),
        title: "",
        subtitle: "",
      },
    ]}
  />
);

const styles = StyleSheet.create({
  onboardingImageContainer: {
    // position: "absolute",
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0,
    flex: 1,
  },
  onboardingImage: {
    // height: Dimensions.get("window").height,
    width: Dimensions.get("window").width, //DeviceInfo.isTablet() ? "70%" :
    height: "100%",
    // width: "70%",
  },
});
