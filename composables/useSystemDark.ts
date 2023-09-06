
export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export const setDark = (value: boolean) => isDark.value = value