import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import ReportIssueForm from '@/components/report-error'

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Issue', link: '/dashboard/report-error' }
];

export default function ReportErrorPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`Report an Issue`} description="" />
        </div>
        <ReportIssueForm />
      </div>
    </PageContainer>
  );
}
