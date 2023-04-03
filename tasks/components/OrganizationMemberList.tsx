import { useState } from 'react'
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
import { tw } from '@helpwave/common/twind/index'
import type { Languages } from '@helpwave/common/hooks/useLanguage'
import type { PropsWithLanguage } from '@helpwave/common/hooks/useTranslation'
import { useTranslation } from '@helpwave/common/hooks/useTranslation'
import Dropdown from '../icons/TriangleDown'
import { Pagination } from './Pagination'
import { TriStateCheckbox } from './TriStateCheckbox'
import { Button } from './Button'
import { Avatar } from './Avatar'

// TODO replace later
export const enum Role {
  user,
  admin,
}

type OrganizationMemberListTranslation = {
  edit: string,
  remove: string,
  deselectAll: string,
  selectAll: string,
  members: string,
  addMember: string,
  saveChanges: string,
  role: string,
  roleTypes: Record<Role, string>
}

const defaultOrganizationMemberListTranslations: Record<Languages, OrganizationMemberListTranslation> = {
  en: {
    edit: 'Edit',
    remove: 'Remove',
    deselectAll: 'Deselect all',
    selectAll: 'Select all',
    members: 'Members',
    addMember: 'Add member',
    saveChanges: 'Save changes',
    role: 'Role',
    roleTypes: { [Role.admin]: 'Admin', [Role.user]: 'User' }
  },
  de: {
    edit: 'Bearbeiten',
    remove: 'Entfernen',
    deselectAll: 'Auswahl aufheben',
    selectAll: 'Alle auswählen',
    members: 'Mitglieder',
    addMember: 'Miglied hinzufügen',
    saveChanges: 'Speichern',
    role: 'Rolle',
    roleTypes: { [Role.admin]: 'Administrator', [Role.user]: 'Nutzer' }
  }
}

type OrgMember = {
  email: string,
  name: string,
  avatarURL: string,
  role: Role
}

export type OrganizationMemberListProps = {
  members: OrgMember[],
  usersPerPage?: number,
  onSave: (members: OrgMember[]) => void
}

const columnHelper = createColumnHelper<OrgMember>()

const columns = [
  columnHelper.display({
    id: 'select',
  }),
  columnHelper.accessor('name', {
    id: 'name',
  }),
  columnHelper.accessor('role', {
    id: 'role',
  }),
  columnHelper.display({
    id: 'remove',
  }),
]

export const OrganizationMemberList = ({
  language,
  usersPerPage = 5,
  members,
  onSave
}: PropsWithLanguage<OrganizationMemberListTranslation, OrganizationMemberListProps>) => {
  const translation = useTranslation(language, defaultOrganizationMemberListTranslations)
  // State copy of the members, so discarding changes is possible
  const [newMembers, setNewMembers] = useState(members)

  const table = useReactTable({
    data: newMembers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: usersPerPage } }
  })

  const hasChanges = () => {
    if (newMembers.length !== members.length) {
      return true
    }
    for (let i = 0; i < newMembers.length; i++) {
      const mem1 = newMembers[i]
      const mem2 = members[i]
      // TODO replace later on with an equality check on the object
      if (mem1.role !== mem2.role || mem1.name !== mem2.name || mem1.email !== mem2.email || mem1.avatarURL !== mem2.avatarURL) {
        return true
      }
    }
    return false
  }

  const disableSaveChanges = !hasChanges()

  const addUser = () => {
    // TODO remove below for an actual user add
    const newMember = {
      name: 'user' + (newMembers.length + 1),
      role: Role.user,
      email: `user${(newMembers.length + 1)}@helpwave.de`,
      isSelected: false,
      avatarURL: ''
    }
    setNewMembers([...newMembers, newMember])
    // Automatically go to the last page
    table.setPageIndex((Math.ceil((newMembers.length + 1) / usersPerPage)))
  }

  return (
    <div className={tw('flex flex-col')}>
      <div className={tw('flex flex-row justify-between items-center mb-2')}>
        <span className={tw('font-bold font-space')}>{translation.members + ` (${newMembers.length})`}</span>
        <div className={tw('flex flex-row')}>
          <Button onClick={addUser} color="positive" className={tw('mr-2')}>
            <div className={tw('flex flex-row items-center')}>
              <span className={tw('mr-2')}>{translation.addMember}</span>
              <Dropdown/>
            </div>
          </Button>
          <Button onClick={() => onSave(newMembers)} disabled={disableSaveChanges} color="positive"
                  >{translation.saveChanges}</Button>
        </div>
      </div>
      <table>
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : {
                      select:
                      (<TriStateCheckbox
                        checked={table.getIsSomePageRowsSelected() ? null : table.getIsAllRowsSelected()}
                        onChanged={() => table.toggleAllRowsSelected()}
                      />),
                      name: (<div>
                      <span>{table.getIsAllRowsSelected() ? translation.deselectAll : translation.selectAll}</span>
                    </div>),
                      role: (<div className={tw('flex flex-row justify-end items-center pr-2')}>
                      {translation.role}
                      <Dropdown className={tw('stroke-black ml-2')}/>
                    </div>),
                      remove: (<div className={tw('flex flex-row justify-end')}>
                      <button onClick={() => {
                        setNewMembers(newMembers.filter(value => !table.getSelectedRowModel().rows.find(row => row.original === value)))
                        // TODO at delete safety for owner later on
                        table.toggleAllRowsSelected(false)
                      }}>
                        <span>{translation.remove}</span>
                      </button>
                    </div>),
                    }[header.column.id]
                }
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {{
                  role: (
                    <div className={tw('flex flex-row justify-end items-center mr-2')}>
                      <button className={tw('flex flex-row items-center')} onClick={() => { /* TODO allow changing roles */ }}>
                      <span className={tw(`mr-2 font-semibold text-right`)}>
                        {translation.roleTypes[cell.row.original.role]}
                      </span>
                        <Dropdown className={tw('stroke-black')}/>
                      </button>
                    </div>
                  ),
                  name: (
                    <div className={tw('flex flex-row items-center h-12')}>
                      <Avatar avatarUrl={cell.row.original.avatarURL} alt={cell.row.original.name} size="small"/>
                      <div className={tw('flex flex-col ml-2')}>
                        <span className={tw('font-bold h-5')}>{cell.row.original.name}</span>
                        <span className={tw('text-sm text-gray-400')}>{cell.row.original.email}</span>
                      </div>
                    </div>
                  ),
                  remove: (
                    <div className={tw('flex flex-row justify-end')}>
                      <button onClick={() => setNewMembers(newMembers.filter(value => value !== cell.row.original))}>
                        <span className={tw('text-hw-negative-500')}>{translation.remove}</span>
                      </button>
                    </div>
                  ),
                  select: <TriStateCheckbox checked={cell.row.getIsSelected()}
                                            onChanged={() => cell.row.toggleSelected()}/>
                }[cell.column.id]}
              </td>
            ))}
          </tr>
        ))}
        {table.getState().pagination.pageIndex === (table.getPageCount() - 1) && table.getPageCount() > 1 && (newMembers.length % usersPerPage) !== 0 && ([...Array((usersPerPage - (newMembers.length % usersPerPage)) % usersPerPage)].map((i, index) => (
          <tr key={index} className={tw('h-12')}>
            {[table.getAllColumns.length].map((j, index) => (
              <td key={index}/>
            ))}
          </tr>
        )))}
        </tbody>
      </table>
      <div className={tw('flex flex-row justify-center mt-2')}>
        <Pagination page={table.getState().pagination.pageIndex}
                    numberOfPages={Math.max(table.getPageCount(), 1)}
                    onPageChanged={table.setPageIndex}
        />
      </div>
    </div>
  )
}
