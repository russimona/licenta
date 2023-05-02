import { Colors } from "@/utils/colors";
import { createTheme } from "@mui/material/styles";
import { Theme } from "@emotion/react";

export const theme: Theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1024,
      xl: 1536,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        color: "primary",
        size: "medium",
        margin: "normal",
      },
    },

    MuiButton: {
      defaultProps: {
        fullWidth: true,
        size: "large",
        sx: {
          fontSize: "16px",
          backgroundColor: "primary.main",
          margin: "20px 0px 8px 0px",
          color: "common.white",
          border: "none",
          boxShadow: "none",
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: "primary.main",
          },
          "&:disabled": {
            backgroundColor: "#000000",
            color: "primary.contrastText",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: Colors.background,
      contrastText: Colors.darkPurple,
      light: Colors.gray,
    },
    secondary: {
      main: Colors.background,
      contrastText: Colors.darkYellow,
      light: Colors.backfroundGray,
    },
    error: {
      main: Colors.lightRed,
      light: Colors.red,
    },
    warning: {
      main: Colors.darkYellow,
    },
    success: {
      main: Colors.green,
      light: Colors.lightGreenWeekend,
    },
    info: {
      main: Colors.darkYellow,
      light: Colors.background,
    },
    common: {
      white: Colors.white,
      black: Colors.black,
    },
  },
  typography: {
    fontFamily: "Public Sans",
    h1: {
      fontSize: "22px",
    },
    h2: {
      fontSize: "20px",
    },
    h3: {
      fontSize: "18px",
    },
    h4: {
      fontSize: "16px",
    },
    h5: {
      fontSize: "15px",
    },
    h6: {
      fontSize: "14px",
    },
    body1: {
      fontSize: "13px",
    },
    body2: {
      fontSize: "12px",
    },
    button: {
      textTransform: "none",
      fontSize: "14px",
    },
  },
});
function sx(arg0: {
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    WebkitAppearance: string;
    margin: number;
  };
  "input[type=number]": { MozAppearance: string };
}) {
  throw new Error("Function not implemented.");
}
