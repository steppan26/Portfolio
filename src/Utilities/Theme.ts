interface ITheme{
  clr_bg_primary: string,
  clr_bg_secondary: string,
  clr_text_primary: string,
  clr_text_secondary: string,
}


export const LightTheme: ITheme = {
  clr_bg_primary: 'hsl(210, 25%, 80%)',
  clr_bg_secondary: 'hsl(20, 10%, 10%)',
  clr_text_primary: 'hsl(20, 10%, 10%)',
  clr_text_secondary: 'hsl(210, 10%, 95%)',
}

export const Sizes = {
  medium: '900px',
  small: '600px',
  xs: '375px',
  navbarHeight: '80px',
}
