type ColorPresetsProps =
    | 'light'
    | 'dark'
    | 'cupcake'
    | 'bumblebee'
    | 'emerald'
    | 'corporate'
    | 'synthwave'
    | 'retro'
    | 'cyberpunk'
    | 'valentine'
    | 'halloween'
    | 'garden'
    | 'forest'
    | 'aqua'
    | 'lofi'
    | 'pastel'
    | 'fantasy'
    | 'wireframe'
    | 'black'
    | 'luxury'
    | 'dracula'
    | 'cmyk'
    | 'autumn'
    | 'business'
    | 'acid'
    | 'lemonade'
    | 'night'
    | 'coffee'
    | 'winter'
    | 'dim'
    | 'nord'
    | 'sunset'

type ColorVariables = {
    [key: string]: string
}

type ThemeStyle = {
    root: ColorVariables
    dark: ColorVariables
}

export const ColorPresets: Record<ColorPresetsProps, ThemeStyle> = {
    light: {
        root: {
            '--background': '0 0% 98.04%',
            '--foreground': '240 10% 3.92%',
            '--primary': '240 100% 33.33%',
            '--primary-foreground': '0 0% 98.04%',
            '--secondary': '240 5.03% 64.9%',
            '--secondary-foreground': '240 5.88% 10%',
            '--danger': '346.84 77.17% 49.8%',
            '--danger-foreground': '0 0% 98.04%',
            '--success': '120 100% 19.61%',
            '--success-foreground': '0 0% 98.04%',
            '--info': '280.13 60.63% 49.8%',
            '--info-foreground': '0 0% 98.04%',
            '--warning': '32.94 100% 50%',
            '--warning-foreground': '0 0% 98.04%',
            '--dark': '240 10% 4%',
            '--dark-foreground': '0 0% 98.04%',
            '--muted': '240 4.88% 83.92%',
            '--muted-foreground': '240 3.83% 46.08%'
        },
        dark: {
            '--background': '240 10% 3.92%',
            '--foreground': '0 0% 98.04%',
            '--primary': '240 67.06% 50%',
            '--primary-foreground': '0 0% 98.04%',
            '--secondary': '240 5.2% 33.92%',
            '--secondary-foreground': '0 0% 98.04%',
            '--danger': '348 83.33% 47.06%',
            '--danger-foreground': '0 0% 98.04%',
            '--success': '120 49.7% 32.75%',
            '--success-foreground': '0 0% 98.04%',
            '--info': '280.31 59.81% 58.04%',
            '--info-foreground': '0 0% 98.04%',
            '--warning': '32 95% 44%',
            '--warning-foreground': '0 0% 98.04%',
            '--dark': '0 0% 98.04%',
            '--dark-foreground': '240 10% 3.92%',
            '--muted': '240 3.7% 15.88%',
            '--muted-foreground': '240 5.03% 64.9%'
        }
    },
    dark: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    cupcake: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    bumblebee: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    emerald: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    corporate: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    synthwave: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    retro: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    cyberpunk: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    valentine: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    halloween: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    garden: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    forest: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    aqua: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    lofi: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    pastel: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    fantasy: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    wireframe: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    black: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    luxury: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    dracula: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    cmyk: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    autumn: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    business: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    acid: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    lemonade: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    night: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    coffee: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    winter: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    dim: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    nord: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    },
    sunset: {
        root: {
            '--background': '#000',
            '--foreground': '#fff'
        },
        dark: {
            '--background': '#123',
            '--foreground': '#9432'
        }
    }
}
