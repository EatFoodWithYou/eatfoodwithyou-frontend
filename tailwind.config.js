module.exports = {
	purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				// add color here by using - propertyName: "HEX,RGB,HSL", don't forget the quotes! ( Example -> color1: "#000000", next color..)
				navbarColor: "#616265",
				hoverColor: "#F0D582",
				bgColor: "#E5A478",
			},
			fontFamily: {
				prompt: ["Prompt"],
			},
			backgroundImage: {
				heroBg: "url('../assets/wallpaper.jpg')",
				userBg: "url('../assets/userbg.jpg')",
				addBg: "url('../assets/add.jpg')",
				editBg: "url('../assets/editbg.jpg')",
				editInfo: "url('../assets/editinfo.jpg')",
			},
			keyframes: {
				"fade-in-down": {
					"0%": {
						opacity: "0",
					},
					"100%": {
						opacity: "0",
					},
				},
			},
			animation: {
				"fade-in-down": "fade-in-down 2s ease-out",
			},
			variants: {
				extend: {},
			},
			plugins: [],
		},
	},
};
