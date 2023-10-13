import { tx } from '@helpwave/common/twind'
import type { ModalHeaderProps, ModalProps } from '@helpwave/common/components/modals/Modal'
import type { TaskDetailViewProps } from './layout/TaskDetailView'
import { Modal } from '@helpwave/common/components/modals/Modal'
import { TaskDetailView } from './layout/TaskDetailView'

export type TaskDetailModalProps =
  Omit<ModalProps, keyof ModalHeaderProps>
  & TaskDetailViewProps

/**
 * A Modal Wrapper for the task detail view
 */
export const TaskDetailModal = ({
  taskId,
  patientId,
  onClose,
  initialStatus,
  modalClassName,
  ...modalProps
}: TaskDetailModalProps) => {
  return (
    <Modal
      modalClassName={tx(modalClassName)}
      {...modalProps}
    >
      <TaskDetailView patientId={patientId} taskId={taskId} onClose={onClose} initialStatus={initialStatus}/>
    </Modal>
  )
}
