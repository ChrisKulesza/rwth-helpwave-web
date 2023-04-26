import { tw } from '../twind'
import { useTranslation } from '../hooks/useTranslation'
import { useLanguage } from '../hooks/useLanguage'
import type { Languages } from '../hooks/useLanguage'

type LanguageSwitcherTranslation = {
  toggleLanguage: string
}

const defaultLanguageSwitcherTranslations: Record<Languages, LanguageSwitcherTranslation> = {
  en: {
    toggleLanguage: 'Toggle language',
  },
  de: {
    toggleLanguage: 'Sprache wechseln',
  }
}

// TODO: Basic and naive implementation of a LanguageSwitcher
/**
 * A Button that switches the language
 */
const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()
  const translation = useTranslation(language, defaultLanguageSwitcherTranslations)

  const onClick = () => {
    if (language === 'de') setLanguage('en')
    if (language === 'en') setLanguage('de')
  }

  return (
    <button className={tw('border-2 m-2 p-1 border-gray-800 text-gray-800 w-44')} onClick={onClick}>{translation.toggleLanguage}</button>
  )
}

export default LanguageSwitcher
