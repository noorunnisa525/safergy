import { borders, colors, fontsSize } from '@constants';

const DEFAULT_DARK_COLOR_THEME = {
  primaryColor: colors.tangelo,
  backgroundColor: colors.white,
  whiteText: colors.white,
  whiteBackground: colors.white,
  primaryText: colors.black,
  blackText: colors.black,
  blackBackground: colors.black,
  riskLow: colors.riskLow,
  riskModerate: colors.riskModerate,
  cardBackground: colors.antiFlashWhite,
  riskHigh: colors.riskHigh,
  secondaryText: colors.white,
  errorText: colors.red,
  placeholderText: colors.lightSilver,
  borderColor: colors.lightSilver,
  primaryButton: colors.antiqueWhite,
  davyGrey: colors.davyGrey,
  disableButton: colors.lightSilver,
  arrivalButton: colors.water,
  departureButton: colors.yellow,
  snackbarError: colors.red,
  snackbarSuccess: colors.antiqueWhite,
  inputFieldColor: colors.lightGray,
};

const FONT_SET = {
  size: {
    xxsmall: fontsSize.xxsmall,
    xsmall: fontsSize.xsmall,
    small: fontsSize.small,
    medium: fontsSize.medium,
    large: fontsSize.large,
    xlarge: fontsSize.xlarge,
    xxlarge: fontsSize.xxlarge,
    xxxlarge: fontsSize.xxxlarge,
  },
  family: {
    regular: 'Poppins-Medium',
    semibold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
    boldItalic: 'Poppins-BoldItalic',
  },
};

const BORDER_RADIUS = {
  radius1: borders.radius1,
  radius2: borders.radius2,
  radius3: borders.radius3,
  radius4: borders.radius4,
};

export const DEFAULT_DARK_THEME_ID = 'default-light';

export const DEFAULT_DARK_THEME = {
  id: DEFAULT_DARK_THEME_ID,
  color: DEFAULT_DARK_COLOR_THEME,
  size: FONT_SET.size,
  borders: BORDER_RADIUS,
  family: FONT_SET.family,
};
