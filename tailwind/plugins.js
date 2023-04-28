const plugin = require('tailwindcss/plugin')

module.exports = [ 
    require('@tailwindcss/typography'),

    plugin(({ addVariant, e }) => {
        addVariant('before', ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
            return `.${e(`before${separator}${className}`)}::before`;
            });
        });
        addVariant('after', ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
            return `.${e(`after${separator}${className}`)}::after`;
            });
        });
    }),

    plugin(function({ addUtilities }) {
        // TIMELINE
        const timelineUtilities = {
            '.tline': {
                'display': 'block',
                'position': 'relative',
            },
            '.tline-after': {
                'content': '""',
                'position': 'absolute',
                'top': '0',
                'left': '50%',
                'transform': 'translateX(-50%)',
                'width': '1px',
                'height': '100%',

            },
            '.tline-orange-after': {
                'background': '#EE9B00'
            },
            '.tline-black-after': {
                'background': '#070707'
            },
            '.tline-hero-after': {
                'top': '40px !important'
            },
        }

        addUtilities(
            timelineUtilities,
        )
    }),

    plugin(function({ addUtilities }) {
        // BUTTONS
        const buttonUtilities = {
            '.btn': {
                'display': 'flex',
                'flex-direction': 'column',
                'justify-content': 'center',
                'border-radius': '34px',
                'height': '50px',
            },
            '.btn>a': {
                'font-family': 'neuzeit-grotesk, sans-serif',
                'font-size': '18px',
                'font-weight': '600',
                'display': 'flex',
                'padding': '0 45px'
            },
            '.btn.btn-fill-black': {
                'background': '#070707',
                'color': '#EE9B00',
                'border': '1px solid #EE9B00',
            },
            '.btn.btn-fill-black-backdrop': {
                'position': 'relative',
                'background': '#070707',
                'color': '#EE9B00',
                'filter': 'drop-shadow(20px 20px 6px #EE9B00)',
            },
            '.btn.btn-fill-cyan': {
                'background': '#94D2BD',
                'color': '#070707',
                'border': '1px solid #94D2BD',
            },
            '.btn.btn-hollow-cyan': {
                'color': '#94D2BD',
                'border': '1px solid #94D2BD',
            },
            '.btn.btn-fill-orange': {
                'background': '#EE9B00',
                'color': '#070707 !important',
                'border': '1px solid #EE9B00',
            },
            '.btn.btn-hollow-orange': {
                'color': '#EE9B00',
                'border': '1px solid #EE9B00',
            },
            '.btn.btn-hollow-dual': {
                'color': '#EE9B00',
                'border': '1px solid #94D2BD',
            },
        }

        addUtilities(
            buttonUtilities, 
        )
    })
]
