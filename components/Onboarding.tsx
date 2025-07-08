import { Dimensions, Image, StyleSheet } from "react-native";
import OnboardingSwiper from "react-native-onboarding-swiper";
import DeviceInfo from "react-native-device-info";
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
    height: Dimensions.get("window").height,
  },
  onboardingImage: {
    width: DeviceInfo.isTablet() ? "65%" : Dimensions.get("window").width,
    height: "100%",
  },
});
