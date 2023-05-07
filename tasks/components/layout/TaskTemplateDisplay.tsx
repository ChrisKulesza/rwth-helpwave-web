import { tw } from '@helpwave/common/twind'
import type { PropsWithLanguage } from '@helpwave/common/hooks/useTranslation'
import { useTranslation } from '@helpwave/common/hooks/useTranslation'
import { LucideArrowLeftRight } from 'lucide-react'
import { TaskTemplateCard } from '../cards/TaskTemplateCard'
import { Button } from '@helpwave/common/components/Button'
import { AddCard } from '../cards/AddCard'
import { useRouter } from 'next/router'
import type { TaskTemplateDTO } from '../../mutations/task_template_mutations'
import { Span } from '@helpwave/common/components/Span'
import type { Languages } from '@helpwave/common/hooks/useLanguage'

export type TaskTemplateDisplayTranslation = {
  addNewTaskTemplate: string,
  personalTaskTemplates: string,
  wardTaskTemplates: string
}

const defaultTaskTemplateDisplayTranslation: Record<Languages, TaskTemplateDisplayTranslation> = {
  en: {
    addNewTaskTemplate: 'Add new template',
    personalTaskTemplates: 'Personal Task Templates',
    wardTaskTemplates: 'Ward Task Templates'
  },
  de: {
    addNewTaskTemplate: 'Neues Template hinzufügen',
    personalTaskTemplates: 'Persönliche Task Templates',
    wardTaskTemplates: 'Stations Task Templates'
  }
}

export type TaskTemplateDisplayProps = {
  selectedID: string,
  onSelectChange: (taskTemplate: TaskTemplateDTO | undefined) => void,
  taskTemplates: TaskTemplateDTO[],
  variant: 'wardTemplates' | 'personalTemplates'
}

/**
 * A column for showing TaskTemplates either for Ward or Private templates
 */
export const TaskTemplateDisplay = ({
  language,
  selectedID,
  onSelectChange,
  taskTemplates,
  variant
}: PropsWithLanguage<TaskTemplateDisplayTranslation, TaskTemplateDisplayProps>) => {
  const translation = useTranslation(language, defaultTaskTemplateDisplayTranslation)
  const router = useRouter()
  const { uuid, wardID } = router.query

  const switchToPersonalLink = uuid ? `/templates?wardID=${uuid}` : '/templates'
  return (
    <div className={tw('py-4 px-6')}>
      <div className={tw('flex flex-row items-center justify-between mb-4')}>
        <Span type="subsectionTitle">
          {variant === 'personalTemplates' ? translation.personalTaskTemplates : translation.wardTaskTemplates}
        </Span>
        { (variant === 'wardTemplates' || wardID) && (
          <Button
            onClick={() => {
              router.push(variant === 'personalTemplates' ? `/ward/${wardID}/templates` : switchToPersonalLink).then()
            }}
            className={tw('flex flex-row gap-x-1 items-center w-auto')}
          >
            <LucideArrowLeftRight/>
            {variant === 'personalTemplates' ? translation.wardTaskTemplates : translation.personalTaskTemplates}
          </Button>
        )}
      </div>
      {/* TODO replace onClick function to something different */}
      <div className={tw('grid grid-cols-4 gap-6')}>
        {taskTemplates.map(taskTemplate => (
          <TaskTemplateCard
            key={taskTemplate.name}
            name={taskTemplate.name}
            subtaskCount={taskTemplate.subtasks.length}
            isSelected={selectedID === taskTemplate.id}
            onEditClick={() => onSelectChange(taskTemplate)}
            onTileClick={() => onSelectChange(taskTemplate)}
          />
        ))}
        <AddCard
          isSelected={selectedID === ''}
          onTileClick={() => onSelectChange(undefined)}
          text={translation.addNewTaskTemplate}
          className={tw('h-auto')}
        />
      </div>
    </div>
  )
}
