import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react' // Assuming you're using Lucide icons

export function SiteHeader() {
  return (
    <header className='flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-4'
        />
        <h1 className='text-sm font-medium'>Home</h1>
        <div className='ml-auto flex items-center gap-2'>
          <div className='relative w-48 lg:w-64'>
            <Search
              className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'
              size={16}
            />
            <Input
              type='text'
              placeholder='Search...'
              className='pl-8 w-full'
            />
          </div>
        </div>
      </div>
    </header>
  )
}
