import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
    {
        languageOptions: {
            globals: {
                ...globals.node
            }
        },
        rules: {
            'indent': ['error', 4]
        }
    },
    pluginJs.configs.recommended,
]
