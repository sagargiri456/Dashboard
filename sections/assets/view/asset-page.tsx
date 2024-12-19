import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import  Home from '../asset-ui';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Assets', link: '/dashboard/assets' }
];

export default function AssetsViewPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`Upload the Assets for the website`} description="" />
        </div>
        <Home />
      </div>
    </PageContainer>
  );
}
