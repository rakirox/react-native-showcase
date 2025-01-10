export type ColorInterface = {
  text: string;
  grey100: string;
  grey200: string;
  grey300: string;
  grey400: string;
  grey500: string;
  grey600: string;
  grey700: string;
  grey800: string;
  grey900: string;
  black100: string;
  black200: string;
  black300: string;
  black400: string;
  black500: string;
  black600: string;
  black700: string;
  black800: string;
  black900: string;
  primary: string;
  secondary: string;
  tertiary: string;
};

export type SizeInterface = {
  global: {
    base: number;
    text: number;
    radius: number;
    padding: number;
  };
  font: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    p: number;
    psm: number;
    sm: number;
    xs: number;
  };
};

export const COLORS: ColorInterface = {
  // text color
  text: '#252F40',
  grey100: '#F7F8FA',
  grey200: '#E4E7EB',
  grey300: '#CBD2D9',
  grey400: '#9AA5B1',
  grey500: '#7B8794',
  grey600: '#616E7C',
  grey700: '#52606D',
  grey800: '#3E4C59',
  grey900: '#323F4B',
  black100: '#1F2933',
  black200: '#111827',
  black300: '#0A0F14',
  black400: '#070A0D',
  black500: '#222222',
  black600: '#333333',
  black700: '#444444',
  black800: '#555555',
  black900: '#666666',
  // base colors
  primary: '#DB3022',
  secondary: '#627594',
  tertiary: '#E8AE4C',
};

export const SIZES: SizeInterface = {
  // global sizes
  global: {
    base: 8,
    text: 14,
    radius: 4,
    padding: 20,
  },
  // font sizes
  font: {
    h1: 44,
    h2: 40,
    h3: 32,
    h4: 24,
    h5: 18,
    p: 16,
    psm: 14,
    sm: 11,
    xs: 10,
  },
};

export type SpacingInterface = {
  xs: number;
  s: number;
  sm: number;
  m: number;
  md: number;
  l: number;
  xl: number;
  xxl: number;
};

const SPACING: SpacingInterface = {
  xs: SIZES.global.base * 0.5, // xs: 4px
  s: SIZES.global.base * 1, // s: 8px
  sm: SIZES.global.base * 2, // sm: 16px
  m: SIZES.global.base * 3, // m: 24px
  md: SIZES.global.base * 4, // md: 32px
  l: SIZES.global.base * 5, // l: 40px
  xl: SIZES.global.base * 6, // xl: 48px
  xxl: SIZES.global.base * 7, // xxl: 56px
};

export const ASSETS: Object = {
  // images
  // logo: require('../assets/images/splash.png'),
  // splash: require('../assets/images/splash.png'),
  // icons
  // home: require('../assets/icons/home.png'),
};
export type ThemeInterface = {
  colors: ColorInterface;
  sizes: SizeInterface & SpacingInterface;
  assets: Object;
};

export const THEME: ThemeInterface = {
  colors: COLORS,
  sizes: {...SIZES, ...SPACING},
  assets: ASSETS,
};
