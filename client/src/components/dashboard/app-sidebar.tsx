import * as React from 'react'
import {
  IconCamera,
  IconChartPie,
  IconDashboard,
  IconPhotoPlus,
  IconWriting,
  IconBulb,
  IconNews,
  IconMessageCircle,
  IconTimeline,
  IconArchive,
  IconArticle,
  IconMessage,
  IconQuestionMark,
  IconSearch,
  IconSettings,
  IconInnerShadowTop
} from '@tabler/icons-react'

import { NavDocuments } from '@/components/dashboard/nav-documents'
import { NavMain } from '@/components/dashboard/nav-main'
import { NavSecondary } from '@/components/dashboard/nav-secondary'
import { NavUser } from '@/components/dashboard/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  navMain: [
    { title: 'Timeline', url: '#', icon: IconTimeline },
    { title: 'Analytics', url: '#', icon: IconChartPie },
    { title: 'Newsroom', url: '#', icon: IconNews },
    { title: 'Community Chat', url: '#', icon: IconMessageCircle }
  ],
  navClouds: [
    {
      title: 'Submissions',
      icon: IconPhotoPlus,
      isActive: true,
      url: '#',
      items: [
        { title: 'Active', url: '#' },
        { title: 'Archived', url: '#' }
      ]
    },
    {
      title: 'Drafts',
      icon: IconWriting,
      url: '#',
      items: [
        { title: 'Active', url: '#' },
        { title: 'Archived', url: '#' }
      ]
    },
    {
      title: 'Story Ideas',
      icon: IconBulb,
      url: '#',
      items: [
        { title: 'Suggested', url: '#' },
        { title: 'Archived', url: '#' }
      ]
    }
  ],
  navSecondary: [
    { title: 'Settings', url: '#', icon: IconSettings },
    { title: 'Get Help', url: '#', icon: IconQuestionMark },
    { title: 'Search', url: '#', icon: IconSearch }
  ],
  documents: [
    { name: 'Archive', url: '#', icon: IconArchive },
    { name: 'Published Reports', url: '#', icon: IconArticle },
    { name: 'Chat Assistant', url: '#', icon: IconMessage }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <a href='#'>
                <IconInnerShadowTop className='!size-5' />
                <span className='text-base font-semibold'>
                  The People's Voice
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
