import AuthenticatedHeader from '~/components/AuthenticatedHeader';
import HeaderBanner from '~/components/HeaderBanner';

export default function Dashboard() {
  return (
    <>
      <HeaderBanner />
      <AuthenticatedHeader />
    </>
  );
}
