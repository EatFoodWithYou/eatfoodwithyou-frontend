module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // add color here by using - propertyName: "HEX,RGB,HSL", don't forget the quotes! ( Example -> color1: "#000000", next color..)
        backgroundColor: "#E5A478",
        backgroundButton: "#616265",
      },
      fontFamily: {
        prompt: ["Prompt"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
