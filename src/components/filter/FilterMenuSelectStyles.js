export default {
    option: (base, { isFocused, isSelected }) => ({
        ...base,
        fontSize: "16px",
        border: `1px solid #F6F6F6`,
        boxSizing: "border-box",
        padding: "12px",
        backgroundColor: isFocused ? "#F2F7FB" : "white",
        color: isFocused ? "#005AAA" : "black"
    }),
    control: (baseStyles, state) => ({
        ...baseStyles,
        fontSize: "16px",
        border: "none",
        backgroundColor: "#F6F6F6",
        borderRadius: "12px",
        padding: "8px"
    }),
    indicatorSeparator: () => ({
        background: "transparent"
    }),
    menu: (base) => ({
        ...base,
        borderRadius: "12px",
        paddingTop: "8px",
        paddingBottom: "8px"
    }),

    multiValue: (styles) => ({
        ...styles,
        background: "none",
    }),
    multiValueLabel: (styles) => ({
        ...styles,
        color: "#005AAA",
        fontSize: "16px",
    }),
    multiValueRemove: (styles) => ({
        ...styles,
        color: "#005AAA",
        ':hover': {
            color: 'white',
            background: "#005AAA"
        },
    }),
}