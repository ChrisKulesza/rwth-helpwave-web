import { tw } from '../../twind'
import type { PropsWithChildren } from 'react'
import type { ModalProps } from './Modal'
import { Modal } from './Modal'
import { Button } from '../Button'
import type { PropsWithLanguage } from '../../hooks/useTranslation'
import { useTranslation } from '../../hooks/useTranslation'

type ConfirmDialogTranslation = {
  confirm: string,
  cancel: string,
  decline: string
}

export type ConfirmDialogType = 'positive' | 'negative' | 'neutral'

const defaultConfirmDialogTranslation = {
  en: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    decline: 'Decline'
  },
  de: {
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
    decline: 'Ablehnen'
  }
}

type ConfirmDialogProps = ModalProps & {
  isShowingDecline?: boolean,
  requireAnswer?: boolean,
  onCancel?: () => void,
  onConfirm: () => void,
  onDecline?: () => void,
  confirmType?: ConfirmDialogType
}

export const ConfirmDialog = ({
  language,
  children,
  isOpen,
  title,
  description,
  onCancel,
  onConfirm,
  onDecline,
  onBackgroundClick,
  confirmType = 'positive'
}: PropsWithLanguage<ConfirmDialogTranslation, PropsWithChildren<ConfirmDialogProps>>) => {
  const translation = useTranslation(language, defaultConfirmDialogTranslation)
  return (
    <Modal
      isOpen={isOpen}
      title={title} description={description}
      onBackgroundClick={onBackgroundClick}
    >
      {children}
      <div className={tw('flex flex-row mt-3 gap-x-4 justify-end')}>
        {onCancel && (
          <Button color="neutral" onClick={onCancel}>
            {translation.cancel}
          </Button>
        )}
        {onDecline && (
          <Button color="negative" onClick={onDecline}>
            {translation.decline}
          </Button>
        )}
        <Button autoFocus color={confirmType} onClick={onConfirm}>
          {translation.confirm}
        </Button>
      </div>
    </Modal>
  )
}
