import type { TextareaHTMLAttributes } from 'react'
import { useState } from 'react'
import { tw, tx, css } from '../../twind'
import useSaveDelay from '../../hooks/useSaveDelay'

type TextareaProps = {
  headline?: string,
  id?: string,
  resizable?: boolean,
  onChange?: (text: string) => void,
  disclaimer?: string,
  onEditCompleted?: (text: string) => void
} & Omit<TextareaHTMLAttributes<Element>, 'id' | 'onChange'>

const noop = () => { /* noop */ }

const globalStyles = css`
  /* onfocus textarea border color */
  .textarea-wrapper:focus-within {
    @apply border-hw-primary-700;
  }
`

/**
 * A Textarea component for inputting longer texts
 *
 * The State is managed by the parent
 */
export const Textarea = ({
  headline,
  id,
  resizable = false,
  onChange = noop,
  disclaimer,
  onBlur,
  onEditCompleted = noop,
  ...props
}: TextareaProps) => {
  const [hasFocus, setHasFocus] = useState(false)
  const { restartTimer, clearUpdateTimer } = useSaveDelay(() => undefined, 3000)

  const onEditCompletedWrapper = (text: string) => {
    onEditCompleted(text)
    clearUpdateTimer()
  }

  return (
    <div className={tw(globalStyles)}>
      <div className={`textarea-wrapper ${tw('relative shadow border-2 border-gray-300 rounded-lg')}`}>
        <label className={tw('mx-3 mt-3 block text-gray-700 font-bold')} htmlFor={id}>
          {headline}
        </label>
        <textarea
          id={id}
          className={tx('pt-0 border-transparent focus:border-transparent focus:ring-0 h-32 appearance-none border w-full text-gray-700 leading-tight focus:outline-none', { 'resize-none': !resizable })}
          onChange={(event) => {
            const value = event.target.value
            restartTimer(() => {
              onEditCompletedWrapper(value)
            })
            onChange(value)
          }}
          onFocus={() => {
            setHasFocus(true)
          }}
          onBlur={(event) => {
            if (onBlur) {
              onBlur(event)
            }
            onEditCompletedWrapper(event.target.value)
            setHasFocus(false)
          }}
          {...props}
        >
      </textarea>
      </div>
      {(hasFocus && disclaimer) && (
        <label className={tw('text-hw-negative-500')}>
          {disclaimer}
        </label>
      )}
    </div>
  )
}