import SupportList from '@/components/SupportList'
import Layout from '@/components/layout'

export default function Home() {
  return (
    <Layout>
      <SupportList
        issues={[
          {
            id: 1,
            title: 'Title one',
            creator: 'Marius Wallin',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
            department: 'salg',
            severity: 'low',
            isResolved: false,
            createdAt: new Date(2021, 11, 22).toLocaleDateString(),
          },
          {
            id: 2,
            title: 'Title two',
            creator: 'Simen Simensen',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
            department: 'it',
            severity: 'medium',
            isResolved: false,
            createdAt: new Date(2021, 11, 6).toLocaleDateString(),
          },
          {
            id: 3,
            title: 'Title three',
            creator: 'Trude Trudesen',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
            department: 'design',
            severity: 'high',
            isResolved: false,
            createdAt: new Date(2021, 10, 12).toLocaleDateString(),
          },
        ]}
      />
    </Layout>
  )
}
