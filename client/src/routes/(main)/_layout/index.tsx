import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'

export const Route = createFileRoute('/(main)/_layout/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Welcome to The People's Voice</h1>
      <p className='text-muted-foreground'>
        Your platform for crowd-sourced news and community reporting.
      </p>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Latest News</CardTitle>
            <CardDescription>
              Catch up on the most recent reports.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='border-b pb-2'>
              <h3 className='font-medium'>Local Park Renovation Completed</h3>
              <p className='text-sm text-muted-foreground'>
                The city's central park reopened today after a 6-month
                renovation project.
              </p>
              <div className='flex items-center justify-between mt-2'>
                <span className='text-xs text-muted-foreground'>
                  2 hours ago
                </span>
                <span className='text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full'>
                  Community
                </span>
              </div>
            </div>
            <div className='border-b pb-2'>
              <h3 className='font-medium'>New Farmers Market Opens Downtown</h3>
              <p className='text-sm text-muted-foreground'>
                Local vendors celebrate the grand opening of an organic farmers
                market.
              </p>
              <div className='flex items-center justify-between mt-2'>
                <span className='text-xs text-muted-foreground'>
                  5 hours ago
                </span>
                <span className='text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full'>
                  Business
                </span>
              </div>
            </div>
            <div>
              <h3 className='font-medium'>
                School Board Approves New Tech Initiative
              </h3>
              <p className='text-sm text-muted-foreground'>
                Local schools will receive funding for new computer labs
                starting this fall.
              </p>
              <div className='flex items-center justify-between mt-2'>
                <span className='text-xs text-muted-foreground'>Yesterday</span>
                <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>
                  Education
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trending Topics</CardTitle>
            <CardDescription>
              See what the community is talking about.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <div className='bg-red-100 text-red-800 h-8 w-8 rounded-full flex items-center justify-center font-semibold'>
                  1
                </div>
                <div>
                  <h3 className='font-medium'>#RoadConstruction</h3>
                  <p className='text-xs text-muted-foreground'>
                    245 related stories
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div className='bg-blue-100 text-blue-800 h-8 w-8 rounded-full flex items-center justify-center font-semibold'>
                  2
                </div>
                <div>
                  <h3 className='font-medium'>#LocalFestival</h3>
                  <p className='text-xs text-muted-foreground'>
                    189 related stories
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div className='bg-green-100 text-green-800 h-8 w-8 rounded-full flex items-center justify-center font-semibold'>
                  3
                </div>
                <div>
                  <h3 className='font-medium'>#WildlifeSpotting</h3>
                  <p className='text-xs text-muted-foreground'>
                    156 related stories
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div className='bg-purple-100 text-purple-800 h-8 w-8 rounded-full flex items-center justify-center font-semibold'>
                  4
                </div>
                <div>
                  <h3 className='font-medium'>#NewBusinesses</h3>
                  <p className='text-xs text-muted-foreground'>
                    132 related stories
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div className='bg-amber-100 text-amber-800 h-8 w-8 rounded-full flex items-center justify-center font-semibold'>
                  5
                </div>
                <div>
                  <h3 className='font-medium'>#SchoolEvents</h3>
                  <p className='text-xs text-muted-foreground'>
                    98 related stories
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Submit a Story</CardTitle>
            <CardDescription>
              Share your perspective and report news.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='rounded-lg border border-dashed p-4 text-center'>
                <div className='mb-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='mx-auto text-muted-foreground'
                  >
                    <path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8'></path>
                    <polyline points='16 6 12 2 8 6'></polyline>
                    <line x1='12' y1='2' x2='12' y2='15'></line>
                  </svg>
                </div>
                <p className='text-sm font-medium'>
                  Drop files or click to upload
                </p>
                <p className='text-xs text-muted-foreground mt-1'>
                  Include photos with your submission
                </p>
              </div>
              <button className='w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md font-medium'>
                Start Writing
              </button>
              <div className='pt-2 border-t'>
                <h4 className='text-sm font-medium mb-2'>Quick Tips:</h4>
                <ul className='text-xs text-muted-foreground space-y-1'>
                  <li>• Include who, what, when, where, and why</li>
                  <li>• Add photos or videos if available</li>
                  <li>• Cite sources for factual information</li>
                  <li>• Be concise and clear in your reporting</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-4'>Featured Articles</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {/* Row 1 */}

          <Card className='overflow-hidden'>
            <div
              className='h-40 bg-cover bg-center'
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")'
              }}
            ></div>
            <CardContent className='pt-4'>
              <h3 className='font-medium'>
                New Public Transit Route Announced
              </h3>
              <p className='text-sm text-muted-foreground mt-1'>
                City officials unveil plans for expanded bus service to western
                neighborhoods.
              </p>
              <div className='flex items-center justify-between mt-3'>
                <span className='text-xs text-muted-foreground'>
                  2 days ago
                </span>
                <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>
                  Infrastructure
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className='overflow-hidden'>
            <div
              className='h-40 bg-cover bg-center'
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")'
              }}
            ></div>
            <CardContent className='pt-4'>
              <h3 className='font-medium'>
                Community Clean-up Initiative Starts This Weekend
              </h3>
              <p className='text-sm text-muted-foreground mt-1'>
                Volunteers needed for the annual river clean-up project on
                Saturday.
              </p>
              <div className='flex items-center justify-between mt-3'>
                <span className='text-xs text-muted-foreground'>
                  3 days ago
                </span>
                <span className='text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full'>
                  Environment
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Row 2 */}
          <Card className='overflow-hidden'>
            <div
              className='h-40 bg-cover bg-center'
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")'
              }}
            ></div>
            <CardContent className='pt-4'>
              <h3 className='font-medium'>
                Local Restaurant Wins Culinary Award
              </h3>
              <p className='text-sm text-muted-foreground mt-1'>
                Downtown eatery recognized for innovative farm-to-table cuisine.
              </p>
              <div className='flex items-center justify-between mt-3'>
                <span className='text-xs text-muted-foreground'>
                  4 days ago
                </span>
                <span className='text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full'>
                  Food
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className='overflow-hidden'>
            <div
              className='h-40 bg-cover bg-center'
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")'
              }}
            ></div>
            <CardContent className='pt-4'>
              <h3 className='font-medium'>
                High School Robotics Team Heads to Nationals
              </h3>
              <p className='text-sm text-muted-foreground mt-1'>
                Local students prepare to compete in the national robotics
                championship.
              </p>
              <div className='flex items-center justify-between mt-3'>
                <span className='text-xs text-muted-foreground'>
                  5 days ago
                </span>
                <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>
                  Education
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className='overflow-hidden'>
            <div
              className='h-40 bg-cover bg-center'
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")'
              }}
            ></div>
            <CardContent className='pt-4'>
              <h3 className='font-medium'>
                New Bike Lanes Being Added to Main Street
              </h3>
              <p className='text-sm text-muted-foreground mt-1'>
                Construction begins next week on cycling infrastructure
                improvement project.
              </p>
              <div className='flex items-center justify-between mt-3'>
                <span className='text-xs text-muted-foreground'>
                  6 days ago
                </span>
                <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>
                  Infrastructure
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Row 3 */}
          <Card className='overflow-hidden'>
            <div
              className='h-40 bg-cover bg-center'
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")'
              }}
            ></div>
            <CardContent className='pt-4'>
              <h3 className='font-medium'>Historic Building to be Restored</h3>
              <p className='text-sm text-muted-foreground mt-1'>
                Funding secured for renovation of the 120-year-old former post
                office.
              </p>
              <div className='flex items-center justify-between mt-3'>
                <span className='text-xs text-muted-foreground'>
                  1 week ago
                </span>
                <span className='text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full'>
                  History
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className='overflow-hidden'>
            <div
              className='h-40 bg-cover bg-center'
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")'
              }}
            ></div>
            <CardContent className='pt-4'>
              <h3 className='font-medium'>
                Community Garden Expands with New Plots
              </h3>
              <p className='text-sm text-muted-foreground mt-1'>
                Local garden co-op adds twenty new gardening spaces for
                residents.
              </p>
              <div className='flex items-center justify-between mt-3'>
                <span className='text-xs text-muted-foreground'>
                  8 days ago
                </span>
                <span className='text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full'>
                  Environment
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className='overflow-hidden'>
            <div
              className='h-40 bg-cover bg-center'
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")'
              }}
            ></div>
            <CardContent className='pt-4'>
              <h3 className='font-medium'>
                Local Sports Team Reaches Championship
              </h3>
              <p className='text-sm text-muted-foreground mt-1'>
                High school basketball squad advances to state finals for first
                time in a decade.
              </p>
              <div className='flex items-center justify-between mt-3'>
                <span className='text-xs text-muted-foreground'>
                  10 days ago
                </span>
                <span className='text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full'>
                  Sports
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
