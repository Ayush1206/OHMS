import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        porcelain: '#f0f1f2',
        william: '#3b5b6a',
        burntSienna: '#eb6042',
        porsche: '#e5aa5d',
        coustomBlue: '#ADD8E6',
      },
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      const newUtilities = {
        '.input': {
          backgroundColor: '#fff',
          borderWidth: '1px',
          borderColor: '#d1d5db',
          borderRadius: '.375rem', // 6px
          padding: '.5rem .75rem', // 8px 12px
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          '&:focus': {
            borderColor: '#4f46e5',
            boxShadow: '0 0 0 1px #4f46e5',
          },
        },
        '.radio': {
          borderRadius: '100%',
          borderColor: '#d1d5db',
          color: '#4f46e5',
          '&:focus': {
            boxShadow: '0 0 0 2px #4f46e5',
          },
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};

export default config;
