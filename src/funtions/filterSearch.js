
export const filterSearch = ({ code, name, searchResult }) => searchResult.filter(e => {
    if (code) return e.code.includes(code.toUpperCase())
    else if (name) return e.name.toLowerCase().includes(name.toLowerCase())
})
