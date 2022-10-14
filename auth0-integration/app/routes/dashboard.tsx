import AuthenticatedHeader from '~/components/AuthenticatedHeader';
import HeaderBanner from '~/components/HeaderBanner';
import Modal from '~/components/Modal';

export default function Dashboard() {
  return (
    <>
      <HeaderBanner />
      <AuthenticatedHeader />
      <Modal />
    </>
  );
}
