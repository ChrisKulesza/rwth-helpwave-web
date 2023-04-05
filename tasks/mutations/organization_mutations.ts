import { Role } from '../components/OrganizationMemberList'
import type { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import type { Dispatch, SetStateAction } from 'react'

const queryKey = 'organizations'

type WardDTO = {
  name: string
}

type OrgMember = {
  email: string,
  name: string,
  avatarURL: string,
  role: Role
}

type OrganizationDTO = {
  id: string,
  shortName: string,
  longName: string,
  email: string,
  isVerified: boolean,
  wards: WardDTO[],
  members: OrgMember[]
}

// TODO remove once backend is implemented
let organizations: OrganizationDTO[] = [
  {
    id: 'org1',
    shortName: 'UKM',
    longName: 'Uniklinkum Münster',
    email: 'ukm@helpwave.de',
    isVerified: false,
    wards: [{ name: 'ICU' }, { name: 'Radiology' }, { name: 'Cardiology' }],
    members: [
      {
        name: 'User1',
        avatarURL: 'https://source.boringavatars.com/',
        email: 'user1@helpwave.de',
        role: Role.admin
      }, {
        name: 'User2',
        avatarURL: 'https://source.boringavatars.com/',
        email: 'user2@helpwave.de',
        role: Role.user
      },
      {
        name: 'User3',
        avatarURL: 'https://source.boringavatars.com/',
        email: 'user3@helpwave.de',
        role: Role.user
      },
      {
        name: 'User4',
        avatarURL: 'https://source.boringavatars.com/',
        email: 'user4@helpwave.de',
        role: Role.user
      }
    ]
  },
  {
    id: 'org2',
    shortName: 'ORGA',
    longName: 'Organame',
    email: 'orga@helpwave.de',
    isVerified: false,
    wards: [{ name: 'ICU' }, { name: 'Radiology' }, { name: 'Cardiology' }],
    members: [
      {
        name: 'User1',
        avatarURL: 'https://source.boringavatars.com/',
        email: 'user1@helpwave.de',
        role: Role.admin
      }, {
        name: 'User2',
        avatarURL: 'https://source.boringavatars.com/',
        email: 'user2@helpwave.de',
        role: Role.user
      },
      {
        name: 'User3',
        avatarURL: 'https://source.boringavatars.com/',
        email: 'user3@helpwave.de',
        role: Role.user
      },
      {
        name: 'User4',
        avatarURL: 'https://source.boringavatars.com/',
        email: 'user4@helpwave.de',
        role: Role.user
      }
    ]
  },
]

export const getQuery = () => {
  return {
    queryKey: [queryKey],
    queryFn: async () => {
      // TODO fetch user organizations
      return organizations
    },
  }
}

export const getUpdateMutation: (queryClient: QueryClient, setSelectedOrganization: Dispatch<SetStateAction<OrganizationDTO | undefined>>) => UseMutationOptions<void, unknown, OrganizationDTO, { previousOrganizations: OrganizationDTO[] | undefined }> =
  (queryClient, setSelectedOrganization) => {
    return {
      mutationFn: async (organization) => {
        // TODO create request for organization
        organizations = [...organizations.filter(value => value.id !== organization.id), organization]
        organizations.sort((a, b) => a.longName.localeCompare(b.longName))
        setSelectedOrganization(organization)
      },
      onMutate: async (organization) => {
        await queryClient.cancelQueries({ queryKey: [queryKey] })
        const previousOrganizations = queryClient.getQueryData<OrganizationDTO[]>([queryKey])
        queryClient.setQueryData<OrganizationDTO[]>(
          [queryKey],
          (old) => [...(old === undefined ? [] : old.filter(value => value.id !== organization.id)), organization])
        organizations.sort((a, b) => a.longName.localeCompare(b.longName))
        return { previousOrganizations }
      },
      onError: (_, newTodo, context) => {
        queryClient.setQueryData([queryKey], context === undefined ? [] : context.previousOrganizations)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] }).then()
      }
    }
  }

export const getCreateMutation: (queryClient: QueryClient, setSelectedOrganization: Dispatch<SetStateAction<OrganizationDTO | undefined>>) => UseMutationOptions<void, unknown, OrganizationDTO, { previousOrganizations: OrganizationDTO[] | undefined }> =
  (queryClient, setSelectedOrganization) => {
    return {
      mutationFn: async (organization) => {
        organization.id = Math.random().toString()
        // TODO create request for organization
        organizations = [...organizations, { ...organization, id: Math.random().toString() }]
        setSelectedOrganization(organization)
        organizations.sort((a, b) => a.longName.localeCompare(b.longName))
      },
      onMutate: async(organization: OrganizationDTO) => {
        await queryClient.cancelQueries({ queryKey: [queryKey] })
        const previousOrganizations = queryClient.getQueryData<OrganizationDTO[]>([queryKey])
        queryClient.setQueryData<OrganizationDTO[]>([queryKey], (old) => [...(old === undefined ? [] : old), organization])
        organizations.sort((a, b) => a.longName.localeCompare(b.longName))
        return { previousOrganizations }
      },
      onError: (_, newTodo, context) => {
        queryClient.setQueryData([queryKey], context === undefined ? [] : context.previousOrganizations)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] }).then()
      },
    }
  }

export const getDeleteMutation: (queryClient: QueryClient, setSelectedOrganization: Dispatch<SetStateAction<OrganizationDTO | undefined>>) => UseMutationOptions<void, unknown, OrganizationDTO, { previousOrganizations: OrganizationDTO[] | undefined }> =
  (queryClient, setSelectedOrganization) => {
    return {
      mutationFn: async (organization) => {
        // TODO create request for organization
        organizations = [...organizations.filter(value => value.id !== organization.id)]
        setSelectedOrganization(undefined)
      },
      onMutate: async(organization: OrganizationDTO) => {
        await queryClient.cancelQueries({ queryKey: [queryKey] })
        const previousOrganizations = queryClient.getQueryData<OrganizationDTO[]>([queryKey])
        queryClient.setQueryData<OrganizationDTO[]>(
          [queryKey],
          (old) => [...(old === undefined ? [] : old.filter(value => value.id !== organization.id))])
        return { previousOrganizations }
      },
      onError: (_, newTodo, context) => {
        queryClient.setQueryData([queryKey], context === undefined ? [] : context.previousOrganizations)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] }).then()
      },
    }
  }
