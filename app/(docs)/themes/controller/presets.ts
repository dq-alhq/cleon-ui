type ColorVariables = {
    [key: string]: string
}

type ThemeStyle = {
    light: ColorVariables
    dark: ColorVariables
}

export const radixColors: Record<RadixColors, ThemeStyle> = {
    shadcn: {
        light: {
            '--primary': '240 5.9% 10%',
            '--primary-foreground': '0 0% 98%',
            '--secondary': '240 5.03% 64.9%',
            '--secondary-foreground': '240 5.9% 10%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '0 0% 98%',
            '--primary-foreground': '240 5.9% 10%',
            '--secondary': '240 3.7% 15.88%',
            '--secondary-foreground': '0 0% 98%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    tomato: {
        light: {
            '--primary': '10 78% 54%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '12 100% 91%',
            '--secondary-foreground': '8 50% 24%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '10 78% 54%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '4 64% 19%',
            '--secondary-foreground': '10 86% 89%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    red: {
        light: {
            '--primary': '358 75% 59%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '358 100% 93%',
            '--secondary-foreground': '351 63% 24%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '358 75% 59%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '348 68% 19%',
            '--secondary-foreground': '350 100% 91%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    ruby: {
        light: {
            '--primary': '348 75% 59%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '351 100% 93%',
            '--secondary-foreground': '344 63% 24%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '348 75% 59%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '342 61% 19%',
            '--secondary-foreground': '340 96% 91%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    crimson: {
        light: {
            '--primary': '336 80% 58%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '341 94% 93%',
            '--secondary-foreground': '332 63% 24%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '336 80% 58%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '331 62% 19%',
            '--secondary-foreground': '330 91% 91%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    pink: {
        light: {
            '--primary': '322 65% 55%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '323 79% 92%',
            '--secondary-foreground': '320 70% 23%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '322 65% 55%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '315 58% 19%',
            '--secondary-foreground': '326 92% 91%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    plum: {
        light: {
            '--primary': '292 45% 51%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '298 65% 92%',
            '--secondary-foreground': '291 58% 23%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '292 45% 51%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '297 42% 20%',
            '--secondary-foreground': '300 59% 89%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    purple: {
        light: {
            '--primary': '272 51% 54%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '277 81% 94%',
            '--secondary-foreground': '270 50% 25%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '272 51% 54%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '277 39% 22%',
            '--secondary-foreground': '275 77% 92%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    violet: {
        light: {
            '--primary': '252 56% 57%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '256 100% 95%',
            '--secondary-foreground': '249 43% 26%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '252 56% 57%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '256 42% 25%',
            '--secondary-foreground': '249 94% 93%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    iris: {
        light: {
            '--primary': '240 60% 60%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '238 100% 95%',
            '--secondary-foreground': '238 43% 27%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '240 60% 60%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '236 45% 27%',
            '--secondary-foreground': '242 94% 94%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    indigo: {
        light: {
            '--primary': '226 70% 55%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '224 100% 94%',
            '--secondary-foreground': '226 50% 24%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '226 70% 55%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '225 54% 25%',
            '--secondary-foreground': '224 100% 92%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    blue: {
        light: {
            '--primary': '206 100% 50%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '203 100% 92%',
            '--secondary-foreground': '216 71% 23%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '206 100% 50%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '209 100% 19%',
            '--secondary-foreground': '205 100% 88%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    cyan: {
        light: {
            '--primary': '191 100% 39%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '187 71% 88%',
            '--secondary-foreground': '192 69% 17%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '191 100% 39%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '193 100% 14%',
            '--secondary-foreground': '190 80% 84%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    teal: {
        light: {
            '--primary': '173 80% 36%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '166 62% 88%',
            '--secondary-foreground': '174 65% 15%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '173 80% 36%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '176 93% 12%',
            '--secondary-foreground': '163 69% 81%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    jade: {
        light: {
            '--primary': '164 60% 40%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '149 49% 89%',
            '--secondary-foreground': '160 34% 17%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '164 60% 40%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '161 69% 14%',
            '--secondary-foreground': '155 69% 81%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    green: {
        light: {
            '--primary': '151 55% 42%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '140 49% 89%',
            '--secondary-foreground': '155 40% 16%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '151 55% 42%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '154 55% 15%',
            '--secondary-foreground': '144 70% 82%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    grass: {
        light: {
            '--primary': '131 41% 46%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '123 45% 90%',
            '--secondary-foreground': '131 30% 18%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '131 41% 46%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '134 33% 17%',
            '--secondary-foreground': '120 61% 85%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    bronze: {
        light: {
            '--primary': '18 20% 54%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '19 33% 91%',
            '--secondary-foreground': '12 22% 22%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '18 20% 54%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '20 10% 17%',
            '--secondary-foreground': '21 36% 89%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    gold: {
        light: {
            '--primary': '36 20% 49%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '44 26% 89%',
            '--secondary-foreground': '38 16% 20%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '36 20% 49%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '43 8% 16%',
            '--secondary-foreground': '36 25% 88%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    brown: {
        light: {
            '--primary': '28 34% 51%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '29 43% 90%',
            '--secondary-foreground': '19 15% 21%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '28 34% 51%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '26 19% 16%',
            '--secondary-foreground': '35 61% 87%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    orange: {
        light: {
            '--primary': '23 93% 53%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '34 100% 85%',
            '--secondary-foreground': '16 50% 23%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '23 93% 53%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '28 100% 14%',
            '--secondary-foreground': '30 100% 88%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    amber: {
        light: {
            '--primary': '42 100% 62%',
            '--primary-foreground': '0 0% 13%',
            '--secondary': '50 100% 81%',
            '--secondary-foreground': '24 40% 22%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '42 100% 62%',
            '--primary-foreground': '0 0% 13%',
            '--secondary': '37 100% 12%',
            '--secondary-foreground': '41 100% 85%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    yellow: {
        light: {
            '--primary': '53 100% 58%',
            '--primary-foreground': '0 0% 13%',
            '--secondary': '53 100% 79%',
            '--secondary-foreground': '42 39% 20%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '53 100% 58%',
            '--primary-foreground': '0 0% 13%',
            '--secondary': '48 100% 11%',
            '--secondary-foreground': '53 79% 84%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    lime: {
        light: {
            '--primary': '81 80% 66%',
            '--primary-foreground': '0 0% 13%',
            '--secondary': '76 63% 84%',
            '--secondary-foreground': '75 39% 18%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '81 80% 66%',
            '--primary-foreground': '0 0% 13%',
            '--secondary': '92 31% 16%',
            '--secondary-foreground': '80 79% 85%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    mint: {
        light: {
            '--primary': '167 70% 72%',
            '--primary-foreground': '0 0% 13%',
            '--secondary': '165 67% 87%',
            '--secondary-foreground': '171 51% 17%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '167 70% 72%',
            '--primary-foreground': '0 0% 13%',
            '--secondary': '178 100% 11%',
            '--secondary-foreground': '156 71% 86%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    },
    sky: {
        light: {
            '--primary': '193 98% 74%',
            '--primary-foreground': '0 0% 13%',
            '--secondary': '195 80% 90%',
            '--secondary-foreground': '205 50% 23%',
            '--danger': '10 78% 54%',
            '--danger-foreground': '0 0% 98%',
            '--success': '131 43% 43%',
            '--success-foreground': '0 0% 98%',
            '--warning': '24 100% 47%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 45% 50%',
            '--info-foreground': '0 0% 98%'
        },
        dark: {
            '--primary': '193 98% 74%',
            '--primary-foreground': '0 0% 13%',
            '--secondary': '208 67% 20%',
            '--secondary-foreground': '192 100% 88%',
            '--danger': '10 73% 51%',
            '--danger-foreground': '0 0% 98%',
            '--success': '132 50% 33%',
            '--success-foreground': '0 0% 98%',
            '--warning': '23 93% 53%',
            '--warning-foreground': '0 0% 98%',
            '--info': '272 51% 54%',
            '--info-foreground': '0 0% 98%'
        }
    }
}

export const radixBaseColors: Record<RadixBaseColors, ThemeStyle> = {
    zinc: {
        light: {
            '--background': '0 0% 98.04%',
            '--foreground': '240 10% 3.92%',
            '--muted': '240 4.88% 83.92%',
            '--muted-foreground': '240 3.83% 46.08%',
            '--dark': '240 10% 3.92%',
            '--dark-foreground': '0 0% 98.04%'
        },
        dark: {
            '--background': '240 10% 3.92%',
            '--foreground': '0 0% 98.04%',
            '--muted': '240 3.7% 15.88%',
            '--muted-foreground': '240 5.03% 64.9%',
            '--dark': '0 0% 98.04%',
            '--dark-foreground': '240 10% 3.92%'
        }
    },
    olive: {
        light: {
            '--background': '120 20% 99%',
            '--foreground': '108 8% 12%',
            '--muted': '120 5% 88%',
            '--muted-foreground': '108 8% 12%',
            '--dark': '108 8% 12%',
            '--dark-foreground': '120 20% 99%'
        },
        dark: {
            '--background': '90 6% 7%',
            '--foreground': '120 6% 93%',
            '--muted': '100 3% 19%',
            '--muted-foreground': '120 6% 93%',
            '--dark': '120 6% 93%',
            '--dark-foreground': '90 6% 7%'
        }
    },
    gray: {
        light: {
            '--background': '0 0% 99%',
            '--foreground': '0 0% 13%',
            '--muted': '0 0% 88%',
            '--muted-foreground': '0 0% 13%',
            '--dark': '0 0% 13%',
            '--dark-foreground': '0 0% 99%'
        },
        dark: {
            '--background': '0 0% 7%',
            '--foreground': '0 0% 93%',
            '--muted': '0 0% 19%',
            '--muted-foreground': '0 0% 93%',
            '--dark': '0 0% 93%',
            '--dark-foreground': '0 0% 7%'
        }
    },
    mauve: {
        light: {
            '--background': '300 20% 99%',
            '--foreground': '257 10% 14%',
            '--muted': '274 12% 89%',
            '--muted-foreground': '257 10% 14%',
            '--dark': '257 10% 14%',
            '--dark-foreground': '300 20% 99%'
        },
        dark: {
            '--background': '270 6% 7%',
            '--foreground': '240 6% 94%',
            '--muted': '264 5% 20%',
            '--muted-foreground': '240 6% 94%',
            '--dark': '240 6% 94%',
            '--dark-foreground': '270 6% 7%'
        }
    },
    sage: {
        light: {
            '--background': '150 33% 99%',
            '--foreground': '154 12% 12%',
            '--muted': '140 5% 88%',
            '--muted-foreground': '154 12% 12%',
            '--dark': '154 12% 12%',
            '--dark-foreground': '150 33% 99%'
        },
        dark: {
            '--background': '150 6% 7%',
            '--foreground': '150 6% 93%',
            '--muted': '160 3% 19%',
            '--muted-foreground': '150 6% 93%',
            '--dark': '150 6% 93%',
            '--dark-foreground': '150 6% 7%'
        }
    },
    sand: {
        light: {
            '--background': '60 20% 99%',
            '--foreground': '48 8% 12%',
            '--muted': '45 6% 88%',
            '--muted-foreground': '48 8% 12%',
            '--dark-foreground': '60 20% 99%',
            '--dark': '48 8% 12%'
        },
        dark: {
            '--background': '60 3% 6%',
            '--foreground': '60 6% 93%',
            '--muted': '60 3% 19%',
            '--muted-foreground': '60 6% 93%',
            '--dark': '60 6% 93%',
            '--dark-foreground': '60 3% 6%'
        }
    },
    slate: {
        light: {
            '--background': '240 20% 99%',
            '--foreground': '210 13% 13%',
            '--muted': '230 11% 89%',
            '--muted-foreground': '210 13% 13%',
            '--dark': '210 13% 13%',
            '--dark-foreground': '240 20% 99%'
        },
        dark: {
            '--background': '240 6% 7%',
            '--foreground': '220 9% 94%',
            '--muted': '214 7% 19%',
            '--muted-foreground': '220 9% 94%',
            '--dark': '220 9% 94%',
            '--dark-foreground': '240 6% 7%'
        }
    }
}

export const tailwindColors: Record<TailwindColors, ThemeStyle> = {
    'tw-red': {
        light: {
            '--primary': '0 72.2% 50.6%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '0 90.6% 70.8%',
            '--secondary-foreground': '0 74.7% 15.5%',
            '--danger': '240 5.2% 33.9%',
            '--danger-foreground': '0 0% 93%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '0 72.2% 50.6%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '0 90.6% 70.8%',
            '--secondary-foreground': '0 74.7% 15.5%',
            '--danger': '240 5.2% 33.9%',
            '--danger-foreground': '0 0% 93%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-orange': {
        light: {
            '--primary': '24.6 95% 53.1%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '27 96% 61%',
            '--secondary-foreground': '8 50% 24%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '24.6 95% 53.1%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '15 79.1% 33.7%',
            '--secondary-foreground': '30.7 97.2% 72.4%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-amber': {
        light: {
            '--primary': '32.1 94.6% 43.7%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '45.9 96.7% 64.5%',
            '--secondary-foreground': '20.9 91.7% 14.1%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '32.1 94.6% 43.7%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '21.7 77.8% 26.5%',
            '--secondary-foreground': '32.1 97.7% 83.1%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-yellow': {
        light: {
            '--primary': '45.4 93.4% 47.5%',
            '--primary-foreground': '26 83.3% 14.1%',
            '--secondary': '50.4 97.8% 63.5%',
            '--secondary-foreground': '26 83.3% 14.1%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '45.4 93.4% 47.5%',
            '--primary-foreground': '26 83.3% 14.1%',
            '--secondary': '35.5 91.7% 32.9%',
            '--secondary-foreground': '52.8 98.3% 76.9%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-lime': {
        light: {
            '--primary': '84.8 85.2% 34.5%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '82.7 78% 55.5%',
            '--secondary-foreground': '89.3 80.4% 10%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '84.8 85.2% 34.5%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '86.3 69% 22.7%',
            '--secondary-foreground': '141.7 76.6% 73.1%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-green': {
        light: {
            '--primary': '142.1 76.2% 36.3%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '141.7 76.6% 73.1%',
            '--secondary-foreground': '144.9 80.4% 10%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '224.3 76.3% 48%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '142.1 76.2% 36.3%',
            '--primary-foreground': '10 86% 89%',
            '--secondary': '143.8 61.2% 20.2%',
            '--secondary-foreground': '141.7 76.6% 73.1%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '200.4 98% 39.4%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-emerald': {
        light: {
            '--primary': '161.4 93.5% 30.4%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '156.2 71.6% 66.9%',
            '--secondary-foreground': '165.7 91.3% 9%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '224.3 76.3% 48%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '162.9 93.5% 24.3%',
            '--primary-foreground': '10 86% 89%',
            '--secondary': '164.2 85.7% 16.5%',
            '--secondary-foreground': '156.2 71.6% 66.9%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '200.4 98% 39.4%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-teal': {
        light: {
            '--primary': '174.7 83.9% 31.6%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '170.6 76.9% 64.3%',
            '--secondary-foreground': '178.6 84.3% 10%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '224.3 76.3% 48%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '175.3 77.4% 26.1%',
            '--primary-foreground': '10 86% 89%',
            '--secondary': '175.9 60.8% 19%',
            '--secondary-foreground': '170.6 76.9% 64.3%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '200.4 98% 39.4%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-cyan': {
        light: {
            '--primary': '191.6 91.4% 36.5%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '187.9 85.7% 53.3%',
            '--secondary-foreground': '197 78.9% 14.9%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '192.9 82.3% 31%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '197 78.9% 14.9%',
            '--secondary-foreground': '187 92.4% 69%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-sky': {
        light: {
            '--primary': '200.4 98% 39.4%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '198.4 93.2% 59.6%',
            '--secondary-foreground': '204 80.2% 15.9%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '200.4 98% 39.4%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '202 80.3% 23.9%',
            '--secondary-foreground': '199.4 95.5% 73.9%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-blue': {
        light: {
            '--primary': '224.3 76.3% 48%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '211.7 96.4% 78.4%',
            '--secondary-foreground': '8 50% 24%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '221.2 83.2% 53.3%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '226.2 57% 21%',
            '--secondary-foreground': '211.7 96.4% 78.4%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-indigo': {
        light: {
            '--primary': '243.4 75.4% 58.6%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '229.7 93.5% 81.8%',
            '--secondary-foreground': '243.8 47.1% 20%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '243.4 75.4% 58.6%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '243.8 47.1% 20%',
            '--secondary-foreground': '228 96.5% 88.8%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-violet': {
        light: {
            '--primary': '262.1 83.3% 57.8%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '252.5 94.7% 85.1%',
            '--secondary-foreground': '261.2 72.6% 22.9%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '224.3 76.3% 48%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '263.4 70% 50.4%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '261.2 72.6% 22.9%',
            '--secondary-foreground': '252.5 94.7% 85.1%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '224.3 76.3% 48%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-purple': {
        light: {
            '--primary': '271.5 81.3% 55.9%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '270 95.2% 75.3%',
            '--secondary-foreground': '273.5 86.9% 21%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '224.3 76.3% 48%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '272.1 71.7% 47.1%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '273.5 86.9% 21%',
            '--secondary-foreground': '269.2 97.4% 85.1%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '224.3 76.3% 48%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-fuchsia': {
        light: {
            '--primary': '293.4 69.5% 48.8%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '269.2 97.4% 85.1%',
            '--secondary-foreground': '296.8 90.2% 16.1%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '224.3 76.3% 48%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '294.7 72.4% 39.8%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '296.8 90.2% 16.1%',
            '--secondary-foreground': '269.2 97.4% 85.1%',
            '--danger': '0 72.22% 50.59%',
            '--danger-foreground': '0 0% 98%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '224.3 76.3% 48%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-pink': {
        light: {
            '--primary': '333.3 71.4% 50.6%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '327.4 87.1% 81.8%',
            '--secondary-foreground': '336.2 83.9% 17.1%',
            '--danger': '240 5.2% 33.9%',
            '--danger-foreground': '0 0% 93%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '333.3 71.4% 50.6%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '336.2 83.9% 17.1%',
            '--secondary-foreground': '327.4 87.1% 81.8%',
            '--danger': '240 5.2% 33.9%',
            '--danger-foreground': '0 0% 93%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        }
    },
    'tw-rose': {
        light: {
            '--primary': '346.8 77.2% 49.8%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '351.3 94.5% 71.4%',
            '--secondary-foreground': '343.1 87.7% 15.9%',
            '--danger': '240 5.2% 33.9%',
            '--danger-foreground': '0 0% 93%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        },
        dark: {
            '--primary': '346.8 77.2% 49.8%',
            '--primary-foreground': '0 0% 93%',
            '--secondary': '341.5 75.5% 30.4%',
            '--secondary-foreground': '352.7 96.1% 90%',
            '--danger': '240 5.2% 33.9%',
            '--danger-foreground': '0 0% 93%',
            '--success': '142.1 76.2% 36.3%',
            '--success-foreground': '0 0% 98.04%',
            '--warning': '24.6 95% 53.1%',
            '--warning-foreground': '0 0% 98.04%',
            '--info': '294.7 72.4% 39.8%',
            '--info-foreground': '0 0% 98.04%'
        }
    }
}

export const tailwindBaseColors: Record<TailwindBaseColors, ThemeStyle> = {
    'tw-slate': {
        light: {
            '--background': '240 20% 99%',
            '--foreground': '210 13% 13%',
            '--muted': '230 11% 89%',
            '--muted-foreground': '210 13% 13%',
            '--dark': '210 13% 13%',
            '--dark-foreground': '240 20% 99%'
        },
        dark: {
            '--background': '240 6% 7%',
            '--foreground': '220 9% 94%',
            '--muted': '214 7% 19%',
            '--muted-foreground': '220 9% 94%',
            '--dark': '220 9% 94%',
            '--dark-foreground': '240 6% 7%'
        }
    },
    'tw-gray': {
        light: {
            '--background': '0 0% 99%',
            '--foreground': '0 0% 13%',
            '--muted': '0 0% 88%',
            '--muted-foreground': '0 0% 13%',
            '--dark': '0 0% 13%',
            '--dark-foreground': '0 0% 99%'
        },
        dark: {
            '--background': '0 0% 7%',
            '--foreground': '0 0% 93%',
            '--muted': '0 0% 19%',
            '--muted-foreground': '0 0% 93%',
            '--dark': '0 0% 93%',
            '--dark-foreground': '0 0% 7%'
        }
    },
    'tw-zinc': {
        light: {
            '--background': '0 0% 98.04%',
            '--foreground': '240 10% 3.92%',
            '--muted': '240 4.88% 83.92%',
            '--muted-foreground': '240 3.83% 46.08%',
            '--dark': '240 10% 3.92%',
            '--dark-foreground': '0 0% 98.04%'
        },
        dark: {
            '--background': '240 10% 3.92%',
            '--foreground': '0 0% 98.04%',
            '--muted': '240 3.7% 15.88%',
            '--muted-foreground': '240 5.03% 64.9%',
            '--dark': '0 0% 98.04%',
            '--dark-foreground': '240 10% 3.92%'
        }
    },
    'tw-neutral': {
        light: {
            '--background': '150 33% 99%',
            '--foreground': '154 12% 12%',
            '--muted': '140 5% 88%',
            '--muted-foreground': '154 12% 12%',
            '--dark': '154 12% 12%',
            '--dark-foreground': '150 33% 99%'
        },
        dark: {
            '--background': '150 6% 7%',
            '--foreground': '150 6% 93%',
            '--muted': '160 3% 19%',
            '--muted-foreground': '150 6% 93%',
            '--dark': '150 6% 93%',
            '--dark-foreground': '150 6% 7%'
        }
    },
    'tw-stone': {
        light: {
            '--background': '60 20% 99%',
            '--foreground': '48 8% 12%',
            '--muted': '45 6% 88%',
            '--muted-foreground': '48 8% 12%',
            '--dark-foreground': '60 20% 99%',
            '--dark': '48 8% 12%'
        },
        dark: {
            '--background': '60 3% 6%',
            '--foreground': '60 6% 93%',
            '--muted': '60 3% 19%',
            '--muted-foreground': '60 6% 93%',
            '--dark': '60 6% 93%',
            '--dark-foreground': '60 3% 6%'
        }
    }
}

export const defaultColors = {
    light: {
        '--background': '0 0% 98.04%',
        '--foreground': '240 10% 3.92%',
        '--primary': '224.3 76.3% 48%',
        '--primary-foreground': '0 0% 98.04%',
        '--secondary': '211.7 96.4% 78.4%',
        '--secondary-foreground': '226.2 57% 21%',
        '--danger': '0 72.22% 50.59%',
        '--danger-foreground': '0 0% 98.04%',
        '--success': '142.1 76.2% 36.3%',
        '--success-foreground': '0 0% 98.04%',
        '--warning': '24.6 95% 53.1%',
        '--warning-foreground': '0 0% 98.04%',
        '--info': '294.7 72.4% 39.8%',
        '--info-foreground': '0 0% 98.04%',
        '--dark': '240 10% 4%',
        '--dark-foreground': '0 0% 98.04%',
        '--muted': '240 4.88% 83.92%',
        '--muted-foreground': '240 3.83% 46.08%'
    },
    dark: {
        '--background': '240 10% 3.92%',
        '--foreground': '0 0% 98.04%',
        '--primary': '221.2 83.2% 53.3%',
        '--primary-foreground': '0 0% 98.04%',
        '--secondary': '226.2 57% 21%',
        '--secondary-foreground': '211.7 96.4% 78.4%',
        '--danger': '0 72.2% 50.6%',
        '--danger-foreground': '0 0% 98.04%',
        '--success': '142.1 76.2% 36.3%',
        '--success-foreground': '0 0% 98.04%',
        '--warning': '17.5 88.3% 40.4%',
        '--warning-foreground': '0 0% 98.04%',
        '--info': '294.7 72.4% 39.8%',
        '--info-foreground': '0 0% 98.04%',
        '--dark': '0 0% 98.04%',
        '--dark-foreground': '240 10% 3.92%',
        '--muted': '240 3.7% 15.88%',
        '--muted-foreground': '240 5.03% 64.9%'
    }
}

export type TailwindColors =
    | 'tw-red'
    | 'tw-orange'
    | 'tw-amber'
    | 'tw-yellow'
    | 'tw-lime'
    | 'tw-green'
    | 'tw-emerald'
    | 'tw-teal'
    | 'tw-cyan'
    | 'tw-sky'
    | 'tw-blue'
    | 'tw-indigo'
    | 'tw-violet'
    | 'tw-purple'
    | 'tw-fuchsia'
    | 'tw-pink'
    | 'tw-rose'

export type TailwindBaseColors =
    | 'tw-slate'
    | 'tw-gray'
    | 'tw-zinc'
    | 'tw-neutral'
    | 'tw-stone'

export type RadixColors =
    | 'shadcn'
    | 'tomato'
    | 'red'
    | 'ruby'
    | 'crimson'
    | 'pink'
    | 'plum'
    | 'purple'
    | 'violet'
    | 'iris'
    | 'indigo'
    | 'blue'
    | 'cyan'
    | 'teal'
    | 'jade'
    | 'green'
    | 'grass'
    | 'bronze'
    | 'gold'
    | 'brown'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'mint'
    | 'sky'

export type RadixBaseColors =
    | 'zinc'
    | 'olive'
    | 'gray'
    | 'mauve'
    | 'sage'
    | 'sand'
    | 'slate'
