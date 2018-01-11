// @flow

import {create} from 'jss';
import preset from 'jss-preset-default';
import {SheetsRegistry} from 'react-jss';
import {createMuiTheme} from 'material-ui/styles';
import {purple, grey, green, red, blue} from 'material-ui/colors';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';


const theme = createMuiTheme({
    palette: {
        common: {
            black: "#000",
            white: "#fff",
            transparent: "rgba(0, 0, 0, 0)",
            fullBlack: "rgba(0, 0, 0, 1)",
            darkBlack: "rgba(0, 0, 0, 0.87)",
            lightBlack: "rgba(0, 0, 0, 0.54)",
            minBlack: "rgba(0, 0, 0, 0.26)",
            faintBlack: "rgba(0, 0, 0, 0.12)",
            fullWhite: "rgba(255, 255, 255, 1)",
            darkWhite: "rgba(255, 255, 255, 0.87)",
            lightWhite: "rgba(255, 255, 255, 0.54)"
        },
        type: "light",
        primary: blue, // Purple and green play nicely together.
        secondary: {
            ...green,
            A400: '#00e677',
        },
        error: red,
        shades: {
            dark: {
                text: {
                    primary: "rgba(255, 255, 255, 1)",
                    secondary: "rgba(255, 255, 255, 0.7)",
                    disabled: "rgba(255, 255, 255, 0.5)",
                    hint: "rgba(255, 255, 255, 0.5)",
                    icon: "rgba(255, 255, 255, 0.5)",
                    divider: "rgba(255, 255, 255, 0.12)",
                    lightDivider: "rgba(255, 255, 255, 0.075)"
                },
                input: {
                    bottomLine: "rgba(255, 255, 255, 0.7)",
                    helperText: "rgba(255, 255, 255, 0.7)",
                    labelText: "rgba(255, 255, 255, 0.7)",
                    inputText: "rgba(255, 255, 255, 1)",
                    disabled: "rgba(255, 255, 255, 0.5)"
                },
                action: {
                    active: "rgba(255, 255, 255, 1)",
                    disabled: "rgba(255, 255, 255, 0.3)"
                },
                background: {
                    default: "#303030",
                    paper: "#424242",
                    appBar: "#212121",
                    contentFrame: "#212121",
                    status: "#000"
                }
            },
            light: {
                text: {
                    primary: "rgba(0, 0, 0, 0.87)",
                    secondary: "rgba(0, 0, 0, 0.54)",
                    disabled: "rgba(0, 0, 0, 0.38)",
                    hint: "rgba(0, 0, 0, 0.38)",
                    icon: "rgba(0, 0, 0, 0.38)",
                    divider: "rgba(0, 0, 0, 0.12)",
                    lightDivider: "rgba(0, 0, 0, 0.075)"
                },
                input: {
                    bottomLine: "rgba(0, 0, 0, 0.42)",
                    helperText: "rgba(0, 0, 0, 0.54)",
                    labelText: "rgba(0, 0, 0, 0.54)",
                    inputText: "rgba(0, 0, 0, 0.87)",
                    disabled: "rgba(0, 0, 0, 0.42)"
                },
                action: {
                    active: "rgba(0, 0, 0, 0.54)",
                    disabled: "rgba(0, 0, 0, 0.26)"
                },
                background: {
                    default: "#fafafa",
                    paper: "#fff",
                    appBar: "#f5f5f5",
                    contentFrame: "#eeeeee"
                }
            }
        },
        text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(0, 0, 0, 0.38)",
            hint: "rgba(0, 0, 0, 0.38)",
            icon: "rgba(0, 0, 0, 0.38)",
            divider: "rgba(0, 0, 0, 0.12)",
            lightDivider: "rgba(0, 0, 0, 0.075)"
        },
        input: {
            bottomLine: "rgba(0, 0, 0, 0.42)",
            helperText: "rgba(0, 0, 0, 0.54)",
            labelText: "rgba(0, 0, 0, 0.54)",
            inputText: "rgba(0, 0, 0, 0.87)",
            disabled: "rgba(0, 0, 0, 0.42)"
        },
        action: {
            active: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(0, 0, 0, 0.26)"
        },
        background: {
            default: "#fafafa",
            paper: "#fff",
            appBar: "#f5f5f5",
            contentFrame: "#eeeeee"
        },
    },
    typography: {
        fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        display4: {
            fontSize: 112,
            fontWeight: 300,
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            letterSpacing: "-.04em",
            lineHeight: 1,
            color: "rgba(0, 0, 0, 0.54)"
        },
        display3: {
            fontSize: 56,
            fontWeight: 400,
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            letterSpacing: "-.02em",
            lineHeight: 1.35,
            color: "rgba(0, 0, 0, 0.54)"
        },
        display2: {
            fontSize: 45,
            fontWeight: 400,
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            lineHeight: "48px",
            color: "rgba(0, 0, 0, 0.54)"
        },
        display1: {
            fontSize: 34,
            fontWeight: 400,
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            lineHeight: "40px",
            color: "rgba(0, 0, 0, 0.54)"
        },
        headline: {
            fontSize: 24,
            fontWeight: 400,
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            lineHeight: "32px",
            color: "rgba(0, 0, 0, 0.87)"
        },
        title: {
            fontSize: 21,
            fontWeight: 500,
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            lineHeight: 1,
            color: "rgba(0, 0, 0, 0.87)"
        },
        subheading: {
            fontSize: 16,
            fontWeight: 400,
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            lineHeight: "24px",
            color: "rgba(0, 0, 0, 0.87)"
        },
        body2: {
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            lineHeight: "24px",
            color: "rgba(0, 0, 0, 0.87)"
        },
        body1: {
            fontSize: 14,
            fontWeight: 400,
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            lineHeight: "20px",
            color: "rgba(0, 0, 0, 0.87)"
        },
        caption: {
            fontSize: 12,
            fontWeight: 400,
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            lineHeight: 1,
            color: "rgba(0, 0, 0, 0.54)"
        },
        button: {
            fontSize: 14,
            textTransform: "uppercase",
            fontWeight: 500,
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
        }
    },
    mixins: {},
    spacing: {
        unit: 8
    },
    zIndex: {
        mobileStepper: 900,
        menu: 1000,
        appBar: 1100,
        drawerOverlay: 1200,
        navDrawer: 1300,
        dialogOverlay: 1400,
        dialog: 1500,
        layer: 2000,
        popover: 2100,
        snackbar: 2900,
        tooltip: 3000
    },
    headerOptions: {
        grey: {
            checkbox: grey[700]
        }
    }
});

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

export default function createContext() {
    return {
        jss,
        theme,
        // This is needed in order to deduplicate the injection of CSS in the page.
        sheetsManager: new Map(),
        // This is needed in order to inject the critical CSS.
        sheetsRegistry: new SheetsRegistry(),
    };
}
