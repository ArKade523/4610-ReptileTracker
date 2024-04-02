export const capitalizeFirst = (str: string | string[]) => {
    if (Array.isArray(str)) return str.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('')

    return str.charAt(0).toUpperCase() + str.slice(1)
}
